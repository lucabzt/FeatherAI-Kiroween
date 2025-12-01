import CodeBlock from '../components/CodeBlock';
import PageHeader from '../components/PageHeader';

export default function GettingStarted() {
  return (
    <div className="max-w-none">
      <PageHeader
        title="Getting Started"
        subtitle="With the lightest Agentic AI framework you'll ever see"
      />


      {/* Installation */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-2 text-white">Installation</h2>
        <p className="text-[#a0a0a3] mb-4">
          Install FeatherAI using pip:
        </p>
        <CodeBlock
          code="pip install feather-ai-sdk"
          language="bash"
        />
      </section>

      {/* Environment Setup */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-2 text-white">Environment Setup</h2>
        <p className="text-[#a0a0a3] mb-4">
          Before using FeatherAI, you need to set up API keys for the LLM providers you plan to use.
          Create a <code className="px-2 py-1 bg-[#2a2a2c] rounded text-[#22c4e0]">.env</code> file in your project root:
        </p>
        <CodeBlock
          code={`# OpenAI (for GPT models)
OPENAI_API_KEY=your_openai_key_here

# Anthropic (for Claude models)
ANTHROPIC_API_KEY=your_anthropic_key_here

# Google (for Gemini models)
GOOGLE_API_KEY=your_google_key_here

# For web search tools (optional)
TAVILY_API_KEY=your_tavily_key_here`}
          language="bash"
          filename=".env"
        />
        <div className="bg-[#0357c1]/10 border border-[#0357c1]/30 rounded-lg p-4 mt-4">
          <p className="text-[#a0a0a3] text-sm">
            <strong className="text-[#22c4e0]">Note:</strong> You only need to set the API keys for the providers you'll use.
            For example, if you only use GPT-4, you only need <code className="px-2 py-1 bg-[#2a2a2c] rounded text-[#22c4e0]">OPENAI_API_KEY</code>.
          </p>
        </div>
      </section>

      {/* Quick Start */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-2 text-white">Quick Start</h2>
        <p className="text-[#a0a0a3] mb-4">
          Create your first AI agent in just a few lines of code:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create an agent
agent = AIAgent(model="gpt-4")

# Run the agent
response = agent.run("What is the capital of France?")
print(response.content)  # Output: Paris`}
          language="python"
          filename="basic_example.py"
        />
      </section>

      {/* Supported Models */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-2 text-white">Supported Models</h2>
        <p className="text-[#a0a0a3] mb-4">
          FeatherAI supports a wide range of LLM providers:
        </p>
        <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6">
          <ul className="space-y-2 text-[#a0a0a3]">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#22c4e0] rounded-full"></span>
              <strong className="text-white">Claude:</strong> claude-haiku-4-5, claude-sonnet-4-5, etc.
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#be3389] rounded-full"></span>
              <strong className="text-white">OpenAI:</strong> gpt-4, gpt-5-nano, etc.
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0357c1] rounded-full"></span>
              <strong className="text-white">Google:</strong> gemini-2.5-flash-lite, etc.
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#dfa987] rounded-full"></span>
              <strong className="text-white">Mistral:</strong> mistral-small-2506, etc.
            </li>
          </ul>
        </div>
      </section>

      {/* Basic Configuration */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-2 text-white">Basic Configuration</h2>
        <p className="text-[#a0a0a3] mb-4">
          Configure your agent with custom instructions:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent

agent = AIAgent(
    model="claude-haiku-4-5",
    instructions="You are a helpful assistant that provides concise answers."
)

response = agent.run("Explain quantum computing in simple terms")
print(response.content)`}
          language="python"
          filename="configuration.py"
        />
      </section>

      {/* Next Steps */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-2 text-white">Next Steps</h2>
        <p className="text-[#a0a0a3] mb-4">
          Now that you have FeatherAI installed, explore more features:
        </p>
        <div className="grid grid-cols-1 gap-4">
          <a
            href="/system-instructions"
            className="block bg-gradient-to-r from-[#be3389]/10 to-[#0357c1]/10 border border-[#2a2a2c] hover:border-[#22c4e0] rounded-lg p-4 transition-colors"
          >
            <h3 className="text-lg font-semibold text-[#22c4e0] mb-2">System Instructions →</h3>
            <p className="text-sm text-[#a0a0a3]">Learn how to provide detailed instructions to your agents</p>
          </a>
          <a
            href="/tool-calling"
            className="block bg-gradient-to-r from-[#be3389]/10 to-[#0357c1]/10 border border-[#2a2a2c] hover:border-[#22c4e0] rounded-lg p-4 transition-colors"
          >
            <h3 className="text-lg font-semibold text-[#22c4e0] mb-2">Tool Calling →</h3>
            <p className="text-sm text-[#a0a0a3]">Integrate custom functions and tools with your agents</p>
          </a>
          <a
            href="/examples"
            className="block bg-gradient-to-r from-[#be3389]/10 to-[#0357c1]/10 border border-[#2a2a2c] hover:border-[#22c4e0] rounded-lg p-4 transition-colors"
          >
            <h3 className="text-lg font-semibold text-[#22c4e0] mb-2">Examples →</h3>
            <p className="text-sm text-[#a0a0a3]">See real-world examples and use cases</p>
          </a>
        </div>
      </section>
    </div>
  );
}
