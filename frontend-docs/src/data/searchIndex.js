// Enhanced search index with sections and keywords for precise navigation
export const searchIndex = [
  // What is FeatherAI - Sections
  {
    id: 'featherai-intro',
    title: 'What is FeatherAI',
    section: null,
    path: '/what-is-featherai',
    hash: '',
    category: 'Introduction',
    keywords: ['introduction', 'overview', 'featherai'],
    searchableText: 'What is FeatherAI introduction overview'
  },
  {
    id: 'why-featherai',
    title: 'Why FeatherAI',
    section: 'Why FeatherAI?',
    path: '/what-is-featherai',
    hash: '#why',
    category: 'Introduction',
    keywords: ['why', 'simplicity', 'speed', 'performance', 'lightweight'],
    searchableText: 'Why FeatherAI simplicity speed performance lightweight minimal boilerplate'
  },
  {
    id: 'comparison',
    title: 'FeatherAI vs Other Frameworks',
    section: 'Comparison',
    path: '/what-is-featherai',
    hash: '#comparison',
    category: 'Introduction',
    keywords: ['comparison', 'langchain', 'adk', 'versus', 'frameworks'],
    searchableText: 'comparison LangChain ADK Agent Development Kit frameworks versus'
  },

  // Getting Started - Sections
  {
    id: 'installation',
    title: 'Installation',
    section: 'Installation',
    path: '/',
    hash: '#installation',
    category: 'Getting Started',
    keywords: ['install', 'pip', 'setup', 'feather-ai-sdk'],
    searchableText: 'installation pip install feather-ai-sdk setup'
  },
  {
    id: 'environment-setup',
    title: 'Environment Setup',
    section: 'API Keys',
    path: '/',
    hash: '#environment',
    category: 'Getting Started',
    keywords: ['api keys', 'openai', 'anthropic', 'google', 'tavily', 'environment', 'env'],
    searchableText: 'environment setup API keys OPENAI_API_KEY ANTHROPIC_API_KEY GOOGLE_API_KEY TAVILY_API_KEY .env'
  },
  {
    id: 'quickstart',
    title: 'Quick Start',
    section: 'Quick Start Example',
    path: '/',
    hash: '#quickstart',
    category: 'Getting Started',
    keywords: ['quickstart', 'example', 'first agent', 'basic'],
    searchableText: 'quick start example first agent basic usage'
  },
  {
    id: 'supported-models',
    title: 'Supported Models',
    section: 'Models',
    path: '/',
    hash: '#models',
    category: 'Getting Started',
    keywords: ['models', 'gpt', 'claude', 'gemini', 'mistral', 'llm'],
    searchableText: 'supported models GPT-4 Claude Gemini Mistral LLM providers'
  },

  // System Instructions - Sections
  {
    id: 'system-instructions-basics',
    title: 'System Instructions - Basic Usage',
    section: 'Basic Usage',
    path: '/system-instructions',
    hash: '#basic',
    category: 'Basic Agents',
    keywords: ['instructions', 'system prompt', 'basic'],
    searchableText: 'system instructions basic usage agent behavior'
  },
  {
    id: 'multiline-instructions',
    title: 'Multi-line Instructions',
    section: 'Multi-line Instructions',
    path: '/system-instructions',
    hash: '#multiline',
    category: 'Basic Agents',
    keywords: ['multi-line', 'instructions', 'detailed'],
    searchableText: 'multi-line instructions detailed system prompt'
  },
  {
    id: 'load-from-file',
    title: 'Loading Instructions from File',
    section: 'Load from File',
    path: '/system-instructions',
    hash: '#file',
    category: 'Basic Agents',
    keywords: ['load', 'file', 'load_instruction_from_file'],
    searchableText: 'loading instructions from file load_instruction_from_file'
  },

  // Tool Calling
  {
    id: 'tool-calling',
    title: 'Tool Calling',
    section: null,
    path: '/tool-calling',
    hash: '',
    category: 'Basic Agents',
    keywords: ['tools', 'functions', 'custom tools', 'function calling'],
    searchableText: 'tool calling custom tools functions integration'
  },

  // Structured Output
  {
    id: 'structured-output',
    title: 'Structured Output',
    section: null,
    path: '/structured-output',
    hash: '',
    category: 'Basic Agents',
    keywords: ['pydantic', 'schema', 'validation', 'output_schema', 'basemodel'],
    searchableText: 'structured output Pydantic schema validation type-safe BaseModel'
  },

  // Multimodal
  {
    id: 'multimodal',
    title: 'Multimodal',
    section: null,
    path: '/multimodal',
    hash: '',
    category: 'Basic Agents',
    keywords: ['images', 'pdf', 'documents', 'vision', 'ocr', 'multimodal'],
    searchableText: 'multimodal images PDF documents vision OCR'
  },

  // Native Tools - Sections
  {
    id: 'web-search-tools',
    title: 'Web Search Tools',
    section: 'Web Search',
    path: '/native-tools',
    hash: '#web-search',
    category: 'Tools',
    keywords: ['web search', 'google', 'tavily', 'search'],
    searchableText: 'web search tools google_search Tavily'
  },
  {
    id: 'google-search',
    title: 'google_search',
    section: 'google_search function',
    path: '/native-tools',
    hash: '#google-search',
    category: 'Tools',
    keywords: ['google_search', 'search', 'web'],
    searchableText: 'google_search function web search'
  },
  {
    id: 'extract-tool',
    title: 'extract',
    section: 'extract function',
    path: '/native-tools',
    hash: '#extract',
    category: 'Tools',
    keywords: ['extract', 'urls', 'content'],
    searchableText: 'extract function URLs content extraction'
  },
  {
    id: 'crawl-tool',
    title: 'crawl',
    section: 'crawl function',
    path: '/native-tools',
    hash: '#crawl',
    category: 'Tools',
    keywords: ['crawl', 'website', 'subpages'],
    searchableText: 'crawl function website subpages'
  },
  {
    id: 'code-execution',
    title: 'Code Execution',
    section: 'Python Execution',
    path: '/native-tools',
    hash: '#code-execution',
    category: 'Tools',
    keywords: ['code execution', 'python', 'execute'],
    searchableText: 'code execution Python execute code'
  },

  // Async Execution - Sections
  {
    id: 'arun-basic',
    title: 'arun Method - Basic Usage',
    section: 'Basic Usage',
    path: '/arun-method',
    hash: '#basic',
    category: 'Async Execution',
    keywords: ['arun', 'async', 'await', 'basic'],
    searchableText: 'arun method async await basic usage'
  },
  {
    id: 'concurrent-agents',
    title: 'Running Multiple Agents Concurrently',
    section: 'Concurrent Execution',
    path: '/arun-method',
    hash: '#concurrent',
    category: 'Async Execution',
    keywords: ['concurrent', 'parallel', 'asyncio.gather', 'multiple agents'],
    searchableText: 'concurrent execution parallel asyncio.gather multiple agents'
  },
  {
    id: 'sequential-async',
    title: 'Sequential Async Execution',
    section: 'Sequential Async',
    path: '/arun-method',
    hash: '#sequential',
    category: 'Async Execution',
    keywords: ['sequential', 'chain', 'workflow'],
    searchableText: 'sequential async execution chain workflow'
  },

  // Async Tools
  {
    id: 'async-tools',
    title: 'Asynchronous Tools',
    section: null,
    path: '/async-tools',
    hash: '',
    category: 'Async Execution',
    keywords: ['async tools', 'parallel', 'performance'],
    searchableText: 'asynchronous tools async parallel performance'
  },
  {
    id: 'google-search-async',
    title: 'google_search_async',
    section: 'google_search_async',
    path: '/async-tools',
    hash: '#google-search-async',
    category: 'Async Execution',
    keywords: ['google_search_async', 'async search'],
    searchableText: 'google_search_async asynchronous web search'
  },
  {
    id: 'web-tools-async',
    title: 'web_tools_async',
    section: 'Import All Async Tools',
    path: '/async-tools',
    hash: '#web-tools-async',
    category: 'Async Execution',
    keywords: ['web_tools_async', 'import', 'async'],
    searchableText: 'web_tools_async import all async web tools'
  },

  // Examples
  {
    id: 'fact-checker',
    title: 'Social Media Fact Checker',
    section: 'Example',
    path: '/examples',
    hash: '',
    category: 'Examples',
    keywords: ['fact checker', 'example', 'multi-agent', 'tutorial'],
    searchableText: 'social media fact checker example multi-agent tutorial OCR'
  },

  // Featured Projects
  {
    id: 'featured',
    title: 'Featured Projects',
    section: null,
    path: '/featured-projects',
    hash: '',
    category: 'Community',
    keywords: ['projects', 'showcase', 'community'],
    searchableText: 'featured projects community showcase'
  }
];
