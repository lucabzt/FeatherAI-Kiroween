import CodeBlock from '../components/CodeBlock/CodeBlock';

function SystemInstructions() {
  return (
    <div className="max-w-4xl w-full">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-white break-words">System Instructions</h1>
      
      <p className="text-gray-300 mb-6 text-lg">
        System instructions allow you to define the behavior and personality of your AI agent. They act as a persistent context that guides how the agent responds to all prompts.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">The Instructions Parameter</h2>
      <p className="text-gray-300 mb-4">
        The <code className="bg-gray-800 px-2 py-1 rounded text-feather-cyan">instructions</code> parameter is an optional string that you can pass when creating an AIAgent. It sets the system-level context for all interactions with that agent.
      </p>

      <CodeBlock 
        code={`from feather_ai import AIAgent

# Create an agent with system instructions
agent = AIAgent(
    provider="openai",
    model="gpt-4",
    instructions="You are a helpful Python programming assistant. Always provide clear, concise code examples."
)

response = agent.run("How do I read a file in Python?")
print(response.content)`}
        language="python"
      />

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">How Instructions Affect Behavior</h2>
      <p className="text-gray-300 mb-4">
        System instructions fundamentally shape how your agent interprets and responds to prompts. They establish:
      </p>
      <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2 ml-4">
        <li><strong className="text-feather-cyan">Personality and tone</strong> - Whether the agent is formal, casual, technical, or friendly</li>
        <li><strong className="text-feather-cyan">Domain expertise</strong> - The agent's area of specialization or knowledge focus</li>
        <li><strong className="text-feather-cyan">Response format</strong> - How the agent structures its answers (e.g., step-by-step, bullet points)</li>
        <li><strong className="text-feather-cyan">Constraints and rules</strong> - What the agent should or shouldn't do</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Use Case 1: Customer Support Agent</h2>
      <p className="text-gray-300 mb-4">
        Create a friendly, empathetic customer support agent that follows company guidelines:
      </p>
      <CodeBlock 
        code={`from feather_ai import AIAgent

# Customer support agent with specific instructions
support_agent = AIAgent(
    provider="anthropic",
    model="claude-3-5-sonnet-20241022",
    instructions="""You are a customer support agent for TechCorp.
    - Always be polite, empathetic, and professional
    - Acknowledge the customer's concerns before providing solutions
    - Offer step-by-step troubleshooting when appropriate
    - If you cannot resolve an issue, suggest escalating to a human agent
    - Never make promises about refunds or compensation"""
)

# The agent will follow these guidelines in all responses
response = support_agent.run("My product stopped working after 2 days!")
print(response.content)`}
        language="python"
      />

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Use Case 2: Code Review Assistant</h2>
      <p className="text-gray-300 mb-4">
        Build a technical agent that provides constructive code reviews:
      </p>
      <CodeBlock 
        code={`from feather_ai import AIAgent

# Code review agent with technical focus
code_reviewer = AIAgent(
    provider="openai",
    model="gpt-4",
    instructions="""You are an expert code reviewer specializing in Python.
    - Focus on code quality, readability, and best practices
    - Identify potential bugs, security issues, and performance problems
    - Suggest specific improvements with code examples
    - Be constructive and educational in your feedback
    - Prioritize issues by severity (critical, important, minor)"""
)

code_to_review = """
def calculate_total(items):
    total = 0
    for i in items:
        total = total + i['price']
    return total
"""

response = code_reviewer.run(f"Please review this code:\\n{code_to_review}")
print(response.content)`}
        language="python"
      />

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Parameter Details</h2>
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <p className="text-gray-300 mb-2">
          <strong className="text-feather-cyan">Parameter:</strong> <code className="bg-gray-900 px-2 py-1 rounded">instructions</code>
        </p>
        <p className="text-gray-300 mb-2">
          <strong className="text-feather-cyan">Type:</strong> <code className="bg-gray-900 px-2 py-1 rounded">str | None</code>
        </p>
        <p className="text-gray-300 mb-2">
          <strong className="text-feather-cyan">Default:</strong> <code className="bg-gray-900 px-2 py-1 rounded">None</code>
        </p>
        <p className="text-gray-300">
          <strong className="text-feather-cyan">Description:</strong> Optional string that sets the system-level context for the agent. When provided, these instructions persist across all interactions with the agent.
        </p>
      </div>

      <div className="bg-gray-800 border-l-4 border-feather-pink p-4 my-6 rounded">
        <p className="text-gray-300">
          <strong className="text-feather-cyan">Tip:</strong> Keep instructions clear and specific. The more precise your instructions, the more consistent your agent's behavior will be.
        </p>
      </div>
    </div>
  );
}

export default SystemInstructions;
