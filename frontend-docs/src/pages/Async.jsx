import PageHeader from '../components/PageHeader';

export default function Async() {
  return (
    <div className="max-w-none">
      <PageHeader
        title="Asynchronous Execution"
        subtitle="Run agents concurrently for improved performance"
      />

      <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">⚡</div>
        <h2 className="text-2xl font-bold text-white mb-4">Documentation Coming Soon</h2>
        <p className="text-[#a0a0a3] mb-6">
          This page will cover async agent execution and concurrent tool calling.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <span className="px-4 py-2 bg-[#0a0a0b] border border-[#2a2a2c] rounded-lg text-sm text-[#a0a0a3]">
            arun() Method
          </span>
          <span className="px-4 py-2 bg-[#0a0a0b] border border-[#2a2a2c] rounded-lg text-sm text-[#a0a0a3]">
            Async Tools
          </span>
          <span className="px-4 py-2 bg-[#0a0a0b] border border-[#2a2a2c] rounded-lg text-sm text-[#a0a0a3]">
            Concurrent Execution
          </span>
          <span className="px-4 py-2 bg-[#0a0a0b] border border-[#2a2a2c] rounded-lg text-sm text-[#a0a0a3]">
            asyncio.gather()
          </span>
        </div>
      </div>
    </div>
  );
}
