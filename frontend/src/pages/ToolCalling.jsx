import CodeBlock from '../components/CodeBlock/CodeBlock';

function ToolCalling() {
  return (
    <div className="max-w-4xl w-full">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-white break-words">Tool Calling</h1>
      
      <p className="text-gray-300 mb-6 text-lg">
        Tool calling enables your AI agents to execute custom functions, giving them the ability to interact with external systems, perform calculations, fetch data, and much more.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Defining and Using Tools</h2>
      <p className="text-gray-300 mb-4">
        Tools are Python functions that you define and pass to your agent. The agent can automatically call these functions when it determines they're needed to answer a prompt.
      </p>

      <p className="text-gray-300 mb-4">
        To use tools with FeatherAI:
      </p>
      <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2 ml-4">
        <li>Define your function with clear docstrings and type hints</li>
        <li>Pass the function to the <code className="bg-gray-800 px-2 py-1 rounded text-feather-cyan">tools</code> parameter</li>
        <li>The agent will automatically call the function when needed</li>
      </ol>

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Simple Function Example</h2>
      <p className="text-gray-300 mb-4">
        Here's a basic example of creating a tool that gets the current weather:
      </p>
      <CodeBlock 
        code={`from feather_ai import AIAgent

def get_weather(city: str) -> str:
    """Get the current weather for a city.
    
    Args:
        city: The name of the city to get weather for
        
    Returns:
        A string describing the current weather
    """
    # In a real application, this would call a weather API
    return f"The weather in {city} is sunny and 72°F"

# Create an agent with the tool
agent = AIAgent(
    provider="openai",
    model="gpt-4",
    tools=[get_weather]
)

# The agent will automatically call the function when needed
response = agent.run("What's the weather like in San Francisco?")
print(response.content)`}
        language="python"
      />

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Automatic Tool Execution</h2>
      <p className="text-gray-300 mb-4">
        When you provide tools to an agent, FeatherAI handles the entire tool calling workflow automatically:
      </p>
      <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2 ml-4">
        <li><strong className="text-feather-cyan">Detection:</strong> The agent analyzes the prompt and determines if a tool is needed</li>
        <li><strong className="text-feather-cyan">Execution:</strong> If needed, the agent calls the appropriate tool with the correct arguments</li>
        <li><strong className="text-feather-cyan">Integration:</strong> The tool's result is automatically incorporated into the agent's response</li>
        <li><strong className="text-feather-cyan">Iteration:</strong> The agent can call multiple tools or the same tool multiple times if needed</li>
      </ul>

      <CodeBlock 
        code={`from feather_ai import AIAgent

def calculate_tip(bill_amount: float, tip_percentage: float) -> float:
    """Calculate the tip amount for a bill.
    
    Args:
        bill_amount: The total bill amount in dollars
        tip_percentage: The tip percentage (e.g., 20 for 20%)
        
    Returns:
        The tip amount in dollars
    """
    return bill_amount * (tip_percentage / 100)

agent = AIAgent(
    provider="anthropic",
    model="claude-3-5-sonnet-20241022",
    tools=[calculate_tip]
)

# The agent will call calculate_tip automatically
response = agent.run("If my bill is $85.50 and I want to tip 18%, how much should I tip?")
print(response.content)
# Output: "You should tip $15.39. The total with tip would be $100.89."`}
        language="python"
      />

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Accessing Tool Traces</h2>
      <p className="text-gray-300 mb-4">
        You can access detailed information about tool calls from the AIResponse object. This is useful for debugging, logging, or understanding how the agent used your tools.
      </p>
      <CodeBlock 
        code={`from feather_ai import AIAgent

def search_database(query: str) -> str:
    """Search the database for information.
    
    Args:
        query: The search query
        
    Returns:
        Search results as a string
    """
    return f"Found 3 results for '{query}'"

agent = AIAgent(
    provider="openai",
    model="gpt-4",
    tools=[search_database]
)

response = agent.run("Search for customer records from last month")

# Access tool call information
if response.tool_trace:
    for tool_call in response.tool_trace:
        print(f"Tool: {tool_call.name}")
        print(f"Arguments: {tool_call.arguments}")
        print(f"Result: {tool_call.result}")

print(f"\\nFinal response: {response.content}")`}
        language="python"
      />

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">The tool_model Parameter</h2>
      <p className="text-gray-300 mb-4">
        For advanced use cases, you can specify a different model specifically for tool calling using the <code className="bg-gray-800 px-2 py-1 rounded text-feather-cyan">tool_model</code> parameter. This allows you to use a faster or cheaper model for tool decisions while using a more powerful model for the final response.
      </p>
      <CodeBlock 
        code={`from feather_ai import AIAgent

def get_stock_price(symbol: str) -> float:
    """Get the current stock price for a symbol.
    
    Args:
        symbol: The stock ticker symbol
        
    Returns:
        The current stock price
    """
    # Simulated stock price
    return 150.25

agent = AIAgent(
    provider="openai",
    model="gpt-4",  # Main model for responses
    tool_model="gpt-3.5-turbo",  # Faster model for tool calling
    tools=[get_stock_price]
)

response = agent.run("What's the current price of AAPL stock?")
print(response.content)`}
        language="python"
      />

      <div className="bg-gray-800 border-l-4 border-feather-blue p-4 my-6 rounded">
        <p className="text-gray-300">
          <strong className="text-feather-cyan">Best Practice:</strong> Always include clear docstrings and type hints in your tool functions. The agent uses this information to understand when and how to call your tools.
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-6 mt-8">
        <h3 className="text-xl font-semibold mb-3 text-white">Multiple Tools Example</h3>
        <p className="text-gray-300 mb-4">
          You can provide multiple tools to an agent, and it will intelligently choose which ones to use:
        </p>
        <CodeBlock 
          code={`from feather_ai import AIAgent

def add(a: float, b: float) -> float:
    """Add two numbers."""
    return a + b

def multiply(a: float, b: float) -> float:
    """Multiply two numbers."""
    return a * b

agent = AIAgent(
    provider="openai",
    model="gpt-4",
    tools=[add, multiply]
)

response = agent.run("What is (5 + 3) * 4?")
print(response.content)
# The agent will call add(5, 3), then multiply(8, 4)`}
          language="python"
        />
      </div>
    </div>
  );
}

export default ToolCalling;
