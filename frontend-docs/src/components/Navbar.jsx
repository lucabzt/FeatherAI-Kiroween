import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { searchDocs } from '../utils/search';

// SearchInput component moved outside to prevent recreation on each render
function SearchInput({
  searchQuery,
  setSearchQuery,
  handleKeyDown,
  setShowResults,
  showResults,
  searchResults,
  handleResultClick,
  selectedIndex,
  isMobile = false
}) {
  return (
    <div className="relative w-full">
      <input
        id={isMobile ? 'mobile-search-input' : 'desktop-search-input'}
        type="text"
        placeholder="Search documentation..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
        className="w-full px-4 py-2 pl-10 bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg text-[#e5e5e7] placeholder-[#a0a0a3] focus:outline-none focus:border-[#22c4e0] transition-colors"
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#a0a0a3]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg shadow-xl overflow-hidden z-50 max-h-96 overflow-y-auto">
          {searchResults.map((result, index) => (
            <button
              key={result.id}
              onClick={() => handleResultClick(result)}
              className={`w-full px-4 py-3 text-left hover:bg-[#2a2a2c] transition-colors border-b border-[#2a2a2c] last:border-b-0 ${
                index === selectedIndex ? 'bg-[#2a2a2c]' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {result.section ? (
                    <svg className="w-4 h-4 text-[#22c4e0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-[#22c4e0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#e5e5e7] font-medium truncate">{result.title}</span>
                    {result.section && (
                      <svg className="w-3 h-3 text-[#a0a0a3] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                  {result.section && (
                    <div className="text-sm text-[#22c4e0] truncate mb-1">{result.section}</div>
                  )}
                  {result.matchedKeyword && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-[#22c4e0]/20 text-[#22c4e0] rounded">
                        {result.matchedKeyword}
                      </span>
                      <span className="text-xs text-[#a0a0a3]">in {result.category}</span>
                    </div>
                  )}
                  {!result.matchedKeyword && (
                    <div className="text-xs text-[#a0a0a3]">{result.category}</div>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <svg className="w-4 h-4 text-[#a0a0a3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {showResults && searchQuery.length >= 2 && searchResults.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg shadow-xl p-4 z-50">
          <p className="text-[#a0a0a3] text-sm text-center">No results found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}

export default function Navbar({ onMenuToggle }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Handle search input
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const results = searchDocs(searchQuery);
      setSearchResults(results);
      setShowResults(true);
      setSelectedIndex(-1);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showResults || searchResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev < searchResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && searchResults[selectedIndex]) {
        handleResultClick(searchResults[selectedIndex]);
      } else if (searchResults[0]) {
        handleResultClick(searchResults[0]);
      }
    } else if (e.key === 'Escape') {
      setShowResults(false);
      setSelectedIndex(-1);
    }
  };

  const handleResultClick = (result) => {
    const fullPath = result.path + result.hash;
    const searchTerm = result.matchedKeyword || searchQuery;

    // Store search term in sessionStorage for highlighting
    sessionStorage.setItem('searchTerm', searchTerm);
    sessionStorage.setItem('searchHash', result.hash);

    navigate(fullPath);
    setSearchQuery('');
    setShowResults(false);
    setShowMobileSearch(false);
    setSelectedIndex(-1);
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
    if (!showMobileSearch) {
      setTimeout(() => {
        document.getElementById('mobile-search-input')?.focus();
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0b] border-b border-[#2a2a2c]">
      <div className="h-16 flex items-center justify-between px-4">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-[#a0a0a3] hover:text-[#e5e5e7] transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link to="/" className="flex items-center gap-3 pl-4">
            <img
              src="/feather-ai-logo.svg"
              alt="FeatherAI Logo"
              className="w-12 h-12"
            />
            <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              FeatherAI
            </span>
          </Link>
        </div>

        {/* Center: Search (Desktop only) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8" ref={searchRef}>
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleKeyDown={handleKeyDown}
            setShowResults={setShowResults}
            showResults={showResults}
            searchResults={searchResults}
            handleResultClick={handleResultClick}
            selectedIndex={selectedIndex}
            isMobile={false}
          />
        </div>

        {/* Right: Search Icon (Mobile) + GitHub Link */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Icon */}
          <button
            onClick={toggleMobileSearch}
            className="md:hidden p-2 text-[#a0a0a3] hover:text-[#22c4e0] transition-colors"
            aria-label="Toggle search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/lucabzt/feather-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-[#a0a0a3] hover:text-[#e5e5e7] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline text-sm">GitHub</span>
          </a>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {showMobileSearch && (
        <div className="md:hidden border-t border-[#2a2a2c] p-4 bg-[#0a0a0b]">
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleKeyDown={handleKeyDown}
            setShowResults={setShowResults}
            showResults={showResults}
            searchResults={searchResults}
            handleResultClick={handleResultClick}
            selectedIndex={selectedIndex}
            isMobile={true}
          />
        </div>
      )}
    </nav>
  );
}
