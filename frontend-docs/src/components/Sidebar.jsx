import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const navigation = [
  {
    title: 'What is FeatherAI',
    path: '/what-is-featherai',
  },
  {
    title: 'Getting Started',
    path: '/',
  },
  {
    title: 'Basic Agents',
    type: 'section',
    children: [
      {
        title: 'System Instructions',
        path: '/system-instructions',
      },
      {
        title: 'Tool Calling',
        path: '/tool-calling',
      },
      {
        title: 'Structured Output',
        path: '/structured-output',
      },
      {
        title: 'Multimodal',
        path: '/multimodal',
      },
    ],
  },
  {
    title: 'Native Tools',
    path: '/native-tools',
  },
  {
    title: 'Asynchronous Execution',
    type: 'section',
    children: [
      {
        title: 'arun Method',
        path: '/arun-method',
      },
      {
        title: 'Asynchronous Tools',
        path: '/async-tools',
      },
    ],
  },
  {
    title: 'Examples',
    path: '/examples',
  },
  {
    title: 'Featured Projects',
    path: '/featured-projects',
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (title) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 bottom-0 w-64 bg-[#0a0a0b] border-r border-[#2a2a2c] z-40
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <nav className="flex flex-col h-full">
          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <ul className="space-y-1">
              {navigation.map((item) => {
                if (item.type === 'section') {
                  // Collapsible section
                  const isExpanded = expandedSections[item.title];
                  const hasActiveChild = item.children.some(
                    child => location.pathname === child.path
                  );

                  return (
                    <li key={item.title}>
                      <button
                        onClick={() => toggleSection(item.title)}
                        className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm font-semibold text-[#e5e5e7] hover:bg-[#1a1a1c] transition-colors"
                      >
                        <span>{item.title}</span>
                        <svg
                          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      {isExpanded && (
                        <ul className="mt-1 ml-4 space-y-1">
                          {item.children.map((child) => {
                            const isActive = location.pathname === child.path;
                            return (
                              <li key={child.path}>
                                <Link
                                  to={child.path}
                                  onClick={onClose}
                                  className={`
                                    block px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                    ${
                                      isActive
                                        ? 'bg-gradient-to-r from-[#be3389]/20 to-[#0357c1]/20 text-[#22c4e0] border-l-2 border-[#22c4e0]'
                                        : 'text-[#a0a0a3] hover:text-[#e5e5e7] hover:bg-[#1a1a1c]'
                                    }
                                  `}
                                >
                                  {child.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                } else {
                  // Regular page link
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className={`
                          block px-4 py-2 rounded-lg text-sm font-medium transition-colors
                          ${
                            isActive
                              ? 'bg-gradient-to-r from-[#be3389]/20 to-[#0357c1]/20 text-[#22c4e0] border-l-2 border-[#22c4e0]'
                              : 'text-[#a0a0a3] hover:text-[#e5e5e7] hover:bg-[#1a1a1c]'
                          }
                        `}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>

          {/* Footer with GitHub Link */}
          <div className="border-t border-[#2a2a2c] p-4">
            <a
              href="https://github.com/lucabzt/feather-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1c] border border-[#2a2a2c] rounded-lg text-[#e5e5e7] hover:border-[#be3389] transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span>View on GitHub</span>
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
}
