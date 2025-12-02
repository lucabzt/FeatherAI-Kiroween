"""
Social Media Fact Checker using Google Agent Development Kit (ADK).
Reference: https://google.github.io/adk-docs/
"""

# General imports
import asyncio
import base64
import os
import logging
from typing import List, Tuple
from pydantic import BaseModel, Field
from dotenv import load_dotenv

# ADK Imports
from google.adk.agents import Agent
from google.adk.tools import google_search
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types

# Load environment variables
load_dotenv()
logging.basicConfig(level=logging.ERROR)

# File paths
real_post: str = "../real_post.png"
fake_post: str = "../fake_post.png"


# --- 1. Define Structured Output Schema ---
class Research(BaseModel):
    fake_news: bool = Field(..., description="Whether the post is fake or not.")
    reasoning: str = Field(..., description="Reasoning of your decision.")
    relevant_sources: List[str] = Field(...,
                                        description="A list of urls that were relevant for determining factual correctness.")


# --- 2. Define the Agents ---

# OCR Agent: Specialized in reading images
ocr_agent = Agent(
    name="ocr_agent",
    model="gemini-2.0-flash",
    instruction=(
        "You are an OCR expert. Your job is to transcribe and summarize "
        "the text found in social media images accurately."
    )
)

# Research Agent: Uses tools to verify claims (no output_schema due to ADK constraint)
research_agent = Agent(
    name="research_agent",
    model="gemini-2.0-flash",
    instruction=(
        "You are a professional social media fact checker. "
        "You MUST use the Google Search tool to verify claims before responding. "
        "Search for multiple relevant queries to thoroughly verify the information. "
        "After searching, provide a detailed analysis including:\n"
        "1. Whether the claim appears to be fake or legitimate\n"
        "2. Your reasoning based on the search results\n"
        "3. List all relevant source URLs you found"
    ),
    tools=[google_search]
)

# Formatter Agent: Converts research into structured format (no tools, only output_schema)
formatter_agent = Agent(
    name="formatter_agent",
    model="gemini-2.0-flash",
    instruction=(
        "You are a data formatter. Take the fact-checking analysis provided "
        "and convert it into the exact structured format requested. "
        "Extract the verdict, reasoning, and source URLs."
    ),
    output_schema=Research,
    output_key="formatted_research"  # Store result in session state
)


# --- 3. Helper Functions ---

def load_image_as_part(image_path: str) -> types.Part:
    """Reads an image and converts it to an ADK message Part."""
    if not os.path.exists(image_path):
        return types.Part(text="[Image content unavailable: File not found]")

    with open(image_path, "rb") as image_file:
        image_bytes = image_file.read()

    return types.Part(
        inline_data=types.Blob(
            mime_type="image/png",
            data=image_bytes
        )
    )


async def check_post(post_path: str) -> Tuple[Research, int]:
    # Session service for managing conversation state
    session_service = InMemorySessionService()

    # App identifiers
    APP_NAME = "fact_checker"
    USER_ID = "user_001"

    # --- Step 1: OCR ---
    print("Step 1: OCR - Extracting text from image...")
    ocr_session = await session_service.create_session(
        app_name=APP_NAME,
        user_id=USER_ID,
        session_id="ocr_session"
    )

    ocr_runner = Runner(
        agent=ocr_agent,
        app_name=APP_NAME,
        session_service=session_service
    )

    # Prepare multimodal input (Text + Image)
    image_part = load_image_as_part(post_path)
    ocr_content = types.Content(
        role="user",
        parts=[types.Part(text="Summarize the following post:"), image_part]
    )

    # Run OCR Agent and get response
    ocr_text = ""
    async for event in ocr_runner.run_async(
        user_id=USER_ID,
        session_id="ocr_session",
        new_message=ocr_content
    ):
        if event.is_final_response():
            ocr_text = event.content.parts[0].text

    print(f"Extracted text: {ocr_text[:100]}...")

    # --- Step 2: Research with Tools ---
    print("\nStep 2: Research - Verifying claims with Google Search...")
    research_session = await session_service.create_session(
        app_name=APP_NAME,
        user_id=USER_ID,
        session_id="research_session"
    )

    research_runner = Runner(
        agent=research_agent,
        app_name=APP_NAME,
        session_service=session_service
    )

    research_content = types.Content(
        role="user",
        parts=[types.Part(text=f"Verify the validity of this social media post text: {ocr_text}")]
    )

    research_text = ""
    tool_count = 0

    async for event in research_runner.run_async(
        user_id=USER_ID,
        session_id="research_session",
        new_message=research_content
    ):
        # Count tool usage using get_function_calls method
        if hasattr(event, 'get_function_calls'):
            function_calls = event.get_function_calls()
            if function_calls:
                tool_count += len(function_calls)
                for call in function_calls:
                    print(f"  → Tool called: {call.name}")

        # Get research findings
        if event.is_final_response():
            research_text = event.content.parts[0].text

    print(f"Research complete. Used {tool_count} tool calls.")

    # --- Step 3: Format into Structured Output ---
    print("\nStep 3: Format - Converting to structured output...")
    format_session = await session_service.create_session(
        app_name=APP_NAME,
        user_id=USER_ID,
        session_id="format_session"
    )

    format_runner = Runner(
        agent=formatter_agent,
        app_name=APP_NAME,
        session_service=session_service
    )

    format_content = types.Content(
        role="user",
        parts=[types.Part(text=f"Format this fact-checking analysis into the structured schema:\n\n{research_text}")]
    )

    # Run formatter and wait for completion
    async for event in format_runner.run_async(
        user_id=USER_ID,
        session_id="format_session",
        new_message=format_content
    ):
        # Just wait for final response
        if event.is_final_response():
            pass

    # Retrieve the structured output from session state
    updated_session = await session_service.get_session(
        app_name=APP_NAME,
        user_id=USER_ID,
        session_id="format_session"
    )

    # Access the structured data from state using output_key
    research_data = None
    if "formatted_research" in updated_session.state:
        formatted_data = updated_session.state["formatted_research"]
        # Parse into Pydantic model
        if isinstance(formatted_data, dict):
            research_data = Research(**formatted_data)
        else:
            # If it's a JSON string, parse it
            import json
            research_data = Research(**json.loads(formatted_data))

    return research_data, tool_count


async def run_and_print_fact_checker(post: str):
    print("=" * 80)
    print("SOCIAL MEDIA FACT CHECKER (Google ADK)")
    print("=" * 80)
    print()

    print(f"📋 Analyzing {post}...")
    print("-" * 80)

    try:
        result, tool_count = await check_post(post)

        if result:
            print(f"\n✓ Analysis Complete\n")
            print(f"Verdict: {'❌❌ FAKE NEWS' if result.fake_news else '✅✅ LEGITIMATE'}")
            print(f"\nReasoning:\n{result.reasoning}")
            print(f"\nRelevant Sources ({len(result.relevant_sources)}):")
            for i, source in enumerate(result.relevant_sources, 1):
                print(f"  {i}. {source}")
            print(f"\nTools Used: {tool_count} tool interactions")
        else:
            print("\n❌ No structured result received")

    except Exception as e:
        print(f"\n❌ An error occurred: {e}")
        import traceback
        traceback.print_exc()

    print("\n" + "=" * 80)
    print("Analysis complete")
    print("=" * 80)
    print()


if __name__ == "__main__":
    async def main():
        await run_and_print_fact_checker(real_post)
        await run_and_print_fact_checker(fake_post)

    asyncio.run(main())