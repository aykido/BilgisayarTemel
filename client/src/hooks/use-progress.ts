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
      
      // Check for completed modules to unlock next modules
      const completedModuleIds = new Set<string>();
      
      progressData.forEach((item: any) => {
        // Update module progress
        if (!moduleProgress[item.moduleId]) {
          moduleProgress[item.moduleId] = {
            completed: false,
            percentage: getModuleProgress(item.moduleId),
            lastAccessedLesson: item.lessonId
          };
        }
        
        // Update lesson progress
        lessonProgress[item.lessonId] = {
          completed: item.completed,
          lastAccessed: item.lastAccessed,
          quizScore: item.quizScore
        };
        
        // Check if this is a lesson from a module that might be completed
        if (item.completed) {
          const module = getModuleById(item.moduleId);
          if (module) {
            // Check if this is the last lesson in the module
            const lastLesson = module.lessons[module.lessons.length - 1];
            if (lastLesson && lastLesson.id === item.lessonId) {
              completedModuleIds.add(item.moduleId);
            }
          }
        }
      });
      
      // Unlock modules based on completed previous modules
      completedModuleIds.forEach(completedModuleId => {
        const completedModuleIndex = courseData.findIndex(m => m.id === completedModuleId);
        if (completedModuleIndex >= 0 && completedModuleIndex < courseData.length - 1) {
          // Unlock the next module
          const nextModule = courseData[completedModuleIndex + 1];
          if (nextModule) {
            nextModule.isLocked = false;
            console.log(`Unlocked module based on progress: ${nextModule.title}`);
          }
        }
      });
      
      setUserProgress({
        moduleProgress,
        lessonProgress,
        overallProgress: getOverallProgress()
      });
    }
  }, [progressData]);

  // Function to mark a lesson as completed
  const completeLesson = (moduleId: string, lessonId: string) => {
    updateProgress({ moduleId, lessonId, completed: true });
    
    // Also update the local state for immediate UI feedback
    setUserProgress(prev => {
      const updatedLessonProgress = {
        ...prev.lessonProgress,
        [lessonId]: {
          ...prev.lessonProgress[lessonId],
          completed: true,
          lastAccessed: new Date().toISOString()
        }
      };
      
      const modulePercentage = getModuleProgress(moduleId);
      
      return {
        ...prev,
        lessonProgress: updatedLessonProgress,
        moduleProgress: {
          ...prev.moduleProgress,
          [moduleId]: {
            ...prev.moduleProgress[moduleId],
            percentage: modulePercentage,
            lastAccessedLesson: lessonId
          }
        },
        overallProgress: getOverallProgress()
      };
    });
  };

  // Function to submit a quiz result and unlock next module
  const submitQuizResult = (moduleId: string, lessonId: string, score: number, totalQuestions: number) => {
    saveQuizResult({ moduleId, lessonId, score, totalQuestions });
    
    // Also update the local state for immediate UI feedback
    setUserProgress(prev => {
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
      
      // Check if this was the last lesson in the module
      const currentModule = getModuleById(moduleId);
      if (currentModule) {
        const lastLessonInModule = currentModule.lessons[currentModule.lessons.length - 1];
        
        // If this was the last lesson, unlock the next module
        if (lastLessonInModule && lastLessonInModule.id === lessonId) {
          // Find the next module
          const currentModuleIndex = courseData.findIndex(m => m.id === moduleId);
          if (currentModuleIndex >= 0 && currentModuleIndex < courseData.length - 1) {
            // Unlock the next module
            const nextModule = courseData[currentModuleIndex + 1];
            if (nextModule) {
              nextModule.isLocked = false;
              console.log(`Unlocked next module: ${nextModule.title}`);
            }
          }
        }
      }
      
      return {
        ...prev,
        lessonProgress: updatedLessonProgress,
        overallProgress: getOverallProgress()
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
