import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { highlightText, removeHighlights } from '../utils/search';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // Handle search highlighting when navigating from search results
  useEffect(() => {
    const searchTerm = sessionStorage.getItem('searchTerm');
    const searchHash = sessionStorage.getItem('searchHash');

    if (searchTerm) {
      // Wait for content to render
      setTimeout(() => {
        const mainContent = document.querySelector('main');
        if (mainContent) {
          highlightText(mainContent, searchTerm);
        }

        // Scroll to hash location if present, otherwise scroll to first highlight
        if (searchHash) {
          const element = document.querySelector(searchHash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }

        // After a brief delay, scroll to the first highlighted term
        setTimeout(() => {
          const firstHighlight = document.querySelector('mark.search-highlight');
          if (firstHighlight) {
            firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 200);

        // Clear sessionStorage after highlighting
        sessionStorage.removeItem('searchTerm');
        sessionStorage.removeItem('searchHash');
      }, 100);
    }

    // Cleanup highlights when navigating away
    return () => {
      const mainContent = document.querySelector('main');
      if (mainContent) {
        removeHighlights(mainContent);
      }
    };
  }, [location]);

  return (
    <div className="min-h-screen bg-[#0a0a0b] relative overflow-hidden">
      {/* Background accent SVGs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <img
          src="/half-circle-svgrepo-com.svg"
          alt=""
          className="absolute top-20 right-0 w-96 h-96 opacity-1 transform rotate-45"
        />
        <img
          src="/logo-svgrepo-com.svg"
          alt=""
          className="absolute -bottom-50 right-40 w-96 h-96 opacity-1"
        />
      </div>

      <Navbar onMenuToggle={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <main className="pt-16 lg:pl-64 transition-all duration-300">
        <div className="px-8 py-8 max-w-4xl relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
