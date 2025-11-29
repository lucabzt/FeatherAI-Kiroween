import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-[#0a0a0b] relative overflow-hidden">
      {/* Background accent SVGs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <img
          src="/half-circle-svgrepo-com.svg"
          alt=""
          className="absolute top-20 right-0 w-96 h-96 opacity-5 transform rotate-45"
        />
        <img
          src="/logo-svgrepo-com.svg"
          alt=""
          className="absolute -bottom-50 right-40 w-96 h-96 opacity-5"
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
