import { Link } from "wouter";

interface NavigationControlsProps {
  previousLesson?: {
    moduleId: string;
    lessonId: string;
    title: string;
  } | null;
  nextLesson?: {
    moduleId: string;
    lessonId: string;
    title: string;
  } | null;
  showQuiz?: boolean;
  onStartQuiz?: () => void;
}

export function NavigationControls({ previousLesson, nextLesson, showQuiz = false, onStartQuiz }: NavigationControlsProps) {
  return (
    <div className="flex justify-between mt-4 mb-8">
      {previousLesson ? (
        <Link href={`/modul/${previousLesson.moduleId}/ders/${previousLesson.lessonId}`}>
          <a className="flex items-center px-4 py-2 bg-white border border-neutral-200 rounded-md text-neutral-700 hover:bg-neutral-50 transition-colors">
            <span className="material-icons mr-1 text-sm">arrow_back</span>
            <span>Önceki: {previousLesson.title}</span>
          </a>
        </Link>
      ) : (
        <div></div>
      )}
      
      {showQuiz ? (
        <button 
          onClick={onStartQuiz}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          <span>Quize Başla</span>
          <span className="material-icons ml-1 text-sm">quiz</span>
        </button>
      ) : nextLesson ? (
        <Link href={`/modul/${nextLesson.moduleId}/ders/${nextLesson.lessonId}`}>
          <a className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
            <span>Sonraki: {nextLesson.title}</span>
            <span className="material-icons ml-1 text-sm">arrow_forward</span>
          </a>
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default NavigationControls;
