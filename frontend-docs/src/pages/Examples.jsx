import CodeBlock from '../components/CodeBlock';
import PageHeader from '../components/PageHeader';

export default function Examples() {
  return (
    <div className="max-w-none">
      <PageHeader
        title="Examples"
        description="Real-world examples showcasing FeatherAI's capabilities"
      />

      {/* Featured Example */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-[#be3389]/10 to-[#0357c1]/10 border border-[#22c4e0] rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🔍</span>
            <h2 className="text-2xl font-bold text-[#22c4e0] m-0">Social Media Fact Checker</h2>
          </div>
          <p className="text-[#a0a0a3] text-sm">
            A complete multi-agent system demonstrating tool calling, structured output, multimodal, and async execution
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-4 text-white">
          Social Media Fact Checker
        </h2>
        <p className="text-[#a0a0a3] mb-6">
          This example creates a sophisticated fact-checking system that can distinguish real social media posts from fake ones.
          The system uses two specialized agents working together: an OCR agent to extract text from images and a fact-checking
          agent that performs online research to verify claims. It combines:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#22c4e0] mb-2">🛠️ Async Web Tools</h3>
            <p className="text-sm text-[#a0a0a3]">Parallel web search and content extraction</p>
          </div>
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#be3389] mb-2">📊 Structured Output</h3>
            <p className="text-sm text-[#a0a0a3]">Type-safe fact-checking results</p>
          </div>
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#0357c1] mb-2">🖼️ Multimodal</h3>
            <p className="text-sm text-[#a0a0a3]">OCR from social media images</p>
          </div>
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#dfa987] mb-2">⚡ Async Execution</h3>
            <p className="text-sm text-[#a0a0a3]">Multi-agent workflow</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-4 text-white">Complete Implementation</h3>
          <CodeBlock
            code={`"""
In order to show the capabilities of FeatherAI we will now create a social media
fact checker that can distinguish real social media posts from fake ones.
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

# Get example post images
real_post: str = "./real_post.png"
fake_post: str = "./fake_post.png"

# Define structured output schema
class Research(BaseModel):
    fake_news: bool = Field(..., description="Whether the post is fake or not.")
    reasoning: str = Field(..., description="Reasoning of your decision.")
    relevant_sources: List[str] = Field(
        ...,
        description="A list of urls that were relevant for determining factual correctness."
    )

# Define the agents
ocr_agent = AIAgent(
    model="gemini-2.5-flash-lite",
    instructions=load_instruction_from_file("./instructions/ocr_instructions.txt")
)

fact_checking_agent = AIAgent(
    model="gpt-5.1",
    instructions=load_instruction_from_file("./instructions/fact_checking_instructions.txt"),
    tools=web_tools_async,  # Use async tools for parallel web searches
    output_schema=Research
)

# Code up the workflow
async def check_post(post: str) -> Tuple[Research, List[dict]]:
    # Prompt the ocr agent using a multimodal input prompt
    multimodal_prompt = Prompt(
        text="Summarize the following post:",
        documents=[post]
    )
    ocr_response = await ocr_agent.arun(multimodal_prompt)
    print(f"OCR Agent returned the following: \\n {ocr_response.content}. "
          f"\\nFact Checker researching now...")

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

    print(f"\\n✓ Analysis Complete\\n")
    print(f"Verdict: {'❌❌ FAKE NEWS' if result.fake_news else '✅✅ LEGITIMATE'}")
    print(f"\\nReasoning:\\n{result.reasoning}")
    print(f"\\nRelevant Sources ({len(result.relevant_sources)}):")
    for i, source in enumerate(result.relevant_sources, 1):
        print(f"  {i}. {source}")
    print(f"\\nTools Used: {len(tools)} web searches performed")

    print("\\n" + "=" * 80)
    print("Analysis complete")
    print("=" * 80)
    print()

if __name__ == "__main__":
    async def main():
        await run_and_print_fact_checker(real_post)
        await run_and_print_fact_checker(fake_post)
    asyncio.run(main())`}
            language="python"
            filename="fact_checker.py"
          />
        </div>

        <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-[#22c4e0] mb-3">Example Output</h3>
          <CodeBlock
          code={`================================================================================
SOCIAL MEDIA FACT CHECKER
================================================================================

📋 Analyzing ./real_post.png...
--------------------------------------------------------------------------------
OCR Agent returned the following:
 Post from @NASA dated December 1, 2024: "Historic achievement!
 Artemis II crew successfully completed underwater training simulations
 at the Neutral Buoyancy Laboratory in Houston."

Fact Checker researching now...

✓ Analysis Complete

Verdict: ✅✅ LEGITIMATE

Reasoning:
Multiple credible sources confirm that NASA's Artemis II crew has indeed been
conducting underwater training simulations. The Neutral Buoyancy Laboratory in
Houston is a real NASA facility used for astronaut training. Official NASA
press releases and space news outlets have reported on this training activity
throughout 2024.

Relevant Sources (3):
  1. https://www.nasa.gov/artemis-ii-training
  2. https://spacenews.com/artemis-ii-crew-training-update
  3. https://www.space.com/nasa-artemis-underwater-training

Tools Used: 5 web searches performed

================================================================================
Analysis complete
================================================================================`}
          language="text"
        />
        </div>

        <div className="bg-[#be3389]/10 border border-[#be3389]/30 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-[#22c4e0] mb-3">⚡ Performance Comparison</h3>
          <p className="text-[#a0a0a3] mb-4">
            The same fact-checker implemented in LangChain or Agent Development Kit (ADK) results in:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-4">
              <h4 className="text-lg font-semibold text-[#22c4e0] mb-2">FeatherAI</h4>
              <ul className="space-y-2 text-sm text-[#a0a0a3]">
                <li>✅ ~80 lines of code</li>
                <li>✅ Clean, readable implementation</li>
                <li>✅ Fast execution with async tools</li>
                <li>✅ Easy to understand and maintain</li>
              </ul>
            </div>
            <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-4">
              <h4 className="text-lg font-semibold text-[#be3389] mb-2">LangChain / ADK</h4>
              <ul className="space-y-2 text-sm text-[#a0a0a3]">
                <li>❌ 180+ lines of code (2-3x more)</li>
                <li>❌ Complex chain abstractions</li>
                <li>❌ Slower execution overhead</li>
                <li>❌ Harder to debug and modify</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#be3389]/10 to-[#0357c1]/10 border border-[#2a2a2c] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-[#22c4e0] mb-3">💡 Key Takeaways</h3>
          <ul className="space-y-2 text-[#a0a0a3]">
            <li className="flex items-start gap-2">
              <span className="text-[#22c4e0] mt-1">▸</span>
              <span><strong className="text-[#e5e5e7]">Multi-agent workflows:</strong> Combine specialized agents for complex tasks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#22c4e0] mt-1">▸</span>
              <span><strong className="text-[#e5e5e7]">Async web tools:</strong> Parallel tool execution for 3x faster performance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#22c4e0] mt-1">▸</span>
              <span><strong className="text-[#e5e5e7]">Structured output:</strong> Type-safe results with Pydantic schemas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#22c4e0] mt-1">▸</span>
              <span><strong className="text-[#e5e5e7]">Multimodal input:</strong> Process images and text seamlessly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#22c4e0] mt-1">▸</span>
              <span><strong className="text-[#e5e5e7]">Clean code:</strong> 60% less code than LangChain/ADK equivalents</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
