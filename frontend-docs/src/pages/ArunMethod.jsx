import PageHeader from '../components/PageHeader';
import CodeBlock from '../components/CodeBlock';

export default function ArunMethod() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="arun Method"
        description="Asynchronous agent execution for better performance"
      />

      <section className="space-y-4">
        <p className="text-[#a0a0a3] leading-relaxed">
          The <code className="px-2 py-1 bg-[#2a2a2c] rounded text-[#22c4e0]">arun</code> method allows you to execute
          agents asynchronously, enabling concurrent execution and improved performance when running multiple agents or tasks.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#e5e5e7]">Basic Usage</h2>
        <p className="text-[#a0a0a3] leading-relaxed">
          Instead of using the synchronous <code className="px-2 py-1 bg-[#2a2a2c] rounded text-[#22c4e0]">run</code> method,
          use <code className="px-2 py-1 bg-[#2a2a2c] rounded text-[#22c4e0]">arun</code> with async/await syntax:
        </p>
        <CodeBlock
          code={`import asyncio
from feather_ai import AIAgent

async def main():
    # Create an agent
    agent = AIAgent(
        model="gpt-4",
        instructions="You are a helpful assistant"
    )

    # Use arun instead of run
    response = await agent.arun("What is the capital of France?")
    print(response.content)

# Run the async function
asyncio.run(main())`}
          language="python"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#e5e5e7]">Running Multiple Agents Concurrently</h2>
        <p className="text-[#a0a0a3] leading-relaxed">
          The real power of <code className="px-2 py-1 bg-[#2a2a2c] rounded text-[#22c4e0]">arun</code> comes when
          running multiple agents or tasks in parallel using <code className="px-2 py-1 bg-[#2a2a2c] rounded text-[#22c4e0]">asyncio.gather()</code>:
        </p>
        <CodeBlock
          code={`import asyncio
from feather_ai import AIAgent

async def main():
    # Create multiple agents
    agent1 = AIAgent(model="gpt-4", instructions="You are a history expert")
    agent2 = AIAgent(model="gpt-4", instructions="You are a science expert")
    agent3 = AIAgent(model="gpt-4", instructions="You are a math expert")

    # Run all agents concurrently
    results = await asyncio.gather(
        agent1.arun("Who was the first president of the USA?"),
        agent2.arun("What is photosynthesis?"),
        agent3.arun("What is the Pythagorean theorem?")
    )

    # Process results
    for i, result in enumerate(results, 1):
        print(f"Agent {i}: {result.content}")

asyncio.run(main())`}
          language="python"
        />
        <div className="bg-[#be3389]/10 border border-[#be3389]/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-[#22c4e0] mb-2">💡 Performance Tip</h3>
          <p className="text-[#a0a0a3]">
            Using <code className="px-2 py-1 bg-[#2a2a2c] rounded text-[#22c4e0]">asyncio.gather()</code> allows
            multiple agents to execute simultaneously, significantly reducing total execution time compared to running them sequentially.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#e5e5e7]">Sequential Async Execution</h2>
        <p className="text-[#a0a0a3] leading-relaxed">
          Sometimes you need the output of one agent as input for another. You can chain async calls:
        </p>
        <CodeBlock
          code={`import asyncio
from feather_ai import AIAgent

async def main():
    # Create two agents
    summarizer = AIAgent(
        model="gpt-4",
        instructions="You summarize text concisely"
    )
    translator = AIAgent(
        model="gpt-4",
        instructions="You translate text to Spanish"
    )

    # First, summarize
    summary = await summarizer.arun("Summarize the history of AI in one paragraph")

    # Then, translate the summary
    translation = await translator.arun(f"Translate this: {summary.content}")

    print(f"Summary: {summary.content}")
    print(f"Translation: {translation.content}")

asyncio.run(main())`}
          language="python"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#e5e5e7]">When to Use arun</h2>
        <div className="space-y-3">
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#22c4e0] mb-2">✅ Use arun when:</h3>
            <ul className="list-disc list-inside space-y-1 text-[#a0a0a3] ml-4">
              <li>Running multiple agents in parallel</li>
              <li>Building async workflows or pipelines</li>
              <li>Using async tools (like <code className="px-2 py-1 bg-[#2a2a2c] rounded text-[#22c4e0]">web_tools_async</code>)</li>
              <li>Integrating with async frameworks (FastAPI, aiohttp, etc.)</li>
            </ul>
          </div>
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#be3389] mb-2">❌ Use run when:</h3>
            <ul className="list-disc list-inside space-y-1 text-[#a0a0a3] ml-4">
              <li>Running a single agent with simple synchronous logic</li>
              <li>Quick scripts or prototypes</li>
              <li>You don't need concurrent execution</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
