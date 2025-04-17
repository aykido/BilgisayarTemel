import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserProgressSchema, insertQuizResultSchema, insertUserSchema } from "@shared/schema";

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
  
  // Progress tracking routes
  app.get("/api/progress", async (req: Request, res: Response) => {
    try {
      // In development, use a mock user for testing
      let userId = req.session.userId;
      if (!userId) {
        const mockUser = await createOrGetMockUser();
        if (mockUser) {
          userId = mockUser.id;
          req.session.userId = userId;
          console.log("Created mock user session for development:", userId);
        } else {
          return res.status(401).json({ message: "Oturum açmanız gerekiyor" });
        }
      }
      
      const progress = await storage.getUserProgress(userId);
      return res.status(200).json(progress);
    } catch (error) {
      console.error("Progress API error:", error);
      return res.status(500).json({ message: "Sunucu hatası" });
    }
  });
  
  app.post("/api/progress", async (req: Request, res: Response) => {
    try {
      // In development, use a mock user for testing
      let userId = req.session.userId;
      if (!userId) {
        const mockUser = await createOrGetMockUser();
        if (mockUser) {
          userId = mockUser.id;
          req.session.userId = userId;
          console.log("Created mock user session for development (POST progress):", userId);
        } else {
          return res.status(401).json({ message: "Oturum açmanız gerekiyor" });
        }
      }
      
      const progressData = insertUserProgressSchema.parse({
        ...req.body,
        userId
      });
      
      console.log("Updating progress:", progressData);
      const progress = await storage.updateUserProgress(progressData);
      return res.status(200).json(progress);
    } catch (error) {
      console.error("POST progress error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Geçersiz ilerleme verileri", errors: error.errors });
      }
      return res.status(500).json({ message: "Sunucu hatası" });
    }
  });
  
  // Quiz results routes
  app.post("/api/quiz/result", async (req: Request, res: Response) => {
    try {
      // In development, use a mock user for testing
      let userId = req.session.userId;
      if (!userId) {
        const mockUser = await createOrGetMockUser();
        if (mockUser) {
          userId = mockUser.id;
          req.session.userId = userId;
          console.log("Created mock user session for development (POST quiz):", userId);
        } else {
          return res.status(401).json({ message: "Oturum açmanız gerekiyor" });
        }
      }
      
      const quizData = insertQuizResultSchema.parse({
        ...req.body,
        userId
      });
      
      console.log("Saving quiz result:", quizData);
      const result = await storage.saveQuizResult(quizData);
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
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ message: "Oturum açmanız gerekiyor" });
      }
      
      const moduleId = req.query.moduleId as string | undefined;
      const results = await storage.getQuizResults(userId, moduleId);
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ message: "Sunucu hatası" });
    }
  });
  
  // Modül kilit durumlarını getiren API
  app.get("/api/module-unlocks", async (req: Request, res: Response) => {
    try {
      // Geliştirme aşamasında mock kullanıcı kullan
      let userId = req.session.userId;
      if (!userId) {
        const mockUser = await createOrGetMockUser();
        if (mockUser) {
          userId = mockUser.id;
          req.session.userId = userId;
          console.log("Created mock user session for module-unlocks:", userId);
        } else {
          return res.status(401).json({ message: "Oturum açmanız gerekiyor" });
        }
      }
      
      // Storage'da getModuleUnlocks metodu varsa kullan
      if (storage.getModuleUnlocks) {
        const unlocks = await storage.getModuleUnlocks(userId);
        return res.status(200).json(unlocks);
      } else {
        // Metod yoksa boş dizi döndür
        return res.status(200).json([]);
      }
    } catch (error) {
      console.error("Module unlocks API error:", error);
      return res.status(500).json({ message: "Sunucu hatası" });
    }
  });
  
  // Modül kilidini açan API
  app.post("/api/module-unlock", async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ message: "Oturum açmanız gerekiyor" });
      }
      
      const { moduleId } = req.body;
      if (!moduleId) {
        return res.status(400).json({ message: "Modül ID'si gerekli" });
      }
      
      // Storage'da unlockModule metodu varsa kullan
      if (storage.unlockModule) {
        const result = await storage.unlockModule(userId, moduleId);
        return res.status(200).json(result);
      } else {
        return res.status(404).json({ message: "Bu özellik desteklenmiyor" });
      }
    } catch (error) {
      console.error("Module unlock API error:", error);
      return res.status(500).json({ message: "Sunucu hatası" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
