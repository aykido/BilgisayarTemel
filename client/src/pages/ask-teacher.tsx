import { Layout } from "@/components/layout/Layout";
import { Sidebar } from "@/components/layout/Sidebar";
import { IQtAITeacher } from "@/components/IQtAITeacher";
import { useState } from "react";

export default function AskTeacherPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Layout>
      <div className="flex h-screen overflow-hidden">
        <Sidebar 
          isMobileOpen={isSidebarOpen} 
          onToggleMobile={() => setSidebarOpen(false)} 
        />
        
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <div className="flex-1 px-4 py-8 md:p-10">
            <header className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                IQt AI Öğretmene Sor
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Yapay zeka destekli öğretmenimize bilgisayar ve Office uygulamaları ile ilgili sorularınızı sorabilirsiniz.
              </p>
            </header>
            
            <IQtAITeacher />
          </div>
        </div>
      </div>
    </Layout>
  );
}