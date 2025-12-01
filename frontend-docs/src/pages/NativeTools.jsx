import PageHeader from '../components/PageHeader';
import CodeBlock from '../components/CodeBlock';

export default function NativeTools() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Native Tools"
        description="Built-in tools for web search and code execution"
      />

      <section className="space-y-4">
        <p className="text-[#a0a0a3] leading-relaxed">
          FeatherAI comes with powerful built-in tools that you can use out of the box.
          These tools are optimized for performance and easy to integrate into your agents.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#e5e5e7]">Web Search Tools</h2>
        <p className="text-[#a0a0a3] leading-relaxed">
          FeatherAI provides three web search tools powered by Tavily API for retrieving and processing web content.
        </p>

        <div className="bg-[#0357c1]/10 border border-[#0357c1]/30 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-[#22c4e0] mb-2">🔑 API Key Required</h3>
          <p className="text-[#a0a0a3] mb-2">
            To use web search tools, you need to set the <code className="px-2 py-1 bg-[#2a2a2c] rounded text-[#22c4e0]">TAVILY_API_KEY</code> environment variable.
            Get your free API key at <a href="https://www.tavily.com/" target="_blank" rel="noopener noreferrer" className="text-[#22c4e0] hover:text-[#1ab3c9] underline">tavily.com</a>.
          </p>
          <CodeBlock
            code="TAVILY_API_KEY=your_tavily_key_here"
            language="bash"
            filename=".env"
          />
        </div>

        <div className="space-y-6">
          {/* Google Search */}
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#22c4e0] mb-3">google_search</h3>
            <p className="text-[#a0a0a3] mb-4">
              Simple google search tool for recent events and facts. Returns a curated list of relevant results.
            </p>
            <CodeBlock
              code={`from feather_ai.tools.web import google_search

# Perform a search
results = google_search("Champions League Winner 2025")
print(results)`}
              language="python"
            />
          </div>

          {/* Extract */}
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#22c4e0] mb-3">extract</h3>
            <p className="text-[#a0a0a3] mb-4">
              Extracts raw content from the provided URLs. Returns a list of dictionaries with keys: title, url, raw_content, and favicon.
            </p>
            <CodeBlock
              code={`from feather_ai.tools.web import extract

# Extract content from URLs
urls = ["https://example.com", "https://example.org"]
content = extract(urls)
print(content)`}
              language="python"
            />
          </div>

          {/* Crawl */}
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#22c4e0] mb-3">crawl</h3>
            <p className="text-[#a0a0a3] mb-4">
              Extracts all subpages of the given URL. Returns a list of subpages that can be extracted with the extract tool.
            </p>
            <CodeBlock
              code={`from feather_ai.tools.web import crawl

# Crawl a website for subpages
subpages = crawl("https://example.com")
print(subpages)`}
              language="python"
            />
          </div>
        </div>

        {/* Import all web tools */}
        <div className="bg-[#be3389]/10 border border-[#be3389]/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-[#22c4e0] mb-2">💡 Quick Import</h3>
          <p className="text-[#a0a0a3] mb-3">
            You can import all web search tools at once:
          </p>
          <CodeBlock
            code={`from feather_ai.tools.web import web_tools

# Use all synchronous web tools
agent = AIAgent(
    model="gpt-4",
    instructions="You are a research assistant",
    tools=web_tools
)`}
            language="python"
          />
          <p className="text-[#a0a0a3] mt-3">
            For async versions, use <code className="px-2 py-1 bg-[#2a2a2c] rounded text-[#22c4e0]">web_tools_async</code>:
          </p>
          <CodeBlock
            code={`from feather_ai.tools.web import web_tools_async

# Use all asynchronous web tools (for better performance)
agent = AIAgent(
    model="gpt-4",
    instructions="You are a research assistant",
    tools=web_tools_async
)`}
            language="python"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#e5e5e7]">Code Execution Tool</h2>
        <p className="text-[#a0a0a3] leading-relaxed">
          Execute Python code dynamically within your agent. Useful for mathematical computations, data processing, and more.
        </p>

        <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-[#22c4e0] mb-3">code_execution_python</h3>
          <p className="text-[#a0a0a3] mb-4">
            A Python shell for executing Python commands. Input should be valid Python code.
            Use <code className="px-2 py-1 bg-[#2a2a2c] rounded text-[#22c4e0]">print(...)</code> to see output values.
          </p>
          <CodeBlock
            code={`from feather_ai import AIAgent
from feather_ai.tools.code_execution import code_execution_python

# Create an agent with code execution capabilities
agent = AIAgent(
    model="gpt-4",
    instructions="You are a helpful math assistant",
    tools=[code_execution_python]
)

# The agent can now execute Python code
response = agent.run("Calculate the factorial of 10")
print(response.content)`}
            language="python"
          />
        </div>

        <div className="bg-[#0357c1]/10 border border-[#0357c1]/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-[#22c4e0] mb-2">⚠️ Security Note</h3>
          <p className="text-[#a0a0a3]">
            Code execution tools run arbitrary Python code. Only use them in controlled environments
            and never with untrusted user input.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#e5e5e7]">Complete Example</h2>
        <p className="text-[#a0a0a3] leading-relaxed">
          Here's an example combining web search and code execution:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent
from feather_ai.tools.web import web_tools
from feather_ai.tools.code_execution import code_execution_python

# Create a multi-tool agent
agent = AIAgent(
    model="gpt-4",
    instructions="You are a research and data analysis assistant",
    tools=[*web_tools, code_execution_python]
)

# The agent can search the web and perform calculations
response = agent.run(
    "Find the current population of Tokyo and calculate "
    "how many people that is per square kilometer if the area is 2,194 km²"
)
print(response.content)`}
          language="python"
        />
      </section>
    </div>
  );
}
