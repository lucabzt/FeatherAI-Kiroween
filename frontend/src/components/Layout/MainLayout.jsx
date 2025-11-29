import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import BackgroundAccents from '../BackgroundAccents';

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden">
      <BackgroundAccents />
      
      <div className="relative z-10">
        <Header onMenuToggle={toggleSidebar} />
        
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
          
          {/* Main content area */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 md:ml-64 pt-20">
            <Outlet />
          </main>
        </div>
      </div>
      
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={closeSidebar}
          onTouchEnd={closeSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default MainLayout;
