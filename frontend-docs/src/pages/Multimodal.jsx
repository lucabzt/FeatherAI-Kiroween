import PageHeader from '../components/PageHeader';

export default function Multimodal() {
  return (
    <div className="max-w-none">
      <PageHeader
        title="Multimodal"
        subtitle="Work with text, images, PDFs, and other document types"
      />

      <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">🎨</div>
        <h2 className="text-2xl font-bold text-white mb-4">Documentation Coming Soon</h2>
        <p className="text-[#a0a0a3] mb-6">
          This page will cover the Prompt and Document classes for multimodal AI interactions.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <span className="px-4 py-2 bg-[#0a0a0b] border border-[#2a2a2c] rounded-lg text-sm text-[#a0a0a3]">
            Prompt Class
          </span>
          <span className="px-4 py-2 bg-[#0a0a0b] border border-[#2a2a2c] rounded-lg text-sm text-[#a0a0a3]">
            Document Class
          </span>
          <span className="px-4 py-2 bg-[#0a0a0b] border border-[#2a2a2c] rounded-lg text-sm text-[#a0a0a3]">
            Image Processing
          </span>
          <span className="px-4 py-2 bg-[#0a0a0b] border border-[#2a2a2c] rounded-lg text-sm text-[#a0a0a3]">
            PDF Support
          </span>
        </div>
      </div>
    </div>
  );
}
