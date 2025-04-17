import { Lesson } from "@/lib/types";

interface TopBarProps {
  lesson: Lesson;
  moduleName: string;
  onToggleSidebar: () => void;
}

export function TopBar({ lesson, moduleName, onToggleSidebar }: TopBarProps) {
  return (
    <div className="bg-white shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center">
        <button onClick={onToggleSidebar} className="md:hidden mr-3">
          <span className="material-icons text-neutral-600">menu</span>
        </button>
        <div>
          <h2 className="text-lg font-bold text-neutral-800">{lesson.title}</h2>
          <p className="text-sm text-neutral-500">{moduleName}</p>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="hidden md:flex items-center mr-4">
          <span className="material-icons text-success mr-1">timer</span>
          <span className="text-sm text-neutral-600">{lesson.duration} dakika</span>
        </div>
        <div className="relative">
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
            <span className="material-icons text-sm">person</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
