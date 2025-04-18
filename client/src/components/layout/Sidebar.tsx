import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { courseData } from "@/lib/data";
import useProgress from "@/hooks/use-progress";
import { Module } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

interface SidebarProps {
  isMobileOpen: boolean;
  onToggleMobile: () => void;
}

export function Sidebar({ isMobileOpen, onToggleMobile }: SidebarProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [location, navigate] = useLocation();
  const { overallProgress } = useProgress();
  
  // API'den modül kilit durumlarını al ve client-side'daki data ile senkronize et
  const { data: moduleUnlocks } = useQuery({
    queryKey: ['/api/module-unlocks'],
    refetchOnWindowFocus: true,
    refetchInterval: 5000  // Her 5 saniyede bir yenile
  });
  
  // TÜM MODÜLLER AÇIK - kilit kullanmıyoruz
  useEffect(() => {
    // Tüm modüllerin kilidini aç
    courseData.forEach(module => {
      module.isLocked = false;
    });
    console.log("Tüm modüllerin kilidi açıldı - öğrenciler istediği modülden başlayabilir");
  }, []);
  
  // Aktif modülleri otomatik genişlet
  useEffect(() => {
    if (location) {
      const match = location.match(/\/modul\/([^\/]+)/);
      if (match && match[1]) {
        const activeModuleId = match[1];
        if (!expandedModules.includes(activeModuleId)) {
          setExpandedModules(prev => [...prev, activeModuleId]);
        }
      }
    }
  }, [location]);
  
  const toggleModule = (moduleId: string, isLocked: boolean) => {
    // Tüm modüller açık, kilitli kontrolü yapmıyoruz
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId) 
        : [...prev, moduleId]
    );
  };
  
  const isModuleActive = (moduleId: string) => location.includes(`/modul/${moduleId}`);
  const isLessonActive = (lessonId: string) => location.includes(`/ders/${lessonId}`);
  
  return (
    <div className={`bg-white shadow-lg md:w-72 lg:w-80 flex-shrink-0 md:h-screen border-r border-neutral-100 z-10 ${isMobileOpen ? "fixed inset-0 overflow-auto" : "hidden md:block"}`}>
      <div className="p-4 bg-primary flex items-center justify-between">
        <a href="/" className="flex items-center text-white no-underline">
          <span className="material-icons mr-2">computer</span>
          <div className="logo-text">
            <div className="text-lg font-bold leading-tight">Bilgisayar İşletmenliği</div>
            <div className="text-sm font-medium leading-tight">Operatörlüğü</div>
          </div>
        </a>
        <button onClick={onToggleMobile} className="md:hidden text-white">
          <span className="material-icons">close</span>
        </button>
      </div>
      
      <div className="md:h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar">
        <div className="p-4 mb-2">
          <p className="text-sm text-neutral-600 font-medium">Ders Modülleri</p>
        </div>
        
        <nav className="course-navigation px-2">
          {courseData.map((module: Module) => (
            <div key={module.id} className="module-item mb-1">
              <div 
                className={`flex items-center px-3 py-2 rounded-md hover:bg-neutral-100 cursor-pointer transition-colors module-header ${isModuleActive(module.id) ? "bg-neutral-100" : ""}`}
                onClick={() => toggleModule(module.id, false)}
              >
                <span className="material-icons mr-2 text-primary">
                  {module.icon}
                </span>
                <span className="font-medium">
                  {module.title}
                </span>
                <span 
                  className={`material-icons ml-auto transform transition-transform ${expandedModules.includes(module.id) ? "rotate-180" : ""}`}
                >
                  expand_more
                </span>
              </div>
              
              {expandedModules.includes(module.id) && (
                <div className="module-content pl-10 pr-3 py-1 max-w-full">
                  <ul className="space-y-1">
                    {module.lessons.map((lesson) => (
                      <li 
                        key={lesson.id}
                        className={`py-1.5 text-sm flex items-center hover:text-primary cursor-pointer ${isLessonActive(lesson.id) ? "bg-neutral-100 rounded-md px-2 border-l-2 border-primary" : ""}`}
                        onClick={() => {
                          navigate(`/modul/${module.id}/ders/${lesson.id}`);
                          if (isMobileOpen) {
                            onToggleMobile();
                          }
                        }}
                      >
                        <span className={`material-icons mr-2 text-sm ${
                          isLessonActive(lesson.id) 
                            ? "text-primary" 
                            : "text-neutral-400"
                        }`}>
                          {isLessonActive(lesson.id) 
                            ? "play_circle" 
                            : "article"
                          }
                        </span>
                        <span className={`${
                          isLessonActive(lesson.id) 
                            ? "text-primary font-medium" 
                            : "text-neutral-600"
                        } truncate`}>
                          {lesson.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>
        
        <div className="p-4 border-t border-neutral-100 mt-3">
          <div className="bg-neutral-50 p-3 rounded-lg">
            <h3 className="text-sm font-semibold text-neutral-800 mb-2">Yardıma mı ihtiyacın var?</h3>
            <p className="text-xs text-neutral-600 mb-3">Soruların için eğitmenle iletişime geçebilirsin.</p>
            <a href="mailto:aykutbozalan@gmail.com" className="block w-full px-3 py-1.5 bg-primary text-white rounded text-sm font-medium hover:bg-primary/90 transition-colors text-center">İletişime Geç</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
