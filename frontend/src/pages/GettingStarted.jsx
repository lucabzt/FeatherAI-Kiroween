import CodeBlock from '../components/CodeBlock/CodeBlock';

function GettingStarted() {
  return (
    <div className="max-w-4xl w-full">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-white break-words">Getting Started</h1>
      
      <p className="text-gray-300 mb-6 text-lg">
        FeatherAI is a lightweight Python library for creating, running, orchestrating and tracing AI agents with tool calling and structured output.
      </p>

      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white mt-8 break-words">Installation</h2>
      <p className="text-gray-300 mb-4 break-words">
        Install FeatherAI using pip:
      </p>
      <CodeBlock 
        code="pip install feather-ai"
        language="bash"
      />

      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white mt-8 break-words">Requirements</h2>
      <p className="text-gray-300 mb-4 break-words">
        FeatherAI requires Python version <code className="bg-gray-800 px-2 py-1 rounded text-feather-cyan text-sm">3.9</code> or higher, up to (but not including) <code className="bg-gray-800 px-2 py-1 rounded text-feather-cyan text-sm">3.14</code>.
      </p>

      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white mt-8 break-words">API Key Setup</h2>
      <p className="text-gray-300 mb-4">
        FeatherAI supports multiple AI providers. You'll need an API key from at least one of the following:
      </p>
      <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
        <li className="break-words"><strong className="text-feather-cyan">OpenAI</strong> - Set the <code className="bg-gray-800 px-2 py-1 rounded text-sm break-all">OPENAI_API_KEY</code> environment variable</li>
        <li className="break-words"><strong className="text-feather-cyan">Anthropic (Claude)</strong> - Set the <code className="bg-gray-800 px-2 py-1 rounded text-sm break-all">ANTHROPIC_API_KEY</code> environment variable</li>
        <li className="break-words"><strong className="text-feather-cyan">Google (Gemini)</strong> - Set the <code className="bg-gray-800 px-2 py-1 rounded text-sm break-all">GOOGLE_API_KEY</code> environment variable</li>
        <li className="break-words"><strong className="text-feather-cyan">Mistral</strong> - Set the <code className="bg-gray-800 px-2 py-1 rounded text-sm break-all">MISTRAL_API_KEY</code> environment variable</li>
      </ul>

      <p className="text-gray-300 mb-4 break-words">
        You can set environment variables in your terminal or use a <code className="bg-gray-800 px-2 py-1 rounded text-sm">.env</code> file:
      </p>
      <CodeBlock 
        code={`export OPENAI_API_KEY="your-api-key-here"
# or
export ANTHROPIC_API_KEY="your-api-key-here"`}
        language="bash"
      />

      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white mt-8 break-words">Basic Usage</h2>
      <p className="text-gray-300 mb-4 break-words">
        Here's a simple example to get you started with FeatherAI:
      </p>
      <CodeBlock 
        code={`from feather_ai import AIAgent

# Create an agent with your preferred provider
agent = AIAgent(provider="openai", model="gpt-4")

# Run a simple prompt
response = agent.run("What is the capital of France?")
print(response.content)`}
        language="python"
      />

      <p className="text-gray-300 mb-4 mt-6 break-words">
        The agent will automatically use the API key from your environment variables. The <code className="bg-gray-800 px-2 py-1 rounded text-sm">run()</code> method sends your prompt to the AI model and returns a response object.
      </p>

      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white mt-8 break-words">Simple Prompt Example</h2>
      <p className="text-gray-300 mb-4 break-words">
        You can use FeatherAI for various tasks. Here's an example of using it as a helpful assistant:
      </p>
      <CodeBlock 
        code={`from feather_ai import AIAgent

# Create an agent
agent = AIAgent(provider="anthropic", model="claude-3-5-sonnet-20241022")

# Ask a question
prompt = "Explain what an AI agent is in simple terms."
response = agent.run(prompt)

print(response.content)`}
        language="python"
      />

      <div className="bg-gray-800 border-l-4 border-feather-blue p-4 my-6 rounded max-w-full">
        <p className="text-gray-300 break-words">
          <strong className="text-feather-cyan">Next Steps:</strong> Explore the other sections to learn about advanced features like system instructions, tool calling, structured output, and multimodal capabilities.
        </p>
      </div>
    </div>
  );
}

export default GettingStarted;
