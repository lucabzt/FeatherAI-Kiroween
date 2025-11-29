import CodeBlock from '../components/CodeBlock/CodeBlock';

function Examples() {
  return (
    <div className="max-w-4xl w-full">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-white break-words">Examples</h1>
      
      <p className="text-gray-300 mb-6 text-lg">
        These comprehensive examples demonstrate how to combine multiple FeatherAI features to build real-world applications. Each example is complete and runnable, showing best practices for using the library.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Research Assistant</h2>
      
      <p className="text-gray-300 mb-4">
        This example builds a research assistant that can search the web, extract structured information, and provide well-formatted research summaries. It demonstrates the power of combining multiple FeatherAI features.
      </p>

      <div className="bg-gray-800 border-l-4 border-feather-cyan p-4 my-6 rounded">
        <p className="text-white font-semibold mb-2">Features Used:</p>
        <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
          <li><strong className="text-feather-cyan">System Instructions</strong> - Define the assistant's behavior and expertise</li>
          <li><strong className="text-feather-cyan">Tool Calling</strong> - Enable web search and data retrieval capabilities</li>
          <li><strong className="text-feather-cyan">Structured Output</strong> - Get research results in a predictable format</li>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mb-3 text-white mt-6">Why These Features?</h3>
      <p className="text-gray-300 mb-4">
        <strong className="text-feather-cyan">System Instructions</strong> establish the assistant's role as a thorough researcher who provides accurate, well-cited information. This ensures consistent, high-quality responses.
      </p>
      <p className="text-gray-300 mb-4">
        <strong className="text-feather-cyan">Tool Calling</strong> gives the assistant the ability to search for information and retrieve data from external sources, making it truly useful rather than just relying on training data.
      </p>
      <p className="text-gray-300 mb-4">
        <strong className="text-feather-cyan">Structured Output</strong> ensures the research results are returned in a consistent format that's easy to parse, display, and store in a database.
      </p>

      <h3 className="text-xl font-semibold mb-3 text-white mt-8">Complete Code</h3>
      
      <CodeBlock 
        code={`import asyncio
from typing import List
from pydantic import BaseModel, Field
from feather_ai import AIAgent

# Define structured output schema
class Source(BaseModel):
    """A source citation for research."""
    title: str = Field(description="Title of the source")
    url: str = Field(description="URL of the source")
    relevance: str = Field(description="Why this source is relevant")

class ResearchResult(BaseModel):
    """Structured research results."""
    topic: str = Field(description="The research topic")
    summary: str = Field(description="Comprehensive summary of findings")
    key_points: List[str] = Field(description="List of key points discovered")
    sources: List[Source] = Field(description="List of sources cited")
    confidence: str = Field(description="Confidence level: high, medium, or low")

# Define research tools
async def web_search(query: str) -> str:
    """Search the web for information.
    
    Args:
        query: The search query
        
    Returns:
        Search results as a formatted string
    """
    # In a real application, this would call a search API
    # For demo purposes, we'll simulate results
    await asyncio.sleep(0.5)  # Simulate API call
    return f"""
    Search results for "{query}":
    
    1. Wikipedia: {query} - Comprehensive overview and history
       URL: https://en.wikipedia.org/wiki/{query.replace(' ', '_')}
    
    2. Research Paper: Recent advances in {query}
       URL: https://arxiv.org/example/{query.replace(' ', '-')}
    
    3. Industry Report: {query} market analysis and trends
       URL: https://example.com/reports/{query.replace(' ', '-')}
    """

async def get_article_content(url: str) -> str:
    """Fetch the content of an article from a URL.
    
    Args:
        url: The URL of the article to fetch
        
    Returns:
        The article content as text
    """
    # In a real application, this would fetch and parse the URL
    await asyncio.sleep(0.3)  # Simulate API call
    return f"""
    Article content from {url}:
    
    This is a detailed article about the topic. It covers various aspects
    including historical context, current applications, and future trends.
    The article provides in-depth analysis and expert opinions on the subject.
    """

# Create the research assistant
async def main():
    research_assistant = AIAgent(
        provider="openai",
        model="gpt-4",
        instructions="""You are an expert research assistant.
        
        Your responsibilities:
        - Conduct thorough research using available tools
        - Synthesize information from multiple sources
        - Provide accurate, well-cited summaries
        - Identify key insights and trends
        - Assess the reliability of sources
        
        Always:
        - Use web_search to find relevant sources
        - Use get_article_content to read detailed information
        - Cite your sources properly
        - Be objective and balanced in your analysis
        - Indicate your confidence level in the findings
        """,
        tools=[web_search, get_article_content],
        output_schema=ResearchResult
    )
    
    # Conduct research
    topic = "artificial intelligence in healthcare"
    print(f"Researching: {topic}\\n")
    
    response = await research_assistant.arun(
        f"Research the topic: {topic}. "
        f"Find relevant sources, analyze the information, and provide a comprehensive summary."
    )
    
    # Access structured results
    result = response.content
    
    print(f"Topic: {result.topic}")
    print(f"\\nSummary:\\n{result.summary}")
    print(f"\\nKey Points:")
    for i, point in enumerate(result.key_points, 1):
        print(f"  {i}. {point}")
    
    print(f"\\nSources:")
    for i, source in enumerate(result.sources, 1):
        print(f"  {i}. {source.title}")
        print(f"     URL: {source.url}")
        print(f"     Relevance: {source.relevance}")
    
    print(f"\\nConfidence: {result.confidence}")

if __name__ == "__main__":
    asyncio.run(main())`}
        language="python"
      />

      <h3 className="text-xl font-semibold mb-3 text-white mt-8">How It Works</h3>
      <div className="space-y-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-feather-cyan font-semibold mb-2">1. Schema Definition</h4>
          <p className="text-gray-300 text-sm">
            We define Pydantic models for <code className="bg-gray-900 px-1 rounded">Source</code> and <code className="bg-gray-900 px-1 rounded">ResearchResult</code> to ensure the assistant returns structured, validated data.
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-feather-cyan font-semibold mb-2">2. Tool Implementation</h4>
          <p className="text-gray-300 text-sm">
            The <code className="bg-gray-900 px-1 rounded">web_search</code> and <code className="bg-gray-900 px-1 rounded">get_article_content</code> tools give the assistant the ability to find and retrieve information. In production, these would call real APIs.
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-feather-cyan font-semibold mb-2">3. System Instructions</h4>
          <p className="text-gray-300 text-sm">
            Clear instructions define the assistant's role, responsibilities, and behavior. This ensures it conducts thorough research and provides reliable results.
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-feather-cyan font-semibold mb-2">4. Execution Flow</h4>
          <p className="text-gray-300 text-sm">
            The assistant automatically: (1) searches for relevant sources, (2) retrieves detailed content, (3) analyzes the information, and (4) returns structured results with citations.
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-3 text-white mt-8">Expected Output</h3>
      <p className="text-gray-300 mb-4">
        When you run this example, you'll get a structured research report with:
      </p>
      <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2 ml-4">
        <li>A comprehensive summary of the topic</li>
        <li>Key points and insights extracted from sources</li>
        <li>Properly cited sources with relevance explanations</li>
        <li>A confidence assessment of the findings</li>
      </ul>

      <div className="bg-gray-800 border-l-4 border-feather-pink p-4 my-6 rounded">
        <p className="text-gray-300">
          <strong className="text-feather-cyan">Extending This Example:</strong> You can enhance this research assistant by adding more tools (database queries, API integrations), using multimodal capabilities to analyze documents, or implementing caching to avoid redundant searches.
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-white mt-12">More Example Ideas</h2>
      <div className="space-y-3 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-feather-cyan font-semibold mb-2">Customer Support Bot</h4>
          <p className="text-gray-300 text-sm mb-2">
            Combine system instructions for empathetic responses, tools for ticket management and knowledge base search, and structured output for categorizing issues.
          </p>
          <p className="text-gray-400 text-xs">Features: Instructions, Tools, Structured Output</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-feather-cyan font-semibold mb-2">Document Analyzer</h4>
          <p className="text-gray-300 text-sm mb-2">
            Use multimodal capabilities to process PDFs, structured output to extract key information, and async execution to process multiple documents concurrently.
          </p>
          <p className="text-gray-400 text-xs">Features: Multimodal, Structured Output, Async</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-feather-cyan font-semibold mb-2">Code Review Assistant</h4>
          <p className="text-gray-300 text-sm mb-2">
            System instructions for code quality standards, tools for running tests and linters, and structured output for categorized feedback.
          </p>
          <p className="text-gray-400 text-xs">Features: Instructions, Tools, Structured Output</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-feather-cyan font-semibold mb-2">Data Pipeline Processor</h4>
          <p className="text-gray-300 text-sm mb-2">
            Async execution for parallel processing, tools for data transformation, and structured output for validation results.
          </p>
          <p className="text-gray-400 text-xs">Features: Async, Tools, Structured Output</p>
        </div>
      </div>

      <div className="bg-gray-800 border-l-4 border-feather-blue p-4 my-6 rounded">
        <p className="text-gray-300">
          <strong className="text-feather-cyan">Tip:</strong> The most powerful applications combine multiple FeatherAI features. Start with a clear use case, then add features incrementally to enhance functionality.
        </p>
      </div>
    </div>
  );
}

export default Examples;
