import { useState, useEffect } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getModuleById, getLessonById, getModuleProgress, getOverallProgress, courseData } from "@/lib/data";
import { UserProgressData } from "@/lib/types";

export function useProgress() {
  const [userProgress, setUserProgress] = useState<UserProgressData>({
    moduleProgress: {},
    lessonProgress: {},
    overallProgress: 0
  });

  // Fetch the user's progress from the server
  const { data: progressData, isLoading } = useQuery({
    queryKey: ['/api/progress'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Update progress mutation
  const { mutate: updateProgress } = useMutation({
    mutationFn: async (data: { moduleId: string, lessonId: string, completed: boolean }) => {
      return apiRequest('POST', '/api/progress', {
        ...data,
        lastAccessed: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      // Invalidate the progress query to refetch the latest data
      queryClient.invalidateQueries({ queryKey: ['/api/progress'] });
    },
  });

  // Save quiz result mutation
  const { mutate: saveQuizResult } = useMutation({
    mutationFn: async (data: { 
      moduleId: string, 
      lessonId: string, 
      score: number, 
      totalQuestions: number 
    }) => {
      return apiRequest('POST', '/api/quiz/result', {
        ...data,
        completedAt: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/progress'] });
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/results'] });
    },
  });

  // Process the data from the server to update the local state
  useEffect(() => {
    if (progressData && Array.isArray(progressData)) {
      const moduleProgress: UserProgressData['moduleProgress'] = {};
      const lessonProgress: UserProgressData['lessonProgress'] = {};
      
      // Start by locking all modules except the first one
      courseData.forEach((module, index) => {
        if (index === 0) {
          module.isLocked = false; // First module is always unlocked
        } else {
          module.isLocked = true; // Lock all other modules by default
        }
      });
      
      // Process all completed lessons
      const completedLessonsByModule = new Map<string, Set<string>>();
      
      progressData.forEach((item: any) => {
        // Track completed lessons for each module
        if (item.completed) {
          if (!completedLessonsByModule.has(item.moduleId)) {
            completedLessonsByModule.set(item.moduleId, new Set<string>());
          }
          completedLessonsByModule.get(item.moduleId)?.add(item.lessonId);
          
          // Update completed status in the actual data model
          const module = getModuleById(item.moduleId);
          if (module) {
            const lesson = module.lessons.find(l => l.id === item.lessonId);
            if (lesson) {
              lesson.isComplete = true;
            }
          }
        }
        
        // Update lesson progress
        lessonProgress[item.lessonId] = {
          completed: item.completed,
          lastAccessed: item.lastAccessed,
          quizScore: item.quizScore
        };
      });
      
      // Check if each module is completed and update its status
      for (let i = 0; i < courseData.length; i++) {
        const module = courseData[i];
        const moduleCompletedLessons = completedLessonsByModule.get(module.id);
        
        // Calculate how many lessons are completed in this module
        const totalLessons = module.lessons.length;
        const completedCount = moduleCompletedLessons ? moduleCompletedLessons.size : 0;
        const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
        
        // Update module progress
        moduleProgress[module.id] = {
          completed: completedCount === totalLessons,
          percentage: percentage,
          lastAccessedLesson: module.lessons.length > 0 ? module.lessons[0].id : ''
        };
        
        // If this module is completed, unlock the next module
        if (completedCount === totalLessons && i < courseData.length - 1) {
          courseData[i + 1].isLocked = false;
          console.log(`Unlocked next module: ${courseData[i + 1].title}`);
        }
      }
      
      setUserProgress({
        moduleProgress,
        lessonProgress,
        overallProgress: getOverallProgress() // Will recalculate with updated isComplete values
      });
    }
  }, [progressData]);

  // Function to mark a lesson as completed
  const completeLesson = (moduleId: string, lessonId: string) => {
    updateProgress({ moduleId, lessonId, completed: true });
    
    // Also update the local state for immediate UI feedback
    setUserProgress(prev => {
      // Update lesson completion status in the data model
      const module = getModuleById(moduleId);
      if (module) {
        const lesson = module.lessons.find(l => l.id === lessonId);
        if (lesson) {
          lesson.isComplete = true;
        }
      }
      
      const updatedLessonProgress = {
        ...prev.lessonProgress,
        [lessonId]: {
          ...prev.lessonProgress[lessonId],
          completed: true,
          lastAccessed: new Date().toISOString()
        }
      };
      
      // Recalculate module percentage with the updated lesson completion status
      const modulePercentage = getModuleProgress(moduleId);
      
      // Check if the module is now completed
      const allLessonsCompleted = module?.lessons.every(lesson => lesson.isComplete) || false;
      
      // If module is completed, unlock the next module
      if (allLessonsCompleted) {
        const currentModuleIndex = courseData.findIndex(m => m.id === moduleId);
        if (currentModuleIndex >= 0 && currentModuleIndex < courseData.length - 1) {
          courseData[currentModuleIndex + 1].isLocked = false;
          console.log(`Unlocked next module: ${courseData[currentModuleIndex + 1].title}`);
        }
      }
      
      return {
        ...prev,
        lessonProgress: updatedLessonProgress,
        moduleProgress: {
          ...prev.moduleProgress,
          [moduleId]: {
            ...prev.moduleProgress[moduleId],
            completed: allLessonsCompleted,
            percentage: modulePercentage,
            lastAccessedLesson: lessonId
          }
        },
        overallProgress: getOverallProgress() // Recalculate overall progress
      };
    });
  };

  // Function to submit a quiz result and unlock next module
  const submitQuizResult = (moduleId: string, lessonId: string, score: number, totalQuestions: number) => {
    saveQuizResult({ moduleId, lessonId, score, totalQuestions });
    
    // Also update the local state for immediate UI feedback
    setUserProgress(prev => {
      // Update lesson completion status in the data model
      const module = getModuleById(moduleId);
      if (module) {
        const lesson = module.lessons.find(l => l.id === lessonId);
        if (lesson) {
          lesson.isComplete = true;
        }
      }
      
      // Mark the lesson as completed
      const updatedLessonProgress = {
        ...prev.lessonProgress,
        [lessonId]: {
          ...prev.lessonProgress[lessonId],
          completed: true,
          lastAccessed: new Date().toISOString(),
          quizScore: score
        }
      };
      
      // Check if all lessons in the module are now completed
      const allLessonsCompleted = module?.lessons.every(lesson => lesson.isComplete) || false;
      
      // If module is completed, unlock the next module
      if (allLessonsCompleted) {
        const currentModuleIndex = courseData.findIndex(m => m.id === moduleId);
        if (currentModuleIndex >= 0 && currentModuleIndex < courseData.length - 1) {
          courseData[currentModuleIndex + 1].isLocked = false;
          console.log(`Unlocked next module: ${courseData[currentModuleIndex + 1].title}`);
        }
      }
      
      // Recalculate module percentage
      const modulePercentage = getModuleProgress(moduleId);
      
      return {
        ...prev,
        lessonProgress: updatedLessonProgress,
        moduleProgress: {
          ...prev.moduleProgress,
          [moduleId]: {
            ...prev.moduleProgress[moduleId],
            completed: allLessonsCompleted,
            percentage: modulePercentage,
            lastAccessedLesson: lessonId
          }
        },
        overallProgress: getOverallProgress() // Recalculate overall progress
      };
    });
  };

  // Function to check if a lesson is completed
  const isLessonCompleted = (lessonId: string): boolean => {
    return !!userProgress.lessonProgress[lessonId]?.completed;
  };

  // Function to get the progress for a specific module
  const getProgress = (moduleId: string): number => {
    return userProgress.moduleProgress[moduleId]?.percentage || 0;
  };

  return {
    userProgress,
    isLoading,
    completeLesson,
    submitQuizResult,
    isLessonCompleted,
    getProgress,
    overallProgress: userProgress.overallProgress
  };
}

export default useProgress;
