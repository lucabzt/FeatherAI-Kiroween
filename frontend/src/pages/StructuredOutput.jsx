import CodeBlock from '../components/CodeBlock/CodeBlock';

function StructuredOutput() {
  return (
    <div className="max-w-4xl w-full">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-white break-words">Structured Output</h1>
      
      <p className="text-gray-300 mb-6 text-lg">
        Structured output allows you to receive AI responses in a predictable, typed format using Pydantic models. This makes it easy to parse and use agent responses programmatically in your applications.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">The output_schema Parameter</h2>
      <p className="text-gray-300 mb-4">
        The <code className="bg-gray-800 px-2 py-1 rounded text-feather-cyan">output_schema</code> parameter accepts a Pydantic <code className="bg-gray-800 px-2 py-1 rounded">BaseModel</code> class that defines the structure you want the agent's response to follow. Instead of receiving free-form text, you'll get a validated Pydantic model instance.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Defining a Pydantic Schema</h2>
      <p className="text-gray-300 mb-4">
        First, define your schema using Pydantic's <code className="bg-gray-800 px-2 py-1 rounded">BaseModel</code>:
      </p>
      <CodeBlock 
        code={`from pydantic import BaseModel, Field
from feather_ai import AIAgent

class MovieReview(BaseModel):
    """A movie review with rating and summary."""
    title: str = Field(description="The movie title")
    rating: int = Field(description="Rating from 1-10", ge=1, le=10)
    summary: str = Field(description="A brief summary of the review")
    recommended: bool = Field(description="Whether the movie is recommended")

# Create an agent with the schema
agent = AIAgent(
    provider="openai",
    model="gpt-4",
    output_schema=MovieReview
)

response = agent.run("Review the movie 'The Matrix'")
print(response.content)`}
        language="python"
      />

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Accessing the Structured Response</h2>
      <p className="text-gray-300 mb-4">
        When you use <code className="bg-gray-800 px-2 py-1 rounded">output_schema</code>, the <code className="bg-gray-800 px-2 py-1 rounded">content</code> attribute of the response contains a Pydantic model instance, not a string. You can access the fields directly:
      </p>
      <CodeBlock 
        code={`from pydantic import BaseModel, Field
from feather_ai import AIAgent

class MovieReview(BaseModel):
    title: str
    rating: int = Field(ge=1, le=10)
    summary: str
    recommended: bool

agent = AIAgent(
    provider="anthropic",
    model="claude-3-5-sonnet-20241022",
    output_schema=MovieReview
)

response = agent.run("Review the movie 'Inception'")

# Access structured fields
review = response.content
print(f"Title: {review.title}")
print(f"Rating: {review.rating}/10")
print(f"Summary: {review.summary}")
print(f"Recommended: {review.recommended}")

# You can also convert to dict or JSON
print(review.model_dump())  # Convert to dictionary
print(review.model_dump_json())  # Convert to JSON string`}
        language="python"
      />

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Practical Multi-Field Use Case</h2>
      <p className="text-gray-300 mb-4">
        Here's a practical example of extracting structured information from unstructured text:
      </p>
      <CodeBlock 
        code={`from pydantic import BaseModel, Field
from typing import List
from feather_ai import AIAgent

class ContactInfo(BaseModel):
    """Extracted contact information from text."""
    name: str = Field(description="Full name of the person")
    email: str = Field(description="Email address")
    phone: str = Field(description="Phone number")
    company: str = Field(description="Company name")
    job_title: str = Field(description="Job title or role")
    topics: List[str] = Field(description="Topics or interests mentioned")

agent = AIAgent(
    provider="openai",
    model="gpt-4",
    output_schema=ContactInfo
)

text = """
Hi, I'm Sarah Johnson, the VP of Engineering at TechCorp. 
You can reach me at sarah.j@techcorp.com or call me at (555) 123-4567.
I'm interested in discussing AI integration, cloud architecture, and DevOps practices.
"""

response = agent.run(f"Extract contact information from this text: {text}")

contact = response.content
print(f"Name: {contact.name}")
print(f"Email: {contact.email}")
print(f"Phone: {contact.phone}")
print(f"Company: {contact.company}")
print(f"Title: {contact.job_title}")
print(f"Topics: {', '.join(contact.topics)}")`}
        language="python"
      />

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Complex Nested Schemas</h2>
      <p className="text-gray-300 mb-4">
        You can create complex nested structures for more sophisticated data extraction:
      </p>
      <CodeBlock 
        code={`from pydantic import BaseModel, Field
from typing import List
from feather_ai import AIAgent

class Ingredient(BaseModel):
    name: str
    amount: str
    unit: str

class Recipe(BaseModel):
    """A cooking recipe with ingredients and instructions."""
    name: str = Field(description="Recipe name")
    cuisine: str = Field(description="Type of cuisine")
    prep_time_minutes: int = Field(description="Preparation time in minutes")
    servings: int = Field(description="Number of servings")
    ingredients: List[Ingredient] = Field(description="List of ingredients")
    instructions: List[str] = Field(description="Step-by-step instructions")
    difficulty: str = Field(description="Difficulty level: easy, medium, or hard")

agent = AIAgent(
    provider="anthropic",
    model="claude-3-5-sonnet-20241022",
    output_schema=Recipe
)

response = agent.run("Create a recipe for chocolate chip cookies")

recipe = response.content
print(f"Recipe: {recipe.name}")
print(f"Cuisine: {recipe.cuisine}")
print(f"Prep Time: {recipe.prep_time_minutes} minutes")
print(f"Servings: {recipe.servings}")
print(f"Difficulty: {recipe.difficulty}")
print(f"\\nIngredients:")
for ing in recipe.ingredients:
    print(f"  - {ing.amount} {ing.unit} {ing.name}")
print(f"\\nInstructions:")
for i, step in enumerate(recipe.instructions, 1):
    print(f"  {i}. {step}")`}
        language="python"
      />

      <div className="bg-gray-800 border-l-4 border-feather-pink p-4 my-6 rounded">
        <p className="text-gray-300">
          <strong className="text-feather-cyan">Why Use Structured Output?</strong>
        </p>
        <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1 ml-4">
          <li>Type safety and validation with Pydantic</li>
          <li>No need to parse or extract data from text</li>
          <li>Guaranteed consistent response format</li>
          <li>Easy integration with databases and APIs</li>
          <li>Better error handling with validation</li>
        </ul>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Response Content Attribute</h2>
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <p className="text-gray-300 mb-4">
          When using <code className="bg-gray-900 px-2 py-1 rounded text-feather-cyan">output_schema</code>:
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
          <li><code className="bg-gray-900 px-2 py-1 rounded">response.content</code> contains a Pydantic model instance (not a string)</li>
          <li>All fields are validated according to your schema definition</li>
          <li>You can use Pydantic's methods like <code className="bg-gray-900 px-2 py-1 rounded">model_dump()</code> and <code className="bg-gray-900 px-2 py-1 rounded">model_dump_json()</code></li>
          <li>Invalid responses will raise Pydantic validation errors</li>
        </ul>
      </div>

      <div className="bg-gray-800 border-l-4 border-feather-blue p-4 my-6 rounded">
        <p className="text-gray-300">
          <strong className="text-feather-cyan">Tip:</strong> Use Field descriptions to guide the AI on what each field should contain. Clear descriptions lead to better structured outputs.
        </p>
      </div>
    </div>
  );
}

export default StructuredOutput;
