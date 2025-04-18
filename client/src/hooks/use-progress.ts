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

  // API verilerini sorgula
  const { data: moduleUnlocks } = useQuery({
    queryKey: ['/api/module-unlocks'],
    staleTime: 5 * 60 * 1000, // 5 dakika
  });
  
  // Process the data from the server to update the local state
  useEffect(() => {
    if (progressData && Array.isArray(progressData)) {
      const moduleProgress: UserProgressData['moduleProgress'] = {};
      const lessonProgress: UserProgressData['lessonProgress'] = {};
      
      // Önce tüm modülleri kilitli varsay, sonra kilit durumlarını güncelle
      courseData.forEach((module, index) => {
        if (index === 0) {
          module.isLocked = false; // İlk modül her zaman açık
        } else {
          module.isLocked = true; // Diğer modülleri varsayılan olarak kilitle
        }
      });
      
      // Eğer veritabanından modül kilitleri varsa, bunları kullan
      if (moduleUnlocks && Array.isArray(moduleUnlocks) && moduleUnlocks.length > 0) {
        // Kilidini açtığımız modülleri işaretle
        moduleUnlocks.forEach((unlock: any) => {
          if (unlock.isUnlocked) {
            const moduleToUnlock = courseData.find(m => m.id === unlock.moduleId);
            if (moduleToUnlock) {
              moduleToUnlock.isLocked = false;
              console.log(`Unlocked module from DB: ${moduleToUnlock.title}`);
            }
          }
        });
      } else {
        // Veritabanı yoksa, tamamlanan derslere göre kilit durumunu belirle
        // Tamamlanan dersler için modül takibi
        const completedLessonsByModule = new Map<string, Set<string>>();
        
        progressData.forEach((item: any) => {
          // Tamamlanan dersleri modül bazında grupla
          if (item.completed) {
            if (!completedLessonsByModule.has(item.moduleId)) {
              completedLessonsByModule.set(item.moduleId, new Set<string>());
            }
            completedLessonsByModule.get(item.moduleId)?.add(item.lessonId);
          }
        });
        
        // Her modül için tamamlanma durumunu kontrol et ve gerekirse sonraki modülü aç
        for (let i = 0; i < courseData.length; i++) {
          const module = courseData[i];
          const moduleCompletedLessons = completedLessonsByModule.get(module.id);
          
          // Modüldeki tüm dersler tamamlandı mı?
          const totalLessons = module.lessons.length;
          const completedCount = moduleCompletedLessons ? moduleCompletedLessons.size : 0;
          
          // Eğer modül tamamlandıysa, sonraki modülü aç
          if (completedCount === totalLessons && totalLessons > 0 && i < courseData.length - 1) {
            courseData[i + 1].isLocked = false;
            console.log(`Unlocked next module based on lesson completion: ${courseData[i + 1].title}`);
          }
        }
      }
      
      // Tamamlanan dersleri işaretle ve ilerleme bilgilerini güncelle
      progressData.forEach((item: any) => {
        // Ders tamamlanma durumunu veri modelinde güncelle
        if (item.completed) {
          const module = getModuleById(item.moduleId);
          if (module) {
            const lesson = module.lessons.find(l => l.id === item.lessonId);
            if (lesson) {
              lesson.isComplete = true;
            }
          }
        }
        
        // Ders ilerleme bilgilerini güncelle
        lessonProgress[item.lessonId] = {
          completed: item.completed,
          lastAccessed: item.lastAccessed,
          quizScore: item.quizScore
        };
      });
      
      // Her modül için ilerleme yüzdesini hesapla
      courseData.forEach(module => {
        const totalLessons = module.lessons.length;
        const completedLessons = module.lessons.filter(l => l.isComplete).length;
        const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
        
        moduleProgress[module.id] = {
          completed: completedLessons === totalLessons && totalLessons > 0,
          percentage: percentage,
          lastAccessedLesson: module.lessons.length > 0 ? module.lessons[0].id : ''
        };
      });
      
      // Genel ilerleme bilgilerini güncelle
      setUserProgress({
        moduleProgress,
        lessonProgress,
        overallProgress: getOverallProgress() // Güncellenmiş isComplete değerleriyle hesaplanır
      });
    }
  }, [progressData, moduleUnlocks]);

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
    // Önce API'ye quiz sonucunu gönder
    saveQuizResult({ moduleId, lessonId, score, totalQuestions });
    
    // Yerel durum için de güncelleme yap
    setUserProgress(prev => {
      // Veritabanındaki güncellemeler için kritik olan noktalar:
      console.log(`Quiz completed for module: ${moduleId}, lesson: ${lessonId}`);
      
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
      
      // Tüm dersler tamamlandıysa, modül tamamlandı olarak işaretle
      // ve bir sonraki modül kilidini aç - NOT: Asıl kilit açma veritabanında gerçekleşecek
      if (allLessonsCompleted) {
        console.log(`All lessons completed in module: ${moduleId}`);
        
        // Bir sonraki modülü bul ve kilitli değilse göster
        const currentModuleIndex = courseData.findIndex(m => m.id === moduleId);
        if (currentModuleIndex >= 0 && currentModuleIndex < courseData.length - 1) {
          // Bu, UI'da modülü hemen erişilebilir göstermek için
          // Asıl kilit açma sunucuda gerçekleşecek, refresh'te de gösterilecek
          const nextModule = courseData[currentModuleIndex + 1];
          nextModule.isLocked = false;
          console.log(`Unlocked next module: ${nextModule.title}`);
          
          // API'ye modül kilidini açma isteği gönder
          const unlockNextModule = async () => {
            try {
              const response = await fetch('/api/module-unlock', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ moduleId: nextModule.id })
              });
              
              if (response.ok) {
                console.log(`Successfully unlocked module ${nextModule.id} in the session`);
                
                // Modül kilit durumunu yenile
                queryClient.invalidateQueries({ queryKey: ['/api/module-unlocks'] });
                
                // Kullanıcıyı bir sonraki modülün ilk dersine yönlendir
                // Quiz durumundan kurtulması için bunu biraz gecikmeli olarak yap
                if (nextModule.lessons.length > 0) {
                  const nextModuleFirstLesson = nextModule.lessons[0];
                  console.log(`Navigating to next module's first lesson: ${nextModuleFirstLesson.id}`);
                  setTimeout(() => {
                    window.location.href = `/modul/${nextModule.id}/ders/${nextModuleFirstLesson.id}`;
                  }, 2000); // 2 saniye bekle
                }
              }
            } catch (error) {
              console.error("Error unlocking next module:", error);
            }
          };
          
          // API çağrısını başlat
          unlockNextModule();
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
