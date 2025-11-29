import { ExternalLink } from 'lucide-react';

function FeaturedProjects() {
  const projects = [
    {
      name: "Piatto Cooks",
      description: "An AI-powered cooking assistant that helps users discover recipes, plan meals, and get personalized cooking advice. Piatto Cooks uses natural language understanding to interpret cooking questions and provide step-by-step guidance.",
      url: "https://piattocooks.com",
      features: [
        "System Instructions - Defines the assistant's personality as a friendly, knowledgeable chef",
        "Tool Calling - Searches recipe databases and retrieves ingredient information",
        "Structured Output - Returns recipes in a consistent, parseable format",
        "Multimodal - Analyzes food images to identify dishes and suggest recipes"
      ],
      gradient: "from-feather-orange to-feather-pink"
    },
    {
      name: "Mentora Kiro",
      description: "A personalized learning platform that provides AI-driven mentorship and educational guidance. Mentora Kiro adapts to each student's learning style and pace, offering customized explanations and practice problems.",
      url: "https://mentorakiro.com",
      features: [
        "System Instructions - Establishes the mentor's teaching approach and expertise level",
        "Structured Output - Generates lesson plans and quizzes in structured formats",
        "Tool Calling - Accesses educational content databases and progress tracking",
        "Async Execution - Handles multiple student interactions concurrently"
      ],
      gradient: "from-feather-blue to-feather-cyan"
    }
  ];

  return (
    <div className="max-w-4xl w-full">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-white break-words">Featured Projects</h1>
      
      <p className="text-gray-300 mb-8 text-lg">
        Discover real-world applications built with FeatherAI. These projects showcase the versatility and power of the library across different domains.
      </p>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <div 
            key={index}
            className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors"
          >
            {/* Project Header with Gradient */}
            <div className={`bg-gradient-to-r ${project.gradient} p-6`}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {project.name}
                  </h2>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-white hover:text-gray-200 transition-colors text-sm"
                  >
                    <span className="mr-1">{project.url}</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
              <p className="text-gray-300 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  FeatherAI Features Used
                </h3>
                <ul className="space-y-2">
                  {project.features.map((feature, featureIndex) => {
                    const [featureName, ...descriptionParts] = feature.split(' - ');
                    const description = descriptionParts.join(' - ');
                    
                    return (
                      <li key={featureIndex} className="flex items-start">
                        <span className="text-feather-cyan mr-2 mt-1">•</span>
                        <div>
                          <span className="text-feather-cyan font-semibold">
                            {featureName}
                          </span>
                          {description && (
                            <span className="text-gray-400"> - {description}</span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-6">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${project.gradient} text-white font-semibold rounded-lg hover:opacity-90 transition-opacity`}
                >
                  Visit {project.name}
                  <ExternalLink size={16} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 border-l-4 border-feather-blue p-6 my-8 rounded">
        <h3 className="text-xl font-semibold text-white mb-3">
          Build Your Own Project
        </h3>
        <p className="text-gray-300 mb-4">
          These projects demonstrate just a few of the possibilities with FeatherAI. Whether you're building a chatbot, automation tool, data processor, or something entirely new, FeatherAI provides the foundation you need.
        </p>
        <p className="text-gray-300">
          Have you built something with FeatherAI? We'd love to feature it! Reach out on{' '}
          <a 
            href="https://github.com/lucabzt/feather-ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-feather-cyan hover:text-feather-blue transition-colors"
          >
            GitHub
            <ExternalLink size={14} />
          </a>
          {' '}to share your project.
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mt-8">
        <h3 className="text-xl font-semibold text-white mb-4">
          Common Use Cases
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded p-4">
            <h4 className="text-feather-cyan font-semibold mb-2">Conversational AI</h4>
            <p className="text-gray-400 text-sm">
              Chatbots, virtual assistants, and customer support agents
            </p>
          </div>
          <div className="bg-gray-900 rounded p-4">
            <h4 className="text-feather-cyan font-semibold mb-2">Content Generation</h4>
            <p className="text-gray-400 text-sm">
              Writing assistants, content creators, and copywriting tools
            </p>
          </div>
          <div className="bg-gray-900 rounded p-4">
            <h4 className="text-feather-cyan font-semibold mb-2">Data Processing</h4>
            <p className="text-gray-400 text-sm">
              Document analysis, data extraction, and information synthesis
            </p>
          </div>
          <div className="bg-gray-900 rounded p-4">
            <h4 className="text-feather-cyan font-semibold mb-2">Automation</h4>
            <p className="text-gray-400 text-sm">
              Workflow automation, task scheduling, and intelligent routing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProjects;
