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
from google.adk.runtime import AdkApp
from google.adk.sessions import InMemorySessionService
from google.adk.types import ModelMessage, Part, Blob

# Load environment variables
load_dotenv()
logging.basicConfig(level=logging.ERROR)  # Reduce noise from ADK internals

# File paths
real_post: str = "./real_post.png"
fake_post: str = "./fake_post.png"


# --- 1. Define Structured Output Schema ---
class Research(BaseModel):
    fake_news: bool = Field(..., description="Whether the post is fake or not.")
    reasoning: str = Field(..., description="Reasoning of your decision.")
    relevant_sources: List[str] = Field(...,
                                        description="A list of urls that were relevant for determining factual correctness.")


# --- 2. Define the Agents ---

# OCR Agent: Specialized in reading images
# We use gemini-1.5-flash for speed and multimodal capabilities
ocr_agent = Agent(
    name="ocr_agent",
    model="gemini-1.5-flash",
    instruction=(
        "You are an OCR expert. Your job is to transcribe and summarize "
        "the text found in social media images accurately."
    )
)

# Fact Checking Agent: Specialized in research and verification
# ADK allows passing Pydantic models directly to output_schema
fact_checking_agent = Agent(
    name="fact_checking_agent",
    model="gemini-1.5-pro",
    instruction=(
        "You are a professional social media fact checker. "
        "Verify claims using Google Search. "
        "You must output your findings in the structured format provided."
    ),
    tools=[google_search],
    output_schema=Research
)


# --- 3. Helper Functions ---

def load_image_as_part(image_path: str) -> Part:
    """Reads an image and converts it to an ADK message Part."""
    if not os.path.exists(image_path):
        # Fallback for demo if file doesn't exist
        return Part(text="[Image content unavailable: File not found]")

    with open(image_path, "rb") as image_file:
        image_bytes = image_file.read()

    return Part(
        inline_data=Blob(
            mime_type="image/png",
            data=base64.b64encode(image_bytes).decode('utf-8')
        )
    )


async def check_post(post_path: str) -> Tuple[Research, List[str]]:
    # Initialize the ADK Runtime (App) with in-memory sessions
    # ADK uses an 'App' concept to manage state and agent orchestration
    ocr_app = AdkApp(agent=ocr_agent, session_service=InMemorySessionService())
    fact_check_app = AdkApp(agent=fact_checking_agent, session_service=InMemorySessionService())

    # --- Step 1: OCR ---
    # Create a session for OCR
    ocr_session = await ocr_app.create_session()

    # Prepare multimodal input (Text + Image)
    image_part = load_image_as_part(post_path)
    ocr_prompt = ModelMessage(parts=[Part(text="Summarize the following post:"), image_part])

    # Run OCR Agent
    ocr_result = await ocr_app.query(session=ocr_session, message=ocr_prompt)
    ocr_text = ocr_result.get_text()

    print(f"OCR Agent returned the following: \n {ocr_text} \nFact Checker researching now...")

    # --- Step 2: Fact Checking ---
    # Create a session for Fact Checking
    fc_session = await fact_check_app.create_session()

    # Run Fact Check Agent
    # The agent will use the 'google_search' tool automatically before returning the JSON schema
    research_result = await fact_check_app.query(
        session=fc_session,
        message=f"Verify the validity of this text: {ocr_text}"
    )

    # ADK automatically parses the output into our Pydantic model if output_schema is set
    research_data: Research = research_result.get_data()

    # Extract sources from tool metadata if available, or fall back to the model's list
    # ADK traces usually contain tool calls in the result metadata
    tool_calls = research_result.get_tool_calls()

    return research_data, tool_calls


async def run_and_print_fact_checker(post: str):
    print("=" * 80)
    print("SOCIAL MEDIA FACT CHECKER (Google ADK)")
    print("=" * 80)
    print()

    print(f"📋 Analyzing {post}...")
    print("-" * 80)

    try:
        result, tools = await check_post(post)

        print(f"\n✓ Analysis Complete\n")
        print(f"Verdict: {'❌❌ FAKE NEWS' if result.fake_news else '✅✅ LEGITIMATE'}")
        print(f"\nReasoning:\n{result.reasoning}")
        print(f"\nRelevant Sources ({len(result.relevant_sources)}):")
        for i, source in enumerate(result.relevant_sources, 1):
            print(f"  {i}. {source}")

        print(f"\nTools Used: {len(tools)} tool interactions")

    except Exception as e:
        print(f"\n❌ An error occurred: {e}")

    print("\n" + "=" * 80)
    print("Analysis complete")
    print("=" * 80)
    print()


if __name__ == "__main__":
    async def main():
        await run_and_print_fact_checker(real_post)
        await run_and_print_fact_checker(fake_post)


    asyncio.run(main())