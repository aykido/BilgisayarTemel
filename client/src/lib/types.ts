export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  isLocked: boolean;
  icon: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  moduleId: string;
  order: number;
  duration: number;
  isComplete: boolean;
  content: LessonContent;
}

export interface LessonContent {
  sections: ContentSection[];
  exercises: Exercise[];
  quiz: Quiz | null;
}

export interface ContentSection {
  type: "heading" | "paragraph" | "list" | "image" | "table" | "card" | "info";
  title?: string;
  content: string | string[] | TableData | CardData[] | InfoData;
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface CardData {
  icon: string;
  title: string;
  description: string;
}

export interface InfoData {
  icon: string;
  title: string;
  description: string;
}

export interface Exercise {
  id: string;
  type: "matching" | "multiplechoice" | "fillblank";
  title: string;
  description: string;
  items: ExerciseItem[];
}

export interface ExerciseItem {
  id: string;
  question: string;
  answer: string;
  options?: string[];
  correctAnswer?: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface UserProgressData {
  moduleProgress: {
    [moduleId: string]: {
      completed: boolean;
      percentage: number;
      lastAccessedLesson: string;
    }
  };
  lessonProgress: {
    [lessonId: string]: {
      completed: boolean;
      lastAccessed: string;
      quizScore?: number;
    }
  };
  overallProgress: number;
}
