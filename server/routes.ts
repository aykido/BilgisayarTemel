import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserProgressSchema, insertQuizResultSchema, insertUserSchema } from "@shared/schema";

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
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ message: "Oturum açmanız gerekiyor" });
      }
      
      const progress = await storage.getUserProgress(userId);
      return res.status(200).json(progress);
    } catch (error) {
      return res.status(500).json({ message: "Sunucu hatası" });
    }
  });
  
  app.post("/api/progress", async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ message: "Oturum açmanız gerekiyor" });
      }
      
      const progressData = insertUserProgressSchema.parse({
        ...req.body,
        userId
      });
      
      const progress = await storage.updateUserProgress(progressData);
      return res.status(200).json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Geçersiz ilerleme verileri", errors: error.errors });
      }
      return res.status(500).json({ message: "Sunucu hatası" });
    }
  });
  
  // Quiz results routes
  app.post("/api/quiz/result", async (req: Request, res: Response) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ message: "Oturum açmanız gerekiyor" });
      }
      
      const quizData = insertQuizResultSchema.parse({
        ...req.body,
        userId
      });
      
      const result = await storage.saveQuizResult(quizData);
      return res.status(200).json(result);
    } catch (error) {
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

  const httpServer = createServer(app);
  return httpServer;
}
