import PageHeader from '../components/PageHeader';
import CodeBlock from '../components/CodeBlock';

export default function AsynchronousTools() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Asynchronous Tools"
        description="Async tools for parallel execution and improved performance"
      />

      <section className="space-y-4">
        <p className="text-[#a0a0a3] leading-relaxed">
          FeatherAI supports asynchronous tools that enable parallel tool execution. When multiple async tools are called by an agent,
          they run concurrently, dramatically reducing total execution time.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#e5e5e7]">Async Web Search Tools</h2>
        <p className="text-[#a0a0a3] leading-relaxed">
          All web search tools have async versions that can be executed in parallel:
        </p>
        <div className="space-y-6">
          {/* google_search_async */}
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#22c4e0] mb-3">google_search_async</h3>
            <p className="text-[#a0a0a3] mb-4">
              Asynchronous version of google_search. Performs web searches concurrently when multiple searches are needed.
            </p>
            <CodeBlock
          code={`from feather_ai.tools.web import google_search_async

# Use in async context
result = await google_search_async("Latest AI developments 2025")`}
          language="python"
        />
          </div>

          {/* extract_async */}
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#22c4e0] mb-3">extract_async</h3>
            <p className="text-[#a0a0a3] mb-4">
              Asynchronous content extraction from URLs. Extracts multiple URLs in parallel.
            </p>
            <CodeBlock
          code={`from feather_ai.tools.web import extract_async

# Extract content from multiple URLs concurrently
urls = ["https://example.com", "https://example.org"]
content = await extract_async(urls)`}
          language="python"
        />
          </div>

          {/* crawl_async */}
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#22c4e0] mb-3">crawl_async</h3>
            <p className="text-[#a0a0a3] mb-4">
              Asynchronous website crawling to discover subpages.
            </p>
            <CodeBlock
          code={`from feather_ai.tools.web import crawl_async

# Crawl website asynchronously
subpages = await crawl_async("https://example.com")`}
          language="python"
        />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#e5e5e7]">Using Async Tools with Agents</h2>
        <p className="text-[#a0a0a3] leading-relaxed">
          When you provide async tools to an agent, they will automatically execute in parallel when the agent calls multiple tools:
        </p>
        <CodeBlock
          code={`import asyncio
from feather_ai import AIAgent
from feather_ai.tools.web import web_tools_async

async def main():
    # Create agent with async web tools
    agent = AIAgent(
        model="gpt-4",
        instructions="You are a research assistant",
        tools=web_tools_async  # Use async versions for better performance
    )

    # The agent will automatically run multiple searches in parallel
    response = await agent.arun(
        "Research the latest developments in quantum computing and AI, "
        "then extract detailed information from the top sources"
    )

    print(response.content)

asyncio.run(main())`}
          language="python"
        />
        <div className="bg-[#be3389]/10 border border-[#be3389]/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-[#22c4e0] mb-2">⚡ Performance Benefit</h3>
          <p className="text-[#a0a0a3]">
            If the agent decides to make 3 web searches, async tools will execute all 3 searches in parallel
            instead of waiting for each one to complete sequentially. This can reduce execution time by 60-70%!
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#e5e5e7]">Importing All Async Web Tools</h2>
        <p className="text-[#a0a0a3] leading-relaxed">
          For convenience, you can import all async web tools at once:
        </p>
        <CodeBlock
          code={`from feather_ai.tools.web import web_tools_async
from feather_ai import AIAgent

# web_tools_async contains: [google_search_async, extract_async, crawl_async]

agent = AIAgent(
    model="gpt-4",
    instructions="You are a research assistant",
    tools=web_tools_async
)

# All tools are now available to the agent
response = await agent.arun("Your research task here...")`}
          language="python"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#e5e5e7]">Custom Async Tools</h2>
        <p className="text-[#a0a0a3] leading-relaxed">
          You can also create your own async tools by defining async functions:
        </p>
        <CodeBlock
          code={`import asyncio
import aiohttp
from feather_ai import AIAgent

async def fetch_api_data(endpoint: str) -> str:
    """
    Fetches data from an API endpoint asynchronously
    Args:
        endpoint: The API endpoint URL
    Returns:
        JSON response as a string
    """
    async with aiohttp.ClientSession() as session:
        async with session.get(endpoint) as response:
            data = await response.json()
            return str(data)

async def main():
    # Use custom async tool with agent
    agent = AIAgent(
        model="gpt-4",
        instructions="You are an API assistant",
        tools=[fetch_api_data]
    )

    response = await agent.arun("Fetch data from https://api.example.com/data")
    print(response.content)

asyncio.run(main())`}
          language="python"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#e5e5e7]">Sync vs Async Tools Comparison</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#be3389] mb-3">Synchronous Tools</h3>
            <CodeBlock
          code={`# Sequential execution
from feather_ai.tools.web import web_tools

agent = AIAgent(
    model="gpt-4",
    tools=web_tools  # Sync version
)

# Tools execute one after another
response = agent.run("Research task")
# Total time: ~15 seconds (5s per search × 3 searches)`}
          language="python"
        />
          </div>
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#22c4e0] mb-3">Asynchronous Tools</h3>
            <CodeBlock
          code={`# Parallel execution
from feather_ai.tools.web import web_tools_async

agent = AIAgent(
    model="gpt-4",
    tools=web_tools_async  # Async version
)

# Tools execute in parallel
response = await agent.arun("Research task")
# Total time: ~5 seconds (all 3 searches run simultaneously)`}
          language="python"
        />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#e5e5e7]">Best Practices</h2>
        <div className="space-y-3">
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#22c4e0] mb-2">✅ Do:</h3>
            <ul className="list-disc list-inside space-y-1 text-[#a0a0a3] ml-4">
              <li>Use async tools when performance matters</li>
              <li>Combine async tools with the <code className="px-2 py-1 bg-[#2a2a2c] rounded text-[#22c4e0]">arun</code> method</li>
              <li>Use async tools for I/O-bound operations (web requests, file operations)</li>
              <li>Create custom async tools for API calls or database queries</li>
            </ul>
          </div>
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#be3389] mb-2">❌ Don't:</h3>
            <ul className="list-disc list-inside space-y-1 text-[#a0a0a3] ml-4">
              <li>Mix sync and async tools in the same agent (stick to one pattern)</li>
              <li>Use async tools with the synchronous <code className="px-2 py-1 bg-[#2a2a2c] rounded text-[#22c4e0]">run</code> method</li>
              <li>Make CPU-bound operations async (they won't benefit from parallelization)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
