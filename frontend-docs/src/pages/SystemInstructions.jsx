import CodeBlock from '../components/CodeBlock';
import PageHeader from '../components/PageHeader';

export default function SystemInstructions() {
  return (
    <div className="max-w-none">
      <PageHeader
        title="System Instructions"
        subtitle="Guide your agents with custom system instructions"
      />

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">What are System Instructions?</h2>
        <p className="text-[#a0a0a3] mb-4">
          System instructions are the foundation of your AI agent's behavior. They define the agent's
          role, personality, constraints, and how it should respond to user queries. Think of them as
          the "constitution" that guides every interaction your agent has.
        </p>
      </section>

      {/* Basic Usage */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Basic Usage</h2>
        <p className="text-[#a0a0a3] mb-4">
          Pass instructions directly when creating an agent:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent

agent = AIAgent(
    model="claude-haiku-4-5",
    instructions="You are a helpful Python programming assistant. Provide clear, concise code examples with explanations."
)

response = agent.run("How do I read a CSV file?")
print(response.content)`}
          language="python"
          filename="basic_instructions.py"
        />
      </section>

      {/* Multi-line Instructions */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Multi-line Instructions</h2>
        <p className="text-[#a0a0a3] mb-4">
          For more complex instructions, use multi-line strings:
        </p>
        <CodeBlock
          code={`from feather_ai import AIAgent

instructions = """
You are an expert data scientist assistant with the following guidelines:

1. Always explain your reasoning step by step
2. Provide code examples in Python
3. Suggest best practices and potential pitfalls
4. Keep responses concise but comprehensive
5. When dealing with data, always consider edge cases

Your tone should be professional yet friendly.
"""

agent = AIAgent(
    model="gpt-4",
    instructions=instructions
)

response = agent.run("How should I handle missing data in my dataset?")
print(response.content)`}
          language="python"
          filename="multiline_instructions.py"
        />
      </section>

      {/* Loading from File */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Loading Instructions from File</h2>
        <p className="text-[#a0a0a3] mb-4">
          For better organization and reusability, store your instructions in separate files.
          FeatherAI provides a utility function to load instructions from text files:
        </p>

        <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6 mb-4">
          <h3 className="text-lg font-semibold text-[#22c4e0] mb-3">Step 1: Create an instructions file</h3>
          <p className="text-sm text-[#a0a0a3] mb-3">
            Create a file named <code className="bg-[#0a0a0b] px-2 py-1 rounded text-[#dfa987]">customer_service_agent.txt</code>:
          </p>
          <CodeBlock
            code={`You are a customer service AI assistant for TechCorp, a software company.

Guidelines:
- Always greet customers warmly
- Be empathetic to customer concerns
- Provide clear, step-by-step solutions
- If you don't know something, be honest and offer to escalate
- Keep responses professional but friendly
- Never share confidential information

Company Values:
- Customer satisfaction is our top priority
- Transparency and honesty in all interactions
- Continuous improvement and learning

Constraints:
- Do not make promises about refunds without manager approval
- Do not share technical implementation details
- Always prioritize customer data privacy`}
            language="text"
            filename="customer_service_agent.txt"
          />
        </div>

        <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6 mb-4">
          <h3 className="text-lg font-semibold text-[#22c4e0] mb-3">Step 2: Load and use the instructions</h3>
          <CodeBlock
            code={`from feather_ai import AIAgent
from feather_ai.utils import load_instructions_from_file

# Load instructions from file
instructions = load_instructions_from_file("customer_service_agent.txt")

# Create agent with loaded instructions
agent = AIAgent(
    model="claude-haiku-4-5",
    instructions=instructions
)

# Use the agent
response = agent.run("I'm having trouble logging into my account")
print(response.content)`}
            language="python"
            filename="load_from_file.py"
          />
        </div>
      </section>
    </div>
  );
}
