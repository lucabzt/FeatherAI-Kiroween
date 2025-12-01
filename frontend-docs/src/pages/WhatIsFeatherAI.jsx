import PageHeader from '../components/PageHeader';
import CodeBlock from '../components/CodeBlock';

export default function WhatIsFeatherAI() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="What is FeatherAI?"
        description="A lightweight, fast, and simple AI agent framework"
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#e5e5e7]">Why FeatherAI?</h2>
        <p className="text-[#a0a0a3] leading-relaxed">
          FeatherAI is designed with one core principle in mind: <strong className="text-[#22c4e0]">simplicity without sacrificing power</strong>.
          While frameworks like LangChain and other agent development kits offer extensive features, they often come with
          significant complexity and overhead.
        </p>
        <p className="text-[#a0a0a3] leading-relaxed">
          FeatherAI provides everything you need to build sophisticated AI agents with:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[#a0a0a3] ml-4">
          <li><strong className="text-[#e5e5e7]">Minimal boilerplate</strong> - Get started with just a few lines of code</li>
          <li><strong className="text-[#e5e5e7]">Superior performance</strong> - Faster execution compared to heavyweight frameworks</li>
          <li><strong className="text-[#e5e5e7]">Clean API</strong> - Intuitive and predictable interface design</li>
          <li><strong className="text-[#e5e5e7]">Native async support</strong> - Built for modern asynchronous workflows</li>
          <li><strong className="text-[#e5e5e7]">Type safety</strong> - Full support for structured outputs with Pydantic</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#e5e5e7]">FeatherAI vs Other Frameworks</h2>
        <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[#22c4e0] mb-2">FeatherAI</h3>
              <ul className="space-y-2 text-sm text-[#a0a0a3]">
                <li>✅ Minimal code</li>
                <li>✅ Fast execution</li>
                <li>✅ Simple API</li>
                <li>✅ Easy to learn</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#be3389] mb-2">LangChain</h3>
              <ul className="space-y-2 text-sm text-[#a0a0a3]">
                <li>❌ Verbose syntax</li>
                <li>❌ Performance overhead</li>
                <li>❌ Complex abstractions</li>
                <li>❌ Steep learning curve</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#0357c1] mb-2">Agent Development Kits</h3>
              <ul className="space-y-2 text-sm text-[#a0a0a3]">
                <li>❌ Heavy dependencies</li>
                <li>❌ Slower execution</li>
                <li>❌ Over-engineered</li>
                <li>❌ Hard to debug</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#e5e5e7]">Ready to Get Started?</h2>
        <div className="bg-gradient-to-r from-[#be3389]/10 to-[#0357c1]/10 border border-[#22c4e0] rounded-lg p-6">
          <p className="text-[#a0a0a3] leading-relaxed mb-4">
            Install FeatherAI and create your first agent in minutes. Our Getting Started guide will walk you through
            installation, setup, and your first agent.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#22c4e0] hover:bg-[#1ab3c9] text-[#0a0a0b] font-semibold rounded-lg transition-colors"
          >
            Get Started
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#e5e5e7]">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#22c4e0] mb-2">🔧 Tool Calling</h3>
            <p className="text-sm text-[#a0a0a3]">
              Easily extend your agents with custom tools and functions
            </p>
          </div>
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#22c4e0] mb-2">📊 Structured Output</h3>
            <p className="text-sm text-[#a0a0a3]">
              Get type-safe, validated responses using Pydantic schemas
            </p>
          </div>
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#22c4e0] mb-2">🖼️ Multimodal</h3>
            <p className="text-sm text-[#a0a0a3]">
              Work with images, documents, and text seamlessly
            </p>
          </div>
          <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#22c4e0] mb-2">⚡ Async First</h3>
            <p className="text-sm text-[#a0a0a3]">
              Native support for asynchronous execution and parallel tool calls
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
