import { NavLink, useLocation } from 'react-router-dom';
import { Home, Settings, Wrench, FileJson, Image, Zap, Code, Star, Book } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Getting Started', icon: Home },
  { path: '/system-instructions', label: 'System Instructions', icon: Settings },
  { path: '/tool-calling', label: 'Tool Calling', icon: Wrench },
  { path: '/structured-output', label: 'Structured Output', icon: FileJson },
  { path: '/multimodal', label: 'Multimodal', icon: Image },
  { path: '/async-execution', label: 'Asynchronous Execution', icon: Zap },
  { path: '/examples', label: 'Examples', icon: Code },
  { path: '/featured-projects', label: 'Featured Projects', icon: Star },
  { path: '/api-reference', label: 'API Reference', icon: Book }
];

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className="hidden md:block w-64 bg-gray-800 min-h-screen fixed left-0 top-0 pt-16 border-r border-gray-700"
        role="navigation"
        aria-label="Main navigation"
      >
        <nav className="p-4 overflow-y-auto h-full">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-feather-blue text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`
                    }
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`md:hidden fixed left-0 top-0 w-64 bg-gray-800 min-h-screen pt-16 border-r border-gray-700 z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <nav className="p-4 overflow-y-auto h-full">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    onTouchEnd={(e) => {
                      e.stopPropagation();
                    }}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors touch-manipulation ${
                        isActive
                          ? 'bg-feather-blue text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white active:bg-gray-600'
                      }`
                    }
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
