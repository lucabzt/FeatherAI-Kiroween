/**
 * Search utility functions for documentation search
 */

/**
 * Escapes special regex characters in a string to prevent regex injection
 * @param {string} str - The string to escape
 * @returns {string} - The escaped string safe for use in regex
 */
export function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Searches through the documentation index and returns matching entries
 * @param {string} query - The search query
 * @param {Array} index - The search index array
 * @returns {Array} - Array of matching search entries
 */
export function searchDocs(query, index) {
  if (!query || query.trim() === '') {
    return [];
  }

  const lowerQuery = query.toLowerCase().trim();
  
  return index.filter(entry => {
    const titleMatch = entry.title.toLowerCase().includes(lowerQuery);
    const contentMatch = entry.content.toLowerCase().includes(lowerQuery);
    const sectionMatch = entry.section.toLowerCase().includes(lowerQuery);
    
    return titleMatch || contentMatch || sectionMatch;
  });
}

/**
 * Highlights matching text in a string by wrapping it with a span element
 * @param {string} text - The text to highlight
 * @param {string} query - The search query to highlight
 * @returns {string} - HTML string with highlighted matches
 */
export function highlightText(text, query) {
  if (!query || query.trim() === '') {
    return text;
  }

  const escapedQuery = escapeRegex(query.trim());
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  
  return text.replace(regex, '<mark class="bg-feather-cyan text-gray-900 px-1 rounded">$1</mark>');
}
