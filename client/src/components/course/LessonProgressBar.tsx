import { Module } from "@/lib/types";

interface LessonProgressBarProps {
  module: Module;
  currentLessonId: string;
}

export function LessonProgressBar({ module, currentLessonId }: LessonProgressBarProps) {
  // Find current lesson index
  const currentIndex = module.lessons.findIndex(lesson => lesson.id === currentLessonId);
  
  // Calculate progress percentage
  const progressPercentage = ((currentIndex + 1) / module.lessons.length) * 100;
  
  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-neutral-800">Ders İlerlemen</h3>
        <span className="text-sm text-primary font-medium">
          {currentIndex + 1}/{module.lessons.length} tamamlandı
        </span>
      </div>
      <div className="relative h-2 bg-neutral-100 rounded-full overflow-hidden">
        <div 
          className="progress-bar absolute top-0 left-0 h-full bg-primary" 
          style={{ "--progress-width": `${progressPercentage}%` } as React.CSSProperties}
        ></div>
      </div>
      <div className="flex justify-between mt-2 text-xs text-neutral-500">
        {module.lessons.map((lesson, index) => (
          <span key={lesson.id} className={`${currentIndex === index ? "font-medium text-primary" : ""}`}>
            {index === 0 || index === currentIndex || index === module.lessons.length - 1 
              ? lesson.title.substring(0, 12) + (lesson.title.length > 12 ? "..." : "") 
              : ""
            }
          </span>
        ))}
      </div>
    </div>
  );
}

export default LessonProgressBar;
