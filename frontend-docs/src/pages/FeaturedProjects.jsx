import PageHeader from '../components/PageHeader';

export default function FeaturedProjects() {
  return (
    <div className="max-w-none">
      <PageHeader
        title="Featured Projects"
        subtitle="Real-world applications built with FeatherAI"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Piatto Cooks */}
        <a
          href="https://piatto-cooks.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-br from-[#be3389]/10 to-[#0357c1]/10 border border-[#2a2a2c] hover:border-[#22c4e0] rounded-lg p-6 transition-all hover:scale-105"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-[#be3389]/20 rounded-lg flex items-center justify-center text-2xl">
              🍝
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white m-0">Piatto Cooks</h2>
              <p className="text-sm text-[#22c4e0] m-0">piatto-cooks.com →</p>
            </div>
          </div>
          <p className="text-[#a0a0a3] mb-4">
            An AI-powered cooking assistant that helps you discover recipes, plan meals, and
            get personalized cooking guidance.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[#0a0a0b] border border-[#2a2a2c] rounded-full text-xs text-[#a0a0a3]">
              Recipe Generation
            </span>
            <span className="px-3 py-1 bg-[#0a0a0b] border border-[#2a2a2c] rounded-full text-xs text-[#a0a0a3]">
              Meal Planning
            </span>
            <span className="px-3 py-1 bg-[#0a0a0b] border border-[#2a2a2c] rounded-full text-xs text-[#a0a0a3]">
              Dietary Preferences
            </span>
          </div>
        </a>

        {/* Mentora Kiro */}
        <a
          href="https://www.mentora-kiro.de/"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-br from-[#0357c1]/10 to-[#22c4e0]/10 border border-[#2a2a2c] hover:border-[#22c4e0] rounded-lg p-6 transition-all hover:scale-105"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-[#0357c1]/20 rounded-lg flex items-center justify-center text-2xl">
              🎓
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white m-0">Mentora Kiro</h2>
              <p className="text-sm text-[#22c4e0] m-0">mentora-kiro.de →</p>
            </div>
          </div>
          <p className="text-[#a0a0a3] mb-4">
            An intelligent mentoring platform that connects mentors and mentees, providing
            personalized guidance and learning paths.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[#0a0a0b] border border-[#2a2a2c] rounded-full text-xs text-[#a0a0a3]">
              Personalized Learning
            </span>
            <span className="px-3 py-1 bg-[#0a0a0b] border border-[#2a2a2c] rounded-full text-xs text-[#a0a0a3]">
              Skill Assessment
            </span>
            <span className="px-3 py-1 bg-[#0a0a0b] border border-[#2a2a2c] rounded-full text-xs text-[#a0a0a3]">
              Progress Tracking
            </span>
          </div>
        </a>
      </div>

      <div className="bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Built Something Cool?</h2>
        <p className="text-[#a0a0a3] mb-6">
          If you've built a project with FeatherAI and would like to showcase it here, we'd love to hear from you!
        </p>
        <a
          href="https://github.com/lucabzt/feather-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#be3389] to-[#0357c1] rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Submit Your Project
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
