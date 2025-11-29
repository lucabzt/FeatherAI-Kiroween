import CodeBlock from './CodeBlock';

// Demo component to verify CodeBlock functionality
function CodeBlockDemo() {
  const pythonCode = `from feather_ai import AIAgent

# Create an agent
agent = AIAgent(
    provider="openai",
    model="gpt-4",
    instructions="You are a helpful assistant."
)

# Run the agent
response = agent.run("Hello, world!")
print(response.content)`;

  const codeWithFilename = `def calculate_sum(a, b):
    """Calculate the sum of two numbers."""
    return a + b

result = calculate_sum(5, 3)
print(f"Result: {result}")`;

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">CodeBlock Component Demo</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">Basic Code Block</h2>
        <CodeBlock code={pythonCode} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">Code Block with Filename</h2>
        <CodeBlock code={codeWithFilename} filename="calculator.py" />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">JavaScript Example</h2>
        <CodeBlock 
          code={`function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`}
          language="javascript"
          filename="greet.js"
        />
      </section>
    </div>
  );
}

export default CodeBlockDemo;
