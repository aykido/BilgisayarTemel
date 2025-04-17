import { useState } from "react";
import { useRoute } from "wouter";
import Layout from "@/components/layout/Layout";
import TopBar from "@/components/layout/TopBar";
import LessonProgressBar from "@/components/course/LessonProgressBar";
import LessonContent from "@/components/course/LessonContent";
import InteractiveExercise from "@/components/course/InteractiveExercise";
import NavigationControls from "@/components/course/NavigationControls";
import Quiz from "@/components/course/Quiz";
import { getModuleById, getLessonById, getNextLesson, getPreviousLesson } from "@/lib/data";
import useProgress from "@/hooks/use-progress";
import { useToast } from "@/hooks/use-toast";

export default function Lesson() {
  const [, params] = useRoute("/modul/:moduleId/ders/:lessonId");
  const [showQuiz, setShowQuiz] = useState(false);
  const { completeLesson, submitQuizResult } = useProgress();
  const { toast } = useToast();
  
  if (!params) {
    return <div>Ders bulunamadı</div>;
  }
  
  const { moduleId, lessonId } = params;
  const module = getModuleById(moduleId);
  const lesson = getLessonById(moduleId, lessonId);
  
  if (!module || !lesson) {
    return <div>Ders bulunamadı</div>;
  }
  
  const nextLesson = getNextLesson(moduleId, lessonId);
  const previousLesson = getPreviousLesson(moduleId, lessonId);
  
  const handleExerciseComplete = () => {
    completeLesson(moduleId, lessonId);
    toast({
      title: "Alıştırma Tamamlandı!",
      description: "Bir sonraki derse geçebilirsiniz.",
    });
  };
  
  const handleQuizComplete = (score: number, total: number) => {
    submitQuizResult(moduleId, lessonId, score, total);
    completeLesson(moduleId, lessonId);
    
    toast({
      title: "Quiz Tamamlandı!",
      description: `Skorunuz: ${score}/${total}`,
    });
  };
  
  const handleToggleSidebar = () => {
    // This is handled by the Layout component
  };
  
  const handleStartQuiz = () => {
    setShowQuiz(true);
  };
  
  return (
    <Layout>
      <TopBar lesson={lesson} moduleName={module.title} onToggleSidebar={handleToggleSidebar} />
      
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        {!showQuiz ? (
          <>
            <LessonProgressBar module={module} currentLessonId={lessonId} />
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-6">
                <LessonContent sections={lesson.content.sections} />
              </div>
              
              {lesson.content.exercises.length > 0 && (
                <InteractiveExercise 
                  exercise={lesson.content.exercises[0]} 
                  onComplete={handleExerciseComplete} 
                />
              )}
            </div>
            
            <NavigationControls 
              previousLesson={previousLesson} 
              nextLesson={nextLesson}
              showQuiz={!!lesson.content.quiz && !showQuiz} 
              onStartQuiz={handleStartQuiz}
            />
          </>
        ) : (
          lesson.content.quiz && (
            <Quiz 
              quiz={lesson.content.quiz} 
              onComplete={handleQuizComplete}
              onBack={() => setShowQuiz(false)}
            />
          )
        )}
      </div>
    </Layout>
  );
}
