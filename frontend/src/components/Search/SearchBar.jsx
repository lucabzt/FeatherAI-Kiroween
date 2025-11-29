import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { searchDocs } from '../../utils/search';
import { searchIndex } from '../../data/searchIndex';
import SearchResults from './SearchResults';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // Handle real-time filtering as user types
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setShowResults(false);
      return;
    }

    const filteredResults = searchDocs(query, searchIndex);
    setResults(filteredResults);
    setShowResults(true);
  }, [query]);

  // Close results when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleResultClick = () => {
    setShowResults(false);
    setQuery('');
  };

  const handleInputFocus = () => {
    if (query.trim() !== '') {
      setShowResults(true);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Search documentation..."
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-feather-cyan hover:border-gray-600 transition-colors"
        />
      </div>
      
      {showResults && (
        <SearchResults 
          results={results} 
          query={query}
          onResultClick={handleResultClick}
        />
      )}
    </div>
  );
}

export default SearchBar;
