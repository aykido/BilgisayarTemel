import { useState } from "react";
import { useLocation } from "wouter";
import { Module } from "@/lib/types";

interface CourseNavigationProps {
  modules: Module[];
  activeModule?: string;
  activeLesson?: string;
}

export function CourseNavigation({ modules, activeModule, activeLesson }: CourseNavigationProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>(
    activeModule ? [activeModule] : []
  );
  const [, navigate] = useLocation();
  
  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId) 
        : [...prev, moduleId]
    );
  };
  
  return (
    <nav className="course-navigation">
      {modules.map(module => (
        <div key={module.id} className="module-item mb-1">
          <div 
            className={`flex items-center px-3 py-2 rounded-md hover:bg-neutral-100 cursor-pointer transition-colors module-header ${activeModule === module.id ? "bg-neutral-100" : ""}`}
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
          
          {expandedModules.includes(module.id) && !module.isLocked && (
            <div className="module-content pl-10 pr-3 py-1">
              <ul className="space-y-1">
                {module.lessons.map(lesson => (
                  <li 
                    key={lesson.id} 
                    className={`py-1.5 text-sm flex items-center ${activeLesson === lesson.id ? "bg-neutral-100 rounded-md px-2 border-l-2 border-primary" : ""}`}
                    onClick={() => navigate(`/modul/${module.id}/ders/${lesson.id}`)}
                  >
                    <span className={`material-icons mr-2 text-sm ${
                      lesson.isComplete 
                        ? "text-success" 
                        : activeLesson === lesson.id 
                          ? "text-primary" 
                          : "text-neutral-300"
                    }`}>
                      {lesson.isComplete 
                        ? "check_circle" 
                        : activeLesson === lesson.id 
                          ? "play_circle" 
                          : "radio_button_unchecked"
                      }
                    </span>
                    <span className={`${
                      activeLesson === lesson.id 
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
  );
}

export default CourseNavigation;
