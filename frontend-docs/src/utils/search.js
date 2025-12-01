import { searchIndex } from '../data/searchIndex';

/**
 * Search through the documentation index with section-level precision
 * @param {string} query - The search query
 * @returns {Array} - Array of search results sorted by relevance
 */
export function searchDocs(query) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  const queryTerms = normalizedQuery.split(/\s+/);

  const results = searchIndex.map(item => {
    let score = 0;

    // Exact title match (highest priority)
    if (item.title.toLowerCase() === normalizedQuery) {
      score += 100;
    }

    // Title contains full query
    if (item.title.toLowerCase().includes(normalizedQuery)) {
      score += 50;
    }

    // Section match (very high priority for keywords)
    if (item.section && item.section.toLowerCase().includes(normalizedQuery)) {
      score += 60;
    }

    // Title contains any query term
    queryTerms.forEach(term => {
      if (item.title.toLowerCase().includes(term)) {
        score += 20;
      }
      if (item.section && item.section.toLowerCase().includes(term)) {
        score += 25;
      }
    });

    // Keyword matches (high priority)
    item.keywords.forEach(keyword => {
      if (keyword === normalizedQuery) {
        score += 70; // Exact keyword match
      } else if (keyword.includes(normalizedQuery)) {
        score += 40;
      }

      queryTerms.forEach(term => {
        if (keyword.includes(term)) {
          score += 15;
        }
      });
    });

    // Searchable text matches
    const normalizedText = item.searchableText.toLowerCase();
    if (normalizedText.includes(normalizedQuery)) {
      score += 20;
    }

    queryTerms.forEach(term => {
      if (normalizedText.includes(term)) {
        score += 8;
      }
    });

    // Category match
    if (item.category.toLowerCase().includes(normalizedQuery)) {
      score += 15;
    }

    return {
      ...item,
      score,
      matchedKeyword: findBestMatchingKeyword(item.keywords, normalizedQuery, queryTerms)
    };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, 10); // Return top 10 results

  return results;
}

/**
 * Find the best matching keyword for display
 */
function findBestMatchingKeyword(keywords, query, queryTerms) {
  // Check for exact match
  for (const keyword of keywords) {
    if (keyword === query) {
      return keyword;
    }
  }

  // Check for contains
  for (const keyword of keywords) {
    if (keyword.includes(query)) {
      return keyword;
    }
  }

  // Check for term matches
  for (const term of queryTerms) {
    for (const keyword of keywords) {
      if (keyword.includes(term)) {
        return keyword;
      }
    }
  }

  return keywords[0] || '';
}

/**
 * Highlight text that matches the search query
 * @param {HTMLElement} element - The element to highlight within
 * @param {string} query - The search query
 */
export function highlightText(element, query) {
  if (!element || !query) return;

  const normalizedQuery = query.toLowerCase().trim();
  const queryTerms = normalizedQuery.split(/\s+/).filter(term => term.length > 1);

  // Remove existing highlights
  removeHighlights(element);

  // Function to highlight text in a text node
  function highlightNode(node) {
    const text = node.textContent;
    const lowerText = text.toLowerCase();

    let hasMatch = false;
    let html = text;

    // Try to match full query first
    const fullQueryIndex = lowerText.indexOf(normalizedQuery);
    if (fullQueryIndex !== -1) {
      const before = text.substring(0, fullQueryIndex);
      const match = text.substring(fullQueryIndex, fullQueryIndex + normalizedQuery.length);
      const after = text.substring(fullQueryIndex + normalizedQuery.length);
      html = `${escapeHtml(before)}<mark class="search-highlight">${escapeHtml(match)}</mark>${escapeHtml(after)}`;
      hasMatch = true;
    } else {
      // Try individual terms
      queryTerms.forEach(term => {
        const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
        if (regex.test(html)) {
          html = html.replace(regex, '<mark class="search-highlight">$1</mark>');
          hasMatch = true;
        }
      });
    }

    if (hasMatch) {
      const span = document.createElement('span');
      span.innerHTML = html;
      span.setAttribute('data-search-highlighted', 'true');
      node.parentNode.replaceChild(span, node);
    }
  }

  // Walk through text nodes
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        // Skip script, style, and already highlighted nodes
        if (node.parentElement.tagName === 'SCRIPT' ||
            node.parentElement.tagName === 'STYLE' ||
            node.parentElement.tagName === 'CODE' ||
            node.parentElement.hasAttribute('data-search-highlighted')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const textNodes = [];
  let currentNode;
  while (currentNode = walker.nextNode()) {
    textNodes.push(currentNode);
  }

  textNodes.forEach(highlightNode);
}

/**
 * Remove all search highlights
 */
export function removeHighlights(element) {
  if (!element) return;

  const highlights = element.querySelectorAll('[data-search-highlighted]');
  highlights.forEach(span => {
    const parent = span.parentNode;
    while (span.firstChild) {
      parent.insertBefore(span.firstChild, span);
    }
    parent.removeChild(span);
    parent.normalize();
  });

  const marks = element.querySelectorAll('mark.search-highlight');
  marks.forEach(mark => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
