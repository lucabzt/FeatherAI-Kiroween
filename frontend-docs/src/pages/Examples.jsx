import CodeBlock from '../components/CodeBlock';
import PageHeader from '../components/PageHeader';

export default function Examples() {
  return (
    <div className="max-w-none">
      <PageHeader
        title="Examples"
        subtitle="Real-world examples combining multiple FeatherAI features"
      />

      {/* Featured Example */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-[#be3389]/10 to-[#0357c1]/10 border border-[#22c4e0] rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🌟</span>
            <h2 className="text-2xl font-bold text-[#22c4e0] m-0">Featured Example</h2>
          </div>
          <p className="text-[#a0a0a3] text-sm">
            This example demonstrates tool calling, structured output, and multimodal capabilities
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-4 text-white">
          Document Analysis Assistant with Weather Integration
        </h2>
        <p className="text-[#a0a0a3] mb-6">
          This example creates an AI agent that can analyze PDF documents, extract structured data,
          and provide weather information for locations mentioned in the documents. It combines:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#22c4e0] mb-2">🛠️ Tool Calling</h3>
            <p className="text-sm text-[#a0a0a3]">Custom weather API integration</p>
          </div>
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#be3389] mb-2">📊 Structured Output</h3>
            <p className="text-sm text-[#a0a0a3]">Type-safe document metadata</p>
          </div>
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#0357c1] mb-2">📄 Multimodal</h3>
            <p className="text-sm text-[#a0a0a3]">PDF and image processing</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-4 text-white">Complete Implementation</h3>
          <CodeBlock
            code={`import os
from pydantic import BaseModel, Field
from feather_ai import AIAgent
from feather_ai.prompt import Prompt
from feather_ai.document import Document

# Define structured output schema
class DocumentAnalysis(BaseModel):
    """Structured output for document analysis"""
    title: str = Field(..., description="The title or main topic of the document")
    summary: str = Field(..., description="A concise summary in 2-3 sentences")
    locations: list[str] = Field(..., description="List of geographic locations mentioned")
    key_dates: list[str] = Field(default=[], description="Important dates mentioned")
    sentiment: str = Field(..., description="Overall sentiment: positive, negative, or neutral")
    confidence: float = Field(..., description="Confidence score from 0.0 to 1.0")

# Define custom tool for weather information
def get_current_weather(location: str) -> str:
    """
    Get current weather information for a location.

    Args:
        location: City name or geographic location

    Returns:
        Weather information as a string
    """
    # In production, this would call a real weather API
    # For this example, we'll simulate the response
    weather_data = {
        "Paris": "Sunny, 22°C, Light breeze from the west",
        "London": "Cloudy, 18°C, Chance of rain in the evening",
        "New York": "Partly cloudy, 25°C, Humidity 65%",
        "Tokyo": "Clear, 28°C, High UV index",
    }

    return weather_data.get(
        location,
        f"Weather data for {location}: Mild conditions, 20°C"
    )

def get_weather_forecast(location: str, days: int = 3) -> str:
    """
    Get weather forecast for the next N days.

    Args:
        location: City name or geographic location
        days: Number of days to forecast (default: 3)

    Returns:
        Forecast information as a string
    """
    return f"5-day forecast for {location}: Temperatures ranging 18-24°C, mix of sun and clouds"

# Main application
def main():
    # Step 1: Analyze a document with multimodal input
    print("=" * 50)
    print("STEP 1: Document Analysis with Structured Output")
    print("=" * 50)

    # Create agent with structured output
    analysis_agent = AIAgent(
        model="claude-haiku-4-5",
        instructions="""You are a document analysis expert. Analyze the provided
        documents carefully and extract key information. Be thorough but concise.""",
        output_schema=DocumentAnalysis
    )

    # Create multimodal prompt with documents
    prompt = Prompt(
        text="Please analyze this travel itinerary document and extract key information.",
        documents=["travel_itinerary.pdf", "destination_image.jpg"]
    )

    # Run analysis
    analysis_result = analysis_agent.run(prompt)

    # Access structured output
    doc_analysis: DocumentAnalysis = analysis_result.content
    print(f"\\nTitle: {doc_analysis.title}")
    print(f"Summary: {doc_analysis.summary}")
    print(f"Locations: {', '.join(doc_analysis.locations)}")
    print(f"Sentiment: {doc_analysis.sentiment}")
    print(f"Confidence: {doc_analysis.confidence:.2%}")

    # Step 2: Get weather for mentioned locations using tools
    print("\\n" + "=" * 50)
    print("STEP 2: Weather Information with Tool Calling")
    print("=" * 50)

    # Create agent with weather tools
    weather_agent = AIAgent(
        model="gpt-4",
        instructions="""You are a helpful travel assistant. When asked about weather,
        use the available tools to get current conditions and forecasts. Provide
        friendly, informative responses.""",
        tools=[get_current_weather, get_weather_forecast]
    )

    # Get weather for the first location
    if doc_analysis.locations:
        location = doc_analysis.locations[0]
        weather_prompt = f"What's the weather like in {location}? Should I pack an umbrella?"

        weather_result = weather_agent.run(weather_prompt)
        print(f"\\nWeather Assistant Response:")
        print(weather_result.content)

        # Display tool calls that were made
        if weather_result.tool_calls:
            print(f"\\nTools Used:")
            for tool_call in weather_result.tool_calls:
                print(f"  - {tool_call}")

    # Step 3: Combined workflow with async execution
    print("\\n" + "=" * 50)
    print("STEP 3: Async Execution for Multiple Locations")
    print("=" * 50)

    import asyncio

    async def get_weather_for_locations(locations: list[str]):
        """Get weather for multiple locations concurrently"""
        agent = AIAgent(
            model="claude-haiku-4-5",
            tools=[get_current_weather]
        )

        # Create tasks for all locations
        tasks = [
            agent.arun(f"What's the current weather in {loc}?")
            for loc in locations
        ]

        # Execute concurrently
        results = await asyncio.gather(*tasks)
        return results

    # Run async example
    if len(doc_analysis.locations) > 1:
        weather_results = asyncio.run(
            get_weather_for_locations(doc_analysis.locations[:3])
        )

        print(f"\\nWeather Summary for All Locations:")
        for location, result in zip(doc_analysis.locations[:3], weather_results):
            print(f"\\n{location}:")
            print(f"  {result.content}")

if __name__ == "__main__":
    main()`}
            language="python"
            filename="document_weather_assistant.py"
          />
        </div>

        <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-[#22c4e0] mb-3">Expected Output</h3>
          <CodeBlock
            code={`==================================================
STEP 1: Document Analysis with Structured Output
==================================================

Title: European Summer Vacation 2024
Summary: A 10-day travel itinerary covering Paris, London, and Rome with cultural activities, dining recommendations, and accommodation details. The trip focuses on historical landmarks and local cuisine experiences.
Locations: Paris, London, Rome
Sentiment: positive
Confidence: 95.00%

==================================================
STEP 2: Weather Information with Tool Calling
==================================================

Weather Assistant Response:
Based on the current weather in Paris, it's sunny with pleasant temperatures around 22°C and a light breeze. You won't need an umbrella today! However, I'd recommend packing one anyway since weather can change, especially during summer.

Tools Used:
  - get_current_weather(location='Paris')

==================================================
STEP 3: Async Execution for Multiple Locations
==================================================

Weather Summary for All Locations:

Paris:
  The weather in Paris is currently sunny with temperatures around 22°C and a light breeze from the west. Perfect for sightseeing!

London:
  London is experiencing cloudy conditions at 18°C with a chance of rain in the evening. Definitely bring an umbrella!

Rome:
  Rome has mild conditions with temperatures around 20°C. Great weather for exploring the city!`}
            language="text"
          />
        </div>

        <div className="bg-gradient-to-r from-[#be3389]/10 to-[#0357c1]/10 border border-[#2a2a2c] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-[#dfa987] mb-3">💡 Key Takeaways</h3>
          <ul className="space-y-2 text-[#a0a0a3]">
            <li className="flex items-start gap-2">
              <span className="text-[#22c4e0] mt-1">▸</span>
              <span>Combine multiple features for powerful workflows</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#22c4e0] mt-1">▸</span>
              <span>Structured output ensures type-safe, validated data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#22c4e0] mt-1">▸</span>
              <span>Tool calling enables integration with external APIs and services</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#22c4e0] mt-1">▸</span>
              <span>Async execution improves performance for multiple operations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#22c4e0] mt-1">▸</span>
              <span>Multimodal prompts support various document types (PDF, images, etc.)</span>
            </li>
          </ul>
        </div>
      </section>

      {/* More Examples (Mock) */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-white">More Examples</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6 opacity-60">
            <h3 className="text-xl font-semibold text-[#be3389] mb-2">
              Customer Support Chatbot
            </h3>
            <p className="text-sm text-[#a0a0a3] mb-3">
              Build an intelligent customer support bot with ticket creation, knowledge base search, and sentiment analysis.
            </p>
            <span className="text-xs text-[#a0a0a3]">Coming soon...</span>
          </div>

          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6 opacity-60">
            <h3 className="text-xl font-semibold text-[#0357c1] mb-2">
              Data Analysis Pipeline
            </h3>
            <p className="text-sm text-[#a0a0a3] mb-3">
              Automated data analysis with CSV parsing, statistical analysis tools, and visualization generation.
            </p>
            <span className="text-xs text-[#a0a0a3]">Coming soon...</span>
          </div>

          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6 opacity-60">
            <h3 className="text-xl font-semibold text-[#22c4e0] mb-2">
              Code Review Assistant
            </h3>
            <p className="text-sm text-[#a0a0a3] mb-3">
              Intelligent code review with static analysis tools, best practice suggestions, and security scanning.
            </p>
            <span className="text-xs text-[#a0a0a3]">Coming soon...</span>
          </div>
        </div>
      </section>
    </div>
  );
}
