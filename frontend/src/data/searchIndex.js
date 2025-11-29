// Search index for documentation content
// Each entry contains: id, title, content, route, section

export const searchIndex = [
  // Getting Started
  {
    id: 'getting-started-intro',
    title: 'Getting Started',
    content: 'Welcome to FeatherAI documentation. FeatherAI is a lightweight Python agentic AI framework for creating, running, orchestrating and tracing AI agents.',
    route: '/',
    section: 'Getting Started'
  },
  {
    id: 'getting-started-installation',
    title: 'Installation',
    content: 'Install FeatherAI using pip. Requires Python version 3.9 or higher, but less than 3.14. pip install feather-ai',
    route: '/',
    section: 'Getting Started'
  },
  {
    id: 'getting-started-api-keys',
    title: 'API Keys Setup',
    content: 'Configure API keys for different providers: OpenAI, Anthropic Claude, Google Gemini, Mistral. Set environment variables for authentication.',
    route: '/',
    section: 'Getting Started'
  },
  {
    id: 'getting-started-basic-example',
    title: 'Basic AIAgent Example',
    content: 'Create and run a basic AIAgent. Simple prompt example showing how to initialize an agent and get responses.',
    route: '/',
    section: 'Getting Started'
  },

  // System Instructions
  {
    id: 'system-instructions-overview',
    title: 'System Instructions',
    content: 'System instructions parameter allows you to configure agent behavior. Pass instructions as an optional string to control how the agent responds.',
    route: '/system-instructions',
    section: 'System Instructions'
  },
  {
    id: 'system-instructions-usage',
    title: 'Using System Instructions',
    content: 'How to pass instructions to AIAgent. Code examples demonstrating instructions parameter usage and behavior impact.',
    route: '/system-instructions',
    section: 'System Instructions'
  },
  {
    id: 'system-instructions-examples',
    title: 'System Instructions Examples',
    content: 'Multiple use cases for system instructions. Examples showing different instruction patterns and their effects on agent behavior.',
    route: '/system-instructions',
    section: 'System Instructions'
  },

  // Tool Calling
  {
    id: 'tool-calling-overview',
    title: 'Tool Calling',
    content: 'Tool calling allows agents to use custom functions. Define tools and pass them to the agent for automatic execution.',
    route: '/tool-calling',
    section: 'Tool Calling'
  },
  {
    id: 'tool-calling-definition',
    title: 'Defining Tools',
    content: 'How to define and use tools. Simple function examples showing tool definition and usage patterns.',
    route: '/tool-calling',
    section: 'Tool Calling'
  },
  {
    id: 'tool-calling-execution',
    title: 'Automatic Tool Execution',
    content: 'The agent automatically calls tools when needed. Access tool traces from AIResponse object to see execution details.',
    route: '/tool-calling',
    section: 'Tool Calling'
  },
  {
    id: 'tool-calling-advanced',
    title: 'Advanced Tool Usage',
    content: 'tool_model parameter for using different models for tool calling. Configure which model handles tool execution.',
    route: '/tool-calling',
    section: 'Tool Calling'
  },

  // Structured Output
  {
    id: 'structured-output-overview',
    title: 'Structured Output',
    content: 'Get structured output from agents using output_schema parameter. Parse agent responses programmatically with Pydantic models.',
    route: '/structured-output',
    section: 'Structured Output'
  },
  {
    id: 'structured-output-pydantic',
    title: 'Pydantic BaseModel Schema',
    content: 'Define Pydantic BaseModel schema for structured responses. Pass schema to AIAgent to receive typed responses.',
    route: '/structured-output',
    section: 'Structured Output'
  },
  {
    id: 'structured-output-usage',
    title: 'Using Structured Output',
    content: 'How to pass schema to AIAgent and receive typed responses. The content attribute contains the Pydantic model instance.',
    route: '/structured-output',
    section: 'Structured Output'
  },
  {
    id: 'structured-output-examples',
    title: 'Structured Output Examples',
    content: 'Practical use cases with multiple fields. Examples showing complex schemas and real-world applications.',
    route: '/structured-output',
    section: 'Structured Output'
  },

  // Multimodal
  {
    id: 'multimodal-overview',
    title: 'Multimodal Capabilities',
    content: 'Process documents and images with multimodal agents. Use Prompt and Document classes for multimodal inputs.',
    route: '/multimodal',
    section: 'Multimodal'
  },
  {
    id: 'multimodal-prompt-class',
    title: 'Prompt Class',
    content: 'Prompt class with text and documents parameters. Create prompts combining text and multimodal content.',
    route: '/multimodal',
    section: 'Multimodal'
  },
  {
    id: 'multimodal-document-class',
    title: 'Document Class',
    content: 'Document class factory methods: from_path, from_bytes, from_bytesio. Load documents from various sources.',
    route: '/multimodal',
    section: 'Multimodal'
  },
  {
    id: 'multimodal-examples',
    title: 'Multimodal Examples',
    content: 'PDF and image processing examples. Demonstrate processing different document types with agents.',
    route: '/multimodal',
    section: 'Multimodal'
  },
  {
    id: 'multimodal-providers',
    title: 'Provider Support',
    content: 'Claude and Gemini support multimodal prompts. OpenAI and Mistral multimodal support coming soon.',
    route: '/multimodal',
    section: 'Multimodal'
  },

  // Async Execution
  {
    id: 'async-overview',
    title: 'Asynchronous Execution',
    content: 'Build high-performance concurrent applications with async capabilities. Use arun method for asynchronous agent execution.',
    route: '/async-execution',
    section: 'Async Execution'
  },
  {
    id: 'async-arun-method',
    title: 'arun Method',
    content: 'Use await with agent.arun() for async execution. Asynchronous method for running agents concurrently.',
    route: '/async-execution',
    section: 'Async Execution'
  },
  {
    id: 'async-asyncio',
    title: 'asyncio Examples',
    content: 'Using asyncio to run async agents. Examples demonstrating async/await patterns with FeatherAI.',
    route: '/async-execution',
    section: 'Async Execution'
  },
  {
    id: 'async-tools',
    title: 'Async Function Tools',
    content: 'Async functions can be passed as tools. Define async tool functions for concurrent operations.',
    route: '/async-execution',
    section: 'Async Execution'
  },
  {
    id: 'async-concurrent',
    title: 'Concurrent Agents',
    content: 'Running multiple agents concurrently. Examples showing parallel agent execution patterns.',
    route: '/async-execution',
    section: 'Async Execution'
  },

  // Examples
  {
    id: 'examples-overview',
    title: 'Examples',
    content: 'Complex examples combining multiple FeatherAI features. Real-world applications demonstrating best practices.',
    route: '/examples',
    section: 'Examples'
  },
  {
    id: 'examples-research-assistant',
    title: 'Research Assistant',
    content: 'Research assistant combining tool calling, structured output, and system instructions. Complete runnable example.',
    route: '/examples',
    section: 'Examples'
  },
  {
    id: 'examples-features',
    title: 'Feature Combinations',
    content: 'Examples highlighting which features are used and why. Explanatory text for each example showing feature integration.',
    route: '/examples',
    section: 'Examples'
  },

  // Featured Projects
  {
    id: 'projects-overview',
    title: 'Featured Projects',
    content: 'Projects built with FeatherAI. Real-world applications showcasing framework capabilities.',
    route: '/featured-projects',
    section: 'Featured Projects'
  },
  {
    id: 'projects-piatto-cooks',
    title: 'Piatto Cooks',
    content: 'Piatto Cooks project information. Description, live link, and FeatherAI features used.',
    route: '/featured-projects',
    section: 'Featured Projects'
  },
  {
    id: 'projects-mentora-kiro',
    title: 'Mentora Kiro',
    content: 'Mentora Kiro project information. Description, live link, and FeatherAI features used.',
    route: '/featured-projects',
    section: 'Featured Projects'
  },

  // API Reference
  {
    id: 'api-overview',
    title: 'API Reference',
    content: 'Complete API documentation for FeatherAI. Detailed reference for all classes, methods, and parameters.',
    route: '/api-reference',
    section: 'API Reference'
  },
  {
    id: 'api-aiagent-class',
    title: 'AIAgent Class',
    content: 'AIAgent class documentation. Constructor parameters with types and descriptions. run and arun methods.',
    route: '/api-reference',
    section: 'API Reference'
  },
  {
    id: 'api-aiagent-constructor',
    title: 'AIAgent Constructor',
    content: 'AIAgent constructor parameters: model, provider, instructions, tools, output_schema, tool_model. Parameter types and descriptions.',
    route: '/api-reference',
    section: 'API Reference'
  },
  {
    id: 'api-aiagent-methods',
    title: 'AIAgent Methods',
    content: 'run and arun methods documentation. Parameters and return types for synchronous and asynchronous execution.',
    route: '/api-reference',
    section: 'API Reference'
  },
  {
    id: 'api-prompt-class',
    title: 'Prompt Class',
    content: 'Prompt class documentation. Constructor parameters and get_message method for multimodal prompts.',
    route: '/api-reference',
    section: 'API Reference'
  },
  {
    id: 'api-document-class',
    title: 'Document Class',
    content: 'Document class factory methods: from_path, from_bytes, from_bytesio. Parameters for loading documents.',
    route: '/api-reference',
    section: 'API Reference'
  },
];
