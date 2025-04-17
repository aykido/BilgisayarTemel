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
      
      <div className="flex-grow overflow-y-auto">
        {children}
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
