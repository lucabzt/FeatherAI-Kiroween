import { useNavigate } from 'react-router-dom';
import { highlightText } from '../../utils/search';

function SearchResults({ results, query, onResultClick }) {
  const navigate = useNavigate();

  const handleResultClick = (result) => {
    navigate(result.route);
    if (onResultClick) {
      onResultClick();
    }
  };

  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 z-50">
        <p className="text-gray-400 text-sm">No results found. Try different keywords.</p>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
      {results.map((result) => (
        <button
          key={result.id}
          onClick={() => handleResultClick(result)}
          className="w-full text-left p-4 hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 
                className="font-semibold text-feather-cyan mb-1"
                dangerouslySetInnerHTML={{ __html: highlightText(result.title, query) }}
              />
              <p 
                className="text-sm text-gray-300 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: highlightText(result.content, query) }}
              />
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {result.section}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

export default SearchResults;
