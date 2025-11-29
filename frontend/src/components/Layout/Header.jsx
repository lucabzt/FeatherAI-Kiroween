import { Menu, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '../Search/SearchBar';

function Header({ onMenuToggle }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800 border-b border-gray-700 z-40">
      <div className="h-full flex items-center justify-between px-4 gap-4">
        {/* Left side: Mobile menu toggle + Logo */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Mobile menu toggle button */}
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white active:bg-gray-600 transition-colors touch-manipulation"
            aria-label="Toggle menu"
            aria-expanded="false"
            type="button"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/feather-ai-logo.svg" 
              alt="FeatherAI Logo" 
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-feather-cyan hidden sm:inline">
              FeatherAI
            </span>
          </Link>
        </div>

        {/* Center: Search bar */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <SearchBar />
        </div>

        {/* Right side: External links */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="https://github.com/lucabzt/feather-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            aria-label="GitHub Repository"
          >
            <Github size={20} />
            <span className="hidden sm:inline text-sm font-medium">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
