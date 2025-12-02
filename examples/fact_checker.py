"""
In order to show the capabilities of FeatherAI we will now create a social media fact checker that
can distinguish real social media posts from fake ones.
"""
# General imports
from typing import List, Tuple
from pydantic import BaseModel, Field
import asyncio
from dotenv import load_dotenv
import logging
logging.basicConfig(level=logging.INFO)

# FeatherAI imports
from feather_ai.tools import web_tools_async
from feather_ai import AIAgent, load_instruction_from_file, Prompt

# Load environment variables from the .env file
load_dotenv()

# get examples
real_post: str = "./real_post.png"
fake_post: str = "./fake_post.png"

# Define structured output schemas
class Research(BaseModel):
    fake_news: bool = Field(..., description="Whether the post is fake or not.")
    reasoning: str = Field(..., description="Reasoning of your decision.")
    relevant_sources: List[str] = Field(..., description="A list of urls that were relevant for determining factual correctness.")

# Define the agents
ocr_agent = AIAgent(
    model="gemini-2.5-flash",
    instructions=load_instruction_from_file("./instructions/ocr_instructions.txt")
)
fact_checking_agent = AIAgent(
    model="gpt-5.1",
    instructions=load_instruction_from_file("./instructions/fact_checking_instructions.txt"),
    tools=web_tools_async,
    output_schema=Research
)

# Code up the workflow
async def check_post(post: str) -> Tuple[Research, List[dict]]:
    # Prompt the ocr agent using a multimodal input prompt
    multimodal_prompt = Prompt(text="Summarize the following post:", documents=[post])
    ocr_response = await ocr_agent.arun(multimodal_prompt)
    print(f"OCR Agent returned the following: \n {ocr_response.content}. \nFact Checker researching now...")

    # Prompt the online research agent using the ocr response
    online_research_response = await fact_checking_agent.arun(ocr_response.content)
    return online_research_response.content, online_research_response.tool_calls

async def run_and_print_fact_checker(post: str):
    print("=" * 80)
    print("SOCIAL MEDIA FACT CHECKER")
    print("=" * 80)
    print()

    print(f"📋 Analyzing {post}...")
    print("-" * 80)
    result, tools = await check_post(post)

    print(f"\n✓ Analysis Complete\n")
    print(f"Verdict: {'❌❌ FAKE NEWS' if result.fake_news else '✅✅ LEGITIMATE'}")
    print(f"\nReasoning:\n{result.reasoning}")
    print(f"\nRelevant Sources ({len(result.relevant_sources)}):")
    for i, source in enumerate(result.relevant_sources, 1):
        print(f"  {i}. {source}")
    print(f"\nTools Used: {len(tools)} web searches performed")

    print("\n" + "=" * 80)
    print("Analysis complete for both posts")
    print("=" * 80)
    print()

if __name__ == "__main__":
    async def main():
        await run_and_print_fact_checker(real_post)
        await run_and_print_fact_checker(fake_post)
    asyncio.run(main())