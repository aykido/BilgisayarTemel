import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserProgressSchema, insertQuizResultSchema, insertUserSchema } from "@shared/schema";
import { askAssistant, clearThread } from "./assistantService";

// Temporary function to create a mock user for development
const createOrGetMockUser = async () => {
  try {
    let user = await storage.getUserByUsername("demo");
    if (!user) {
      user = await storage.createUser({
        username: "demo",
        password: "demo123"
      });
    }
    return user;
  } catch (error) {
    console.error("Mock user creation error:", error);
    return null;
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/user/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Kullanıcı adı zaten alınmış" });
      }
      
      const user = await storage.createUser(userData);
      return res.status(201).json({ id: user.id, username: user.username });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Geçersiz kullanıcı verileri", errors: error.errors });
      }
      return res.status(500).json({ message: "Sunucu hatası" });
    }
  });
  
  app.post("/api/user/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Geçersiz kullanıcı adı veya şifre" });
      }
      
      req.session.userId = user.id;
      return res.status(200).json({ id: user.id, username: user.username });
    } catch (error) {
      return res.status(500).json({ message: "Sunucu hatası" });
    }
  });
  
  // Progress tracking routes - Session temelli
  app.get("/api/progress", async (req: Request, res: Response) => {
    try {
      // Oturum yoksa veya ilerleme kaydı yoksa boş dizi döndür
      if (!req.session || !req.session.progress) {
        req.session.progress = [];
      }
      
      // Mevcut oturumdaki ilerleme bilgilerini döndür
      return res.status(200).json(req.session.progress || []);
    } catch (error) {
      console.error("Progress API error:", error);
      return res.status(500).json({ message: "Sunucu hatası" });
    }
  });
  
  app.post("/api/progress", async (req: Request, res: Response) => {
    try {
      // Oturum yoksa oluştur
      if (!req.session.progress) {
        req.session.progress = [];
      }
      
      // İlerleme verilerini doğrula
      const progressData = insertUserProgressSchema.omit({ userId: true }).parse(req.body);
      
      // İlerleme kaydını oluştur (userId gereksiz, oturum bazlı çalışıyoruz)
      const newProgress = {
        id: Date.now(), // Benzersiz bir ID oluştur
        ...progressData,
        userId: 1       // Dummy değer, kullanılmayacak
      };
      
      console.log("Updating session progress:", newProgress);
      
      // Aynı modül ve ders için mevcut kaydı kontrol et
      const existingIndex = req.session.progress.findIndex((p: any) => 
        p.moduleId === progressData.moduleId && p.lessonId === progressData.lessonId
      );
      
      if (existingIndex >= 0) {
        // Var olan kaydı güncelle
        req.session.progress[existingIndex] = {
          ...req.session.progress[existingIndex],
          ...newProgress
        };
      } else {
        // Yeni kayıt ekle
        req.session.progress.push(newProgress);
      }
      
      // Modül tamamlanmış mı kontrol et
      checkAndUnlockNextModule(req, progressData.moduleId);
      
      return res.status(200).json(newProgress);
    } catch (error) {
      console.error("POST progress error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Geçersiz ilerleme verileri", errors: error.errors });
      }
      return res.status(500).json({ message: "Sunucu hatası" });
    }
  });
  
  // Quiz results routes
  // Quiz results routes - Session temelli
  app.post("/api/quiz/result", async (req: Request, res: Response) => {
    try {
      // Quiz verilerini doğrula (userId gereksiz, oturum bazlı çalışıyoruz)
      const quizData = insertQuizResultSchema.omit({ userId: true }).parse(req.body);
      
      // Session quizResults dizisini başlat
      if (!req.session.quizResults) {
        req.session.quizResults = [];
      }
      
      // Quiz sonucunu oluştur
      const result = {
        id: Date.now(),
        ...quizData,
        userId: 1, // Dummy değer, kullanılmayacak
        completedAt: quizData.completedAt || new Date().toISOString()
      };
      
      console.log("Saving quiz result to session:", result);
      
      // Quiz sonucunu kaydet
      req.session.quizResults.push(result);
      
      // Quiz sonucunu kullanıcı ilerlemesi olarak da kaydet
      // Bu, dersi tamamlanmış olarak işaretleyecek
      const progressData = {
        moduleId: quizData.moduleId,
        lessonId: quizData.lessonId,
        completed: true,
        lastAccessed: quizData.completedAt || new Date().toISOString()
      };
      
      // Aynı modül ve ders için mevcut kaydı kontrol et
      if (!req.session.progress) {
        req.session.progress = [];
      }
      
      const existingIndex = req.session.progress.findIndex((p: any) => 
        p.moduleId === progressData.moduleId && p.lessonId === progressData.lessonId
      );
      
      if (existingIndex >= 0) {
        // Var olan kaydı güncelle
        req.session.progress[existingIndex] = {
          ...req.session.progress[existingIndex],
          ...progressData
        };
      } else {
        // Yeni kayıt ekle
        req.session.progress.push({
          id: Date.now(),
          ...progressData,
          userId: 1 // Dummy değer
        });
      }
      
      // Modül tamamlandı mı kontrol et
      checkAndUnlockNextModule(req, quizData.moduleId);
      
      return res.status(200).json(result);
    } catch (error) {
      console.error("POST quiz result error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Geçersiz quiz verileri", errors: error.errors });
      }
      return res.status(500).json({ message: "Sunucu hatası" });
    }
  });
  
  app.get("/api/quiz/results", async (req: Request, res: Response) => {
    try {
      // Quiz sonuçlarını döndür
      if (!req.session.quizResults) {
        req.session.quizResults = [];
      }
      
      const moduleId = req.query.moduleId as string | undefined;
      
      // Eğer moduleId belirtilmişse, sadece o modüle ait sonuçları döndür
      const results = moduleId 
        ? req.session.quizResults.filter((quiz: any) => quiz.moduleId === moduleId)
        : req.session.quizResults;
      
      return res.status(200).json(results);
    } catch (error) {
      console.error("GET quiz results error:", error);
      return res.status(500).json({ message: "Sunucu hatası" });
    }
  });
  
  // Yardımcı fonksiyon - Modül tamamlanıp tamamlanmadığını kontrol et ve sonraki modülü aç
function checkAndUnlockNextModule(req: Request, moduleId: string): void {
  try {
    if (!req.session.progress) {
      req.session.progress = [];
    }
    
    // Modül kilit durumlarını başlat
    if (!req.session.moduleUnlocks) {
      req.session.moduleUnlocks = [
        { id: 1, moduleId: 'modul-1', isUnlocked: true, unlockedAt: new Date().toISOString() }
      ];
    }
    
    // Modül içindeki derslerin sayısı
    const lessonCounts: { [key: string]: number } = {
      'modul-1': 3,
      'modul-2': 3,
      'modul-3': 3,
      'modul-4': 3,
      'modul-5': 3,
      'modul-6': 3
    };
    
    // Tamamlanan dersleri say
    const moduleLessons = req.session.progress.filter((p: any) => p.moduleId === moduleId && p.completed);
    const completedLessons = moduleLessons.length;
    const totalLessons = lessonCounts[moduleId] || 0;
    
    console.log(`Module ${moduleId}: ${completedLessons}/${totalLessons} lessons completed (session)"`);
    
    // Tüm dersler tamamlanmışsa, sonraki modülü aç
    if (totalLessons > 0 && completedLessons >= totalLessons) {
      const nextModuleMap: { [key: string]: string } = {
        'modul-1': 'modul-2',
        'modul-2': 'modul-3',
        'modul-3': 'modul-4',
        'modul-4': 'modul-5',
        'modul-5': 'modul-6'
      };
      
      const nextModuleId = nextModuleMap[moduleId];
      
      if (nextModuleId) {
        // Modül zaten açık mı kontrol et
        const isAlreadyUnlocked = req.session.moduleUnlocks.some(
          (u: any) => u.moduleId === nextModuleId && u.isUnlocked
        );
        
        // Değilse, modülü aç
        if (!isAlreadyUnlocked) {
          req.session.moduleUnlocks.push({
            id: req.session.moduleUnlocks.length + 1,
            moduleId: nextModuleId,
            isUnlocked: true,
            unlockedAt: new Date().toISOString()
          });
          
          console.log(`*** UNLOCKED NEXT MODULE (session): ${nextModuleId} ***`);
        }
      }
    }
  } catch (error) {
    console.error("Error in checkAndUnlockNextModule:", error);
  }
}

// Modül kilit durumlarını getiren API - Session temelli
app.get("/api/module-unlocks", async (req: Request, res: Response) => {
  try {
    // Oturum yoksa veya kilit kaydı yoksa, varsayılan olarak 1. modülü aç
    if (!req.session.moduleUnlocks) {
      req.session.moduleUnlocks = [
        { id: 1, moduleId: 'modul-1', isUnlocked: true, unlockedAt: new Date().toISOString() }
      ];
    }
    
    return res.status(200).json(req.session.moduleUnlocks);
  } catch (error) {
    console.error("Module unlocks API error:", error);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
});

// Modül kilidini açan API - Session temelli
app.post("/api/module-unlock", async (req: Request, res: Response) => {
  try {
    const { moduleId } = req.body;
    if (!moduleId) {
      return res.status(400).json({ message: "Modül ID'si gerekli" });
    }
    
    // Modül kilit durumlarını başlat
    if (!req.session.moduleUnlocks) {
      req.session.moduleUnlocks = [
        { id: 1, moduleId: 'modul-1', isUnlocked: true, unlockedAt: new Date().toISOString() }
      ];
    }
    
    // Modül zaten açık mı kontrol et
    const existingIndex = req.session.moduleUnlocks.findIndex(
      (u: any) => u.moduleId === moduleId
    );
    
    let result;
    
    if (existingIndex >= 0) {
      // Var olan kaydı güncelle
      req.session.moduleUnlocks[existingIndex].isUnlocked = true;
      req.session.moduleUnlocks[existingIndex].unlockedAt = new Date().toISOString();
      result = req.session.moduleUnlocks[existingIndex];
    } else {
      // Yeni kilit kaydı oluştur
      result = {
        id: req.session.moduleUnlocks.length + 1,
        moduleId,
        isUnlocked: true,
        unlockedAt: new Date().toISOString()
      };
      req.session.moduleUnlocks.push(result);
    }
    
    console.log(`Unlocked module ${moduleId} (session)`);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Module unlock API error:", error);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
});

  // IQt AI Öğretmene Sor API Rotaları
  app.post("/api/assistant/ask", askAssistant);
  
  app.post("/api/assistant/clear", clearThread);

  console.log("Tüm API rotaları kaydedildi, IQt AI Öğretmene Sor özellikleri aktif");

  const httpServer = createServer(app);
  return httpServer;
}
