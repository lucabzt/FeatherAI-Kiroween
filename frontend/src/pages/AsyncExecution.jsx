import CodeBlock from '../components/CodeBlock/CodeBlock';

function AsyncExecution() {
  return (
    <div className="max-w-4xl w-full">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-white break-words">Asynchronous Execution</h1>
      
      <p className="text-gray-300 mb-6 text-lg">
        FeatherAI supports asynchronous execution, allowing you to build high-performance applications that can handle multiple AI operations concurrently. This is especially useful for web applications, batch processing, and scenarios where you need to run multiple agents in parallel.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">The arun Method</h2>
      <p className="text-gray-300 mb-4">
        The <code className="bg-gray-800 px-2 py-1 rounded text-feather-cyan">arun()</code> method is the asynchronous version of <code className="bg-gray-800 px-2 py-1 rounded">run()</code>. It has the same signature and returns the same response type, but it's an async function that can be awaited.
      </p>

      <CodeBlock 
        code={`from feather_ai import AIAgent

async def main():
    agent = AIAgent(provider="openai", model="gpt-4")
    
    # Use arun instead of run
    response = await agent.arun("What is the capital of France?")
    print(response.content)

# Run the async function
import asyncio
asyncio.run(main())`}
        language="python"
      />

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Using await with agent.arun()</h2>
      <p className="text-gray-300 mb-4">
        The <code className="bg-gray-800 px-2 py-1 rounded">await</code> keyword is used to wait for the async operation to complete. This allows other async operations to run concurrently while waiting for the AI response.
      </p>

      <CodeBlock 
        code={`from feather_ai import AIAgent
import asyncio

async def ask_question(agent, question):
    """Ask a question and return the response."""
    response = await agent.arun(question)
    return response.content

async def main():
    agent = AIAgent(
        provider="anthropic",
        model="claude-3-5-sonnet-20241022"
    )
    
    # Use await to get the response
    answer = await ask_question(agent, "Explain async programming in Python")
    print(answer)

asyncio.run(main())`}
        language="python"
      />

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Complete asyncio Example</h2>
      <p className="text-gray-300 mb-4">
        Here's a complete example showing how to use asyncio with FeatherAI:
      </p>

      <CodeBlock 
        code={`import asyncio
from feather_ai import AIAgent

async def process_query(agent, query, query_id):
    """Process a single query asynchronously."""
    print(f"Starting query {query_id}: {query}")
    response = await agent.arun(query)
    print(f"Completed query {query_id}")
    return {
        "id": query_id,
        "query": query,
        "response": response.content
    }

async def main():
    # Create an agent
    agent = AIAgent(
        provider="openai",
        model="gpt-4",
        instructions="Provide concise answers."
    )
    
    # Process a single query
    result = await process_query(
        agent,
        "What is machine learning?",
        1
    )
    print(f"Result: {result['response']}")

if __name__ == "__main__":
    asyncio.run(main())`}
        language="python"
      />

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Async Function Tools</h2>
      <p className="text-gray-300 mb-4">
        You can pass async functions as tools to your agents. FeatherAI will automatically handle them correctly:
      </p>

      <CodeBlock 
        code={`import asyncio
from feather_ai import AIAgent

async def fetch_user_data(user_id: int) -> dict:
    """Fetch user data from a database (simulated with async delay).
    
    Args:
        user_id: The ID of the user to fetch
        
    Returns:
        A dictionary with user information
    """
    # Simulate async database call
    await asyncio.sleep(0.5)
    return {
        "id": user_id,
        "name": f"User {user_id}",
        "email": f"user{user_id}@example.com"
    }

async def main():
    agent = AIAgent(
        provider="openai",
        model="gpt-4",
        tools=[fetch_user_data]  # Pass async function as tool
    )
    
    # The agent will await the async tool automatically
    response = await agent.arun("Get information for user ID 42")
    print(response.content)

asyncio.run(main())`}
        language="python"
      />

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Running Multiple Agents Concurrently</h2>
      <p className="text-gray-300 mb-4">
        One of the main benefits of async execution is the ability to run multiple agents concurrently, significantly improving performance:
      </p>

      <CodeBlock 
        code={`import asyncio
from feather_ai import AIAgent

async def main():
    # Create multiple agents
    agent1 = AIAgent(provider="openai", model="gpt-4")
    agent2 = AIAgent(provider="anthropic", model="claude-3-5-sonnet-20241022")
    agent3 = AIAgent(provider="google", model="gemini-2.0-flash-exp")
    
    # Define tasks for each agent
    tasks = [
        agent1.arun("What is Python?"),
        agent2.arun("What is JavaScript?"),
        agent3.arun("What is Rust?")
    ]
    
    # Run all agents concurrently
    print("Running 3 agents concurrently...")
    responses = await asyncio.gather(*tasks)
    
    # Process results
    for i, response in enumerate(responses, 1):
        print(f"\\nAgent {i} response:")
        print(response.content)

asyncio.run(main())`}
        language="python"
      />

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Batch Processing Example</h2>
      <p className="text-gray-300 mb-4">
        Process multiple items efficiently using async execution:
      </p>

      <CodeBlock 
        code={`import asyncio
from feather_ai import AIAgent
from pydantic import BaseModel

class Sentiment(BaseModel):
    text: str
    sentiment: str  # positive, negative, or neutral
    confidence: float

async def analyze_sentiment(agent, text):
    """Analyze sentiment of a single text."""
    response = await agent.arun(f"Analyze the sentiment of: {text}")
    return response.content

async def main():
    # Create an agent with structured output
    agent = AIAgent(
        provider="openai",
        model="gpt-4",
        output_schema=Sentiment
    )
    
    # Batch of texts to analyze
    texts = [
        "I love this product! It's amazing!",
        "This is the worst experience ever.",
        "It's okay, nothing special.",
        "Absolutely fantastic service!",
        "Not great, not terrible."
    ]
    
    # Create tasks for all texts
    tasks = [analyze_sentiment(agent, text) for text in texts]
    
    # Run all analyses concurrently
    print(f"Analyzing {len(texts)} texts concurrently...")
    results = await asyncio.gather(*tasks)
    
    # Display results
    for result in results:
        print(f"Text: {result.text}")
        print(f"Sentiment: {result.sentiment} (confidence: {result.confidence})")
        print()

asyncio.run(main())`}
        language="python"
      />

      <div className="bg-gray-800 border-l-4 border-feather-pink p-4 my-6 rounded">
        <p className="text-gray-300">
          <strong className="text-feather-cyan">Performance Tip:</strong> Using async execution with <code className="bg-gray-900 px-2 py-1 rounded">asyncio.gather()</code> can dramatically reduce total execution time when processing multiple requests. Instead of waiting for each request sequentially, they all run concurrently.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">When to Use Async</h2>
      <div className="space-y-3 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-feather-cyan font-semibold mb-2">✓ Use async when:</h4>
          <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 ml-4">
            <li>Building web applications (FastAPI, Django async views)</li>
            <li>Processing multiple requests concurrently</li>
            <li>Running multiple agents in parallel</li>
            <li>Integrating with other async libraries</li>
            <li>Batch processing large datasets</li>
          </ul>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-feather-cyan font-semibold mb-2">✓ Use sync (run) when:</h4>
          <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 ml-4">
            <li>Writing simple scripts</li>
            <li>Processing one request at a time</li>
            <li>Working in Jupyter notebooks</li>
            <li>You don't need concurrent execution</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-800 border-l-4 border-feather-blue p-4 my-6 rounded">
        <p className="text-gray-300">
          <strong className="text-feather-cyan">Note:</strong> Both <code className="bg-gray-900 px-2 py-1 rounded">run()</code> and <code className="bg-gray-900 px-2 py-1 rounded">arun()</code> have identical signatures and return the same response type. You can easily switch between them based on your needs.
        </p>
      </div>
    </div>
  );
}

export default AsyncExecution;
