"""
In order to show the capabilities of LangChain we will now create a social media fact checker that
can distinguish real social media posts from fake ones.
"""
# General imports
from typing import List, Tuple
from pydantic import BaseModel, Field
import asyncio
from dotenv import load_dotenv
import logging
import base64
import os

logging.basicConfig(level=logging.INFO)

# LangChain imports
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_openai import ChatOpenAI
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_core.messages import HumanMessage, SystemMessage

# Tavily client for extract functionality
from tavily import AsyncTavilyClient

# Load environment variables from the .env file
load_dotenv()

# get examples
real_post: str = "../real_post.png"
fake_post: str = "../fake_post.png"

# Define structured output schemas
class Research(BaseModel):
    fake_news: bool = Field(..., description="Whether the post is fake or not.")
    reasoning: str = Field(..., description="Reasoning of your decision.")
    relevant_sources: List[str] = Field(..., description="A list of urls that were relevant for determining factual correctness.")

# Load instructions from files
def load_instruction_from_file(filepath: str) -> str:
    with open(filepath, 'r') as f:
        return f.read()

ocr_instructions = load_instruction_from_file("../instructions/ocr_instructions.txt")
fact_checking_instructions = load_instruction_from_file("../instructions/fact_checking_instructions.txt")

# Define the agents
ocr_llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash-lite",
    temperature=0
)

# Initialize Tavily search tools and client
tavily_search = TavilySearchResults(
    max_results=5,
    search_depth="advanced",
    include_answer=True,
    include_raw_content=True,
    include_domains=[],
    exclude_domains=[]
)

# Initialize Tavily client for extract functionality
tavily_client = AsyncTavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

# Create fact checking agent with tools bound
fact_checking_llm = ChatOpenAI(
    model="gpt-5.1",
    temperature=0
)

# Bind tools to the fact checking agent
fact_checking_agent_with_tools = fact_checking_llm.bind_tools([tavily_search])

# Helper function to encode image
def encode_image(image_path: str) -> str:
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# Code up the workflow
async def check_post(post: str) -> Tuple[Research, int]:
    # Step 1: OCR Agent - Extract text from image
    base64_image = encode_image(post)
    image_url = f"data:image/png;base64,{base64_image}"

    ocr_messages = [
        SystemMessage(content=ocr_instructions),
        HumanMessage(content=[
            {"type": "text", "text": "Summarize the following post:"},
            {"type": "image_url", "image_url": {"url": image_url}}
        ])
    ]

    ocr_response = await ocr_llm.ainvoke(ocr_messages)
    post_content = ocr_response.content
    print(f"OCR Agent returned the following: \n {post_content}. \nFact Checker researching now...")

    # Step 2: Fact Checking Agent - Research with tools
    fact_check_messages = [
        SystemMessage(content=fact_checking_instructions),
        HumanMessage(content=post_content)
    ]

    # Let the agent decide to use tools
    response_with_tools = await fact_checking_agent_with_tools.ainvoke(fact_check_messages)

    # Process tool calls
    tool_call_count = 0
    search_results_context = ""
    extracted_urls = []

    if response_with_tools.tool_calls:
        tool_call_count = len(response_with_tools.tool_calls)

        for tool_call in response_with_tools.tool_calls:
            if tool_call['name'] == 'tavily_search_results_json':
                search_results = await tavily_search.ainvoke(tool_call['args'])

                # Collect URLs from search results
                urls_to_extract = [result.get('url') for result in search_results if result.get('url')]
                extracted_urls.extend(urls_to_extract)

                # Build initial context from search results
                search_results_context += "\n\n".join([
                    f"Source: {result.get('url', 'N/A')}\nSnippet: {result.get('content', 'N/A')}"
                    for result in search_results
                ])

    # Step 3: Extract full content from URLs using Tavily extract
    extracted_content = ""
    if extracted_urls:
        print(f"Extracting full content from {len(extracted_urls)} URLs...")
        try:
            extract_response = await tavily_client.extract(urls=extracted_urls[:3])  # Limit to top 3 to avoid token limits

            for result in extract_response.get('results', []):
                url = result.get('url', 'N/A')
                raw_content = result.get('raw_content', '')
                if raw_content:
                    # Truncate content to avoid overwhelming the context
                    truncated_content = raw_content[:2000] if len(raw_content) > 2000 else raw_content
                    extracted_content += f"\n\n--- Full Content from {url} ---\n{truncated_content}\n"
        except Exception as e:
            print(f"Error extracting content: {e}")
            extracted_content = "Unable to extract full content from URLs."

    # Step 4: Get structured output with search context and extracted content
    fact_checking_final = fact_checking_llm.with_structured_output(Research)

    final_messages = [
        SystemMessage(content=fact_checking_instructions),
        HumanMessage(content=f"""
Post content to fact check:
{post_content}

Web search results:
{search_results_context}

Extracted full content from sources:
{extracted_content}

Please analyze whether this post is fake news or legitimate based on the search results and extracted content.
""")
    ]

    final_response = await fact_checking_final.ainvoke(final_messages)

    return final_response, tool_call_count if tool_call_count > 0 else 1

async def run_and_print_fact_checker(post: str):
    # Determine post type from filename
    post_type = "FAKE POST" if "fake" in post.lower() else "REAL POST"

    print("=" * 80)
    print("SOCIAL MEDIA FACT CHECKER")
    print("=" * 80)
    print()

    print(f"📋 Analyzing {post_type}...")
    print("-" * 80)
    result, tools = await check_post(post)

    print(f"\n✓ Analysis Complete\n")
    print(f"Verdict: {'❌❌ FAKE NEWS' if result.fake_news else '✅✅ LEGITIMATE'}")
    print(f"\nReasoning:\n{result.reasoning}")
    print(f"\nRelevant Sources ({len(result.relevant_sources)}):")
    for i, source in enumerate(result.relevant_sources, 1):
        print(f"  {i}. {source}")
    print(f"\nTools Used: {tools} web searches performed")

    print("\n" + "=" * 80)
    print("Analysis complete")
    print("=" * 80)
    print()

async def main():
    await run_and_print_fact_checker(fake_post)
    await run_and_print_fact_checker(real_post)

if __name__ == "__main__":
    asyncio.run(main())