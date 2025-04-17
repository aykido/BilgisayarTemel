import { useState } from "react";
import { useLocation } from "wouter";
import { courseData } from "@/lib/data";
import useProgress from "@/hooks/use-progress";
import { Module } from "@/lib/types";

interface SidebarProps {
  isMobileOpen: boolean;
  onToggleMobile: () => void;
}

export function Sidebar({ isMobileOpen, onToggleMobile }: SidebarProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [location, navigate] = useLocation();
  const { overallProgress } = useProgress();
  
  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId) 
        : [...prev, moduleId]
    );
  };
  
  const isModuleActive = (moduleId: string) => location.includes(`/modul/${moduleId}`);
  const isLessonActive = (lessonId: string) => location.includes(`/ders/${lessonId}`);
  
  return (
    <div className={`bg-white shadow-lg md:w-72 lg:w-80 flex-shrink-0 md:h-screen overflow-hidden border-r border-neutral-100 z-10 ${isMobileOpen ? "fixed inset-0" : "hidden md:block"}`}>
      <div className="p-4 bg-primary flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Bilgisayar Operatör Eğitimi</h1>
        <button onClick={onToggleMobile} className="md:hidden text-white">
          <span className="material-icons">close</span>
        </button>
      </div>
      
      <div className="h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar">
        <div className="p-4">
          <div className="relative rounded-full overflow-hidden h-4 bg-neutral-100 mb-2">
            <div className="progress-bar absolute top-0 left-0 h-full bg-success rounded-full" style={{"--progress-width": `${overallProgress}%`} as React.CSSProperties}></div>
          </div>
          <p className="text-sm text-neutral-600 mb-4">Genel İlerleme: %{overallProgress}</p>
        </div>
        
        <nav className="course-navigation px-2">
          {courseData.map((module: Module) => (
            <div key={module.id} className="module-item mb-1">
              <div 
                className={`flex items-center px-3 py-2 rounded-md hover:bg-neutral-100 cursor-pointer transition-colors module-header ${isModuleActive(module.id) ? "bg-neutral-100" : ""}`}
                onClick={() => toggleModule(module.id)}
              >
                <span className={`material-icons mr-2 ${module.isLocked ? "text-neutral-400" : "text-primary"}`}>
                  {module.icon}
                </span>
                <span className={`font-medium ${module.isLocked ? "text-neutral-400" : ""}`}>
                  {module.title}
                </span>
                <span 
                  className={`material-icons ml-auto transform transition-transform ${expandedModules.includes(module.id) ? "rotate-180" : ""}`}
                >
                  expand_more
                </span>
              </div>
              
              {!module.isLocked && expandedModules.includes(module.id) && (
                <div className="module-content pl-10 pr-3 py-1">
                  <ul className="space-y-1">
                    {module.lessons.map((lesson) => (
                      <li 
                        key={lesson.id}
                        className={`py-1.5 text-sm flex items-center ${isLessonActive(lesson.id) ? "bg-neutral-100 rounded-md px-2 border-l-2 border-primary" : ""}`}
                        onClick={() => navigate(`/modul/${module.id}/ders/${lesson.id}`)}
                      >
                        <span className={`material-icons mr-2 text-sm ${
                          lesson.isComplete 
                            ? "text-success" 
                            : isLessonActive(lesson.id) 
                              ? "text-primary" 
                              : "text-neutral-300"
                        }`}>
                          {lesson.isComplete 
                            ? "check_circle" 
                            : isLessonActive(lesson.id) 
                              ? "play_circle" 
                              : "radio_button_unchecked"
                          }
                        </span>
                        <span className={`${
                          isLessonActive(lesson.id) 
                            ? "text-primary font-medium" 
                            : lesson.isComplete 
                              ? "text-neutral-800" 
                              : "text-neutral-400"
                        }`}>
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
            <button className="w-full px-3 py-1.5 bg-primary text-white rounded text-sm font-medium hover:bg-primary/90 transition-colors">İletişime Geç</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
