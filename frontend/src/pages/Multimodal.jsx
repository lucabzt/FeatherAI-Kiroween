import CodeBlock from '../components/CodeBlock/CodeBlock';

function Multimodal() {
  return (
    <div className="max-w-4xl w-full">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-white break-words">Multimodal Capabilities</h1>
      
      <p className="text-gray-300 mb-6 text-lg">
        FeatherAI supports multimodal inputs, allowing your agents to process not just text, but also documents like PDFs and images. This enables powerful use cases like document analysis, image understanding, and visual question answering.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">The Prompt Class</h2>
      <p className="text-gray-300 mb-4">
        The <code className="bg-gray-800 px-2 py-1 rounded text-feather-cyan">Prompt</code> class allows you to create rich prompts that combine text and documents. It has two main parameters:
      </p>
      <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2 ml-4">
        <li><code className="bg-gray-800 px-2 py-1 rounded text-feather-cyan">text</code> - The text portion of your prompt</li>
        <li><code className="bg-gray-800 px-2 py-1 rounded text-feather-cyan">documents</code> - A list of Document objects to include</li>
      </ul>

      <CodeBlock 
        code={`from feather_ai import AIAgent, Prompt, Document

# Create a prompt with text and documents
prompt = Prompt(
    text="What is the main topic of this document?",
    documents=[Document.from_path("report.pdf")]
)

agent = AIAgent(provider="anthropic", model="claude-3-5-sonnet-20241022")
response = agent.run(prompt)
print(response.content)`}
        language="python"
      />

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">The Document Class</h2>
      <p className="text-gray-300 mb-4">
        The <code className="bg-gray-800 px-2 py-1 rounded text-feather-cyan">Document</code> class provides three factory methods for creating document objects from different sources:
      </p>

      <h3 className="text-xl font-semibold mb-3 text-white mt-6">1. from_path()</h3>
      <p className="text-gray-300 mb-4">
        Load a document from a file path on your system:
      </p>
      <CodeBlock 
        code={`from feather_ai import Document

# Load from file path
doc = Document.from_path("path/to/document.pdf")
# or
doc = Document.from_path("path/to/image.jpg")`}
        language="python"
      />

      <h3 className="text-xl font-semibold mb-3 text-white mt-6">2. from_bytes()</h3>
      <p className="text-gray-300 mb-4">
        Create a document from raw bytes data:
      </p>
      <CodeBlock 
        code={`from feather_ai import Document

# Load from bytes
with open("document.pdf", "rb") as f:
    pdf_bytes = f.read()
    
doc = Document.from_bytes(pdf_bytes, mime_type="application/pdf")`}
        language="python"
      />

      <h3 className="text-xl font-semibold mb-3 text-white mt-6">3. from_bytesio()</h3>
      <p className="text-gray-300 mb-4">
        Create a document from a BytesIO object (useful for in-memory files):
      </p>
      <CodeBlock 
        code={`from feather_ai import Document
from io import BytesIO

# Load from BytesIO
file_stream = BytesIO(pdf_data)
doc = Document.from_bytesio(file_stream, mime_type="application/pdf")`}
        language="python"
      />

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">PDF Processing Example</h2>
      <p className="text-gray-300 mb-4">
        Analyze and extract information from PDF documents:
      </p>
      <CodeBlock 
        code={`from feather_ai import AIAgent, Prompt, Document

# Create an agent with a multimodal-capable provider
agent = AIAgent(
    provider="anthropic",
    model="claude-3-5-sonnet-20241022"
)

# Load a PDF document
pdf_doc = Document.from_path("financial_report.pdf")

# Create a prompt with the document
prompt = Prompt(
    text="Summarize the key financial metrics from this report and identify any concerning trends.",
    documents=[pdf_doc]
)

response = agent.run(prompt)
print(response.content)`}
        language="python"
      />

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Image Processing Example</h2>
      <p className="text-gray-300 mb-4">
        Analyze images and answer questions about their content:
      </p>
      <CodeBlock 
        code={`from feather_ai import AIAgent, Prompt, Document

agent = AIAgent(
    provider="google",
    model="gemini-2.0-flash-exp"
)

# Load an image
image = Document.from_path("chart.png")

# Ask questions about the image
prompt = Prompt(
    text="What type of chart is this? What are the main insights from the data shown?",
    documents=[image]
)

response = agent.run(prompt)
print(response.content)`}
        language="python"
      />

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Multiple Documents</h2>
      <p className="text-gray-300 mb-4">
        You can include multiple documents in a single prompt:
      </p>
      <CodeBlock 
        code={`from feather_ai import AIAgent, Prompt, Document

agent = AIAgent(
    provider="anthropic",
    model="claude-3-5-sonnet-20241022"
)

# Load multiple documents
doc1 = Document.from_path("contract_v1.pdf")
doc2 = Document.from_path("contract_v2.pdf")

# Compare documents
prompt = Prompt(
    text="Compare these two contract versions and highlight the key differences.",
    documents=[doc1, doc2]
)

response = agent.run(prompt)
print(response.content)`}
        language="python"
      />

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Provider Support</h2>
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <p className="text-gray-300 mb-4">
          Multimodal capabilities vary by provider:
        </p>
        <div className="space-y-3">
          <div className="flex items-start">
            <span className="text-green-400 mr-3 text-xl">✓</span>
            <div>
              <p className="text-white font-semibold">Anthropic (Claude)</p>
              <p className="text-gray-400 text-sm">Full support for PDFs and images</p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-green-400 mr-3 text-xl">✓</span>
            <div>
              <p className="text-white font-semibold">Google (Gemini)</p>
              <p className="text-gray-400 text-sm">Full support for PDFs and images</p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-yellow-400 mr-3 text-xl">⚠</span>
            <div>
              <p className="text-white font-semibold">OpenAI</p>
              <p className="text-gray-400 text-sm">Multimodal support coming soon</p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-yellow-400 mr-3 text-xl">⚠</span>
            <div>
              <p className="text-white font-semibold">Mistral</p>
              <p className="text-gray-400 text-sm">Multimodal support coming soon</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-white mt-8">Practical Use Cases</h2>
      <div className="space-y-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-feather-cyan font-semibold mb-2">Document Analysis</h4>
          <p className="text-gray-300 text-sm">Extract information, summarize content, or answer questions about PDFs, reports, and contracts.</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-feather-cyan font-semibold mb-2">Image Understanding</h4>
          <p className="text-gray-300 text-sm">Analyze charts, diagrams, screenshots, or photos to extract insights or answer questions.</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-feather-cyan font-semibold mb-2">Visual Question Answering</h4>
          <p className="text-gray-300 text-sm">Ask specific questions about images or documents and get detailed answers.</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-feather-cyan font-semibold mb-2">Document Comparison</h4>
          <p className="text-gray-300 text-sm">Compare multiple versions of documents to identify changes and differences.</p>
        </div>
      </div>

      <div className="bg-gray-800 border-l-4 border-feather-blue p-4 my-6 rounded">
        <p className="text-gray-300">
          <strong className="text-feather-cyan">Tip:</strong> When working with documents, be specific in your prompts about what information you're looking for. The more targeted your question, the better the response.
        </p>
      </div>
    </div>
  );
}

export default Multimodal;
