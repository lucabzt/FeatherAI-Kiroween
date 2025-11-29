import CodeBlock from '../components/CodeBlock/CodeBlock';
import { ExternalLink } from 'lucide-react';

function APIReference() {
  return (
    <div className="max-w-4xl w-full">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-white break-words">API Reference</h1>
      
      <p className="text-gray-300 mb-8 text-lg">
        Complete reference documentation for all FeatherAI classes, methods, and parameters.
      </p>

      {/* AIAgent Class */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
          AIAgent
        </h2>
        
        <p className="text-gray-300 mb-6">
          The main class for creating and running AI agents with various capabilities.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-white mt-8">Constructor</h3>
        
        <CodeBlock 
          code={`from feather_ai import AIAgent

agent = AIAgent(
    provider="openai",
    model="gpt-4",
    instructions=None,
    tools=None,
    tool_model=None,
    output_schema=None
)`}
          language="python"
        />

        <h4 className="text-xl font-semibold mb-4 text-white mt-6">Parameters</h4>
        
        <div className="space-y-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <code className="text-feather-cyan font-mono">provider</code>
              <span className="text-gray-400 text-sm">str</span>
            </div>
            <p className="text-gray-300 text-sm">
              The AI provider to use. Options: <code className="bg-gray-900 px-2 py-1 rounded">"openai"</code>, <code className="bg-gray-900 px-2 py-1 rounded">"anthropic"</code>, <code className="bg-gray-900 px-2 py-1 rounded">"google"</code>, <code className="bg-gray-900 px-2 py-1 rounded">"mistral"</code>
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <code className="text-feather-cyan font-mono">model</code>
              <span className="text-gray-400 text-sm">str</span>
            </div>
            <p className="text-gray-300 text-sm">
              The specific model to use (e.g., <code className="bg-gray-900 px-2 py-1 rounded">"gpt-4"</code>, <code className="bg-gray-900 px-2 py-1 rounded">"claude-3-5-sonnet-20241022"</code>, <code className="bg-gray-900 px-2 py-1 rounded">"gemini-2.0-flash-exp"</code>)
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <code className="text-feather-cyan font-mono">instructions</code>
              <span className="text-gray-400 text-sm">str | None</span>
            </div>
            <p className="text-gray-300 text-sm">
              Optional system instructions that define the agent's behavior and personality. These instructions persist across all interactions with the agent.
            </p>
            <p className="text-gray-400 text-xs mt-1">Default: None</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <code className="text-feather-cyan font-mono">tools</code>
              <span className="text-gray-400 text-sm">List[Callable] | None</span>
            </div>
            <p className="text-gray-300 text-sm">
              Optional list of Python functions that the agent can call. Functions should have clear docstrings and type hints. Can include both sync and async functions.
            </p>
            <p className="text-gray-400 text-xs mt-1">Default: None</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <code className="text-feather-cyan font-mono">tool_model</code>
              <span className="text-gray-400 text-sm">str | None</span>
            </div>
            <p className="text-gray-300 text-sm">
              Optional model to use specifically for tool calling decisions. Allows using a faster/cheaper model for tool calls while using a more powerful model for final responses.
            </p>
            <p className="text-gray-400 text-xs mt-1">Default: None (uses the main model)</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <code className="text-feather-cyan font-mono">output_schema</code>
              <span className="text-gray-400 text-sm">Type[BaseModel] | None</span>
            </div>
            <p className="text-gray-300 text-sm">
              Optional Pydantic BaseModel class that defines the structure for the agent's response. When provided, the response content will be a validated Pydantic model instance instead of a string.
            </p>
            <p className="text-gray-400 text-xs mt-1">Default: None</p>
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-4 text-white mt-8">Methods</h3>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-white mb-3">run()</h4>
            <p className="text-gray-300 mb-4">
              Synchronously run the agent with a prompt and return the response.
            </p>
            
            <CodeBlock 
              code={`response = agent.run(prompt)
# or
response = agent.run("Your prompt text here")`}
              language="python"
            />

            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-2"><strong>Parameters:</strong></p>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 ml-4">
                <li><code className="bg-gray-900 px-2 py-1 rounded">prompt</code> (str | Prompt) - The prompt to send to the agent. Can be a string or a Prompt object for multimodal inputs.</li>
              </ul>
            </div>

            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-2"><strong>Returns:</strong></p>
              <p className="text-gray-300 text-sm ml-4">
                <code className="bg-gray-900 px-2 py-1 rounded">AIResponse</code> - Response object containing the agent's output and metadata
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-white mb-3">arun()</h4>
            <p className="text-gray-300 mb-4">
              Asynchronously run the agent with a prompt and return the response. Use this for concurrent execution or in async contexts.
            </p>
            
            <CodeBlock 
              code={`response = await agent.arun(prompt)
# or
response = await agent.arun("Your prompt text here")`}
              language="python"
            />

            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-2"><strong>Parameters:</strong></p>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 ml-4">
                <li><code className="bg-gray-900 px-2 py-1 rounded">prompt</code> (str | Prompt) - The prompt to send to the agent. Can be a string or a Prompt object for multimodal inputs.</li>
              </ul>
            </div>

            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-2"><strong>Returns:</strong></p>
              <p className="text-gray-300 text-sm ml-4">
                <code className="bg-gray-900 px-2 py-1 rounded">AIResponse</code> - Response object containing the agent's output and metadata
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Prompt Class */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
          Prompt
        </h2>
        
        <p className="text-gray-300 mb-6">
          A class for creating multimodal prompts that combine text and documents.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-white mt-8">Constructor</h3>
        
        <CodeBlock 
          code={`from feather_ai import Prompt, Document

prompt = Prompt(
    text="Your prompt text",
    documents=[Document.from_path("file.pdf")]
)`}
          language="python"
        />

        <h4 className="text-xl font-semibold mb-4 text-white mt-6">Parameters</h4>
        
        <div className="space-y-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <code className="text-feather-cyan font-mono">text</code>
              <span className="text-gray-400 text-sm">str</span>
            </div>
            <p className="text-gray-300 text-sm">
              The text portion of the prompt. This is the question or instruction you want to send to the agent.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <code className="text-feather-cyan font-mono">documents</code>
              <span className="text-gray-400 text-sm">List[Document]</span>
            </div>
            <p className="text-gray-300 text-sm">
              A list of Document objects to include with the prompt. These can be PDFs, images, or other supported file types.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-4 text-white mt-8">Methods</h3>

        <div className="bg-gray-800 rounded-lg p-6">
          <h4 className="text-xl font-semibold text-white mb-3">get_message()</h4>
          <p className="text-gray-300 mb-4">
            Internal method that converts the Prompt into a format suitable for the AI provider. Generally not called directly by users.
          </p>
          
          <div className="mt-4">
            <p className="text-gray-400 text-sm mb-2"><strong>Returns:</strong></p>
            <p className="text-gray-300 text-sm ml-4">
              Provider-specific message format
            </p>
          </div>
        </div>
      </div>

      {/* Document Class */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
          Document
        </h2>
        
        <p className="text-gray-300 mb-6">
          A class for loading and representing documents (PDFs, images, etc.) for multimodal prompts.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-white mt-8">Factory Methods</h3>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-white mb-3">from_path()</h4>
            <p className="text-gray-300 mb-4">
              Create a Document from a file path on the filesystem.
            </p>
            
            <CodeBlock 
              code={`from feather_ai import Document

doc = Document.from_path("path/to/file.pdf")
# or
doc = Document.from_path("path/to/image.jpg")`}
              language="python"
            />

            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-2"><strong>Parameters:</strong></p>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 ml-4">
                <li><code className="bg-gray-900 px-2 py-1 rounded">path</code> (str) - Path to the file to load</li>
              </ul>
            </div>

            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-2"><strong>Returns:</strong></p>
              <p className="text-gray-300 text-sm ml-4">
                <code className="bg-gray-900 px-2 py-1 rounded">Document</code> - A Document instance
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-white mb-3">from_bytes()</h4>
            <p className="text-gray-300 mb-4">
              Create a Document from raw bytes data.
            </p>
            
            <CodeBlock 
              code={`from feather_ai import Document

with open("file.pdf", "rb") as f:
    data = f.read()

doc = Document.from_bytes(data, mime_type="application/pdf")`}
              language="python"
            />

            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-2"><strong>Parameters:</strong></p>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 ml-4">
                <li><code className="bg-gray-900 px-2 py-1 rounded">data</code> (bytes) - The raw bytes of the document</li>
                <li><code className="bg-gray-900 px-2 py-1 rounded">mime_type</code> (str) - The MIME type of the document (e.g., "application/pdf", "image/jpeg")</li>
              </ul>
            </div>

            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-2"><strong>Returns:</strong></p>
              <p className="text-gray-300 text-sm ml-4">
                <code className="bg-gray-900 px-2 py-1 rounded">Document</code> - A Document instance
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-white mb-3">from_bytesio()</h4>
            <p className="text-gray-300 mb-4">
              Create a Document from a BytesIO object (useful for in-memory files).
            </p>
            
            <CodeBlock 
              code={`from feather_ai import Document
from io import BytesIO

stream = BytesIO(pdf_data)
doc = Document.from_bytesio(stream, mime_type="application/pdf")`}
              language="python"
            />

            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-2"><strong>Parameters:</strong></p>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 ml-4">
                <li><code className="bg-gray-900 px-2 py-1 rounded">stream</code> (BytesIO) - A BytesIO object containing the document data</li>
                <li><code className="bg-gray-900 px-2 py-1 rounded">mime_type</code> (str) - The MIME type of the document (e.g., "application/pdf", "image/png")</li>
              </ul>
            </div>

            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-2"><strong>Returns:</strong></p>
              <p className="text-gray-300 text-sm ml-4">
                <code className="bg-gray-900 px-2 py-1 rounded">Document</code> - A Document instance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AIResponse Class */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
          AIResponse
        </h2>
        
        <p className="text-gray-300 mb-6">
          The response object returned by <code className="bg-gray-800 px-2 py-1 rounded">run()</code> and <code className="bg-gray-800 px-2 py-1 rounded">arun()</code> methods.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-white mt-8">Attributes</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <code className="text-feather-cyan font-mono">content</code>
              <span className="text-gray-400 text-sm">str | BaseModel</span>
            </div>
            <p className="text-gray-300 text-sm">
              The main response content. If <code className="bg-gray-900 px-2 py-1 rounded">output_schema</code> was provided, this is a Pydantic model instance. Otherwise, it's a string.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <code className="text-feather-cyan font-mono">tool_trace</code>
              <span className="text-gray-400 text-sm">List[ToolCall] | None</span>
            </div>
            <p className="text-gray-300 text-sm">
              Information about any tools that were called during execution. Each ToolCall contains the tool name, arguments, and result.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 border-l-4 border-feather-blue p-6 my-8 rounded">
        <p className="text-gray-300">
          <strong className="text-feather-cyan">Need More Help?</strong> Check out the other documentation sections for detailed examples and use cases, or visit the{' '}
          <a 
            href="https://github.com/lucabzt/feather-ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-feather-cyan hover:text-feather-blue transition-colors"
          >
            GitHub repository
            <ExternalLink size={14} />
          </a>
          {' '}for the latest updates.
        </p>
      </div>
    </div>
  );
}

export default APIReference;
