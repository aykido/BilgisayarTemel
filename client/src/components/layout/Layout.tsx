import { useState } from "react";
import Sidebar from "./Sidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar isMobileOpen={isSidebarOpen} onToggleMobile={toggleSidebar} />
      
      <div className="flex-grow overflow-y-auto flex flex-col">
        <div className="flex-grow">
          {children}
        </div>
        
        {/* AI Öğretmen Footer Link - Mobil Erişim İçin */}
        <div className="py-4 border-t border-gray-200 flex justify-center">
          <a 
            href="/ogretmene-sor" 
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-3 rounded-full transition-all hover:shadow-lg transform hover:-translate-y-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9-9v18" />
            </svg>
            <span className="font-medium">IQt AI Öğretmen</span>
          </a>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default Layout;
