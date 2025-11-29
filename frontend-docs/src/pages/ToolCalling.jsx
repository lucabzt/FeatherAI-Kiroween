import PageHeader from '../components/PageHeader';

export default function ToolCalling() {
  return (
    <div className="max-w-none">
      <PageHeader
        title="Tool Calling"
        subtitle="Extend your agents with custom functions and external APIs"
      />

      <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">🛠️</div>
        <h2 className="text-2xl font-bold text-white mb-4">Documentation Coming Soon</h2>
        <p className="text-[#a0a0a3] mb-6">
          This page will cover how to integrate custom tools and functions with your AI agents.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <span className="px-4 py-2 bg-[#0a0a0b] border border-[#2a2a2c] rounded-lg text-sm text-[#a0a0a3]">
            Function Definition
          </span>
          <span className="px-4 py-2 bg-[#0a0a0b] border border-[#2a2a2c] rounded-lg text-sm text-[#a0a0a3]">
            Tool Binding
          </span>
          <span className="px-4 py-2 bg-[#0a0a0b] border border-[#2a2a2c] rounded-lg text-sm text-[#a0a0a3]">
            API Integration
          </span>
          <span className="px-4 py-2 bg-[#0a0a0b] border border-[#2a2a2c] rounded-lg text-sm text-[#a0a0a3]">
            Error Handling
          </span>
        </div>
      </div>
    </div>
  );
}
