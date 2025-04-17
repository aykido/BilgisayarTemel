import { users, userProgress, quizResults, type User, type InsertUser, type UserProgress, type InsertUserProgress, type QuizResult, type InsertQuizResult } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Progress tracking
  getUserProgress(userId: number): Promise<UserProgress[]>;
  updateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  
  // Quiz results
  saveQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  getQuizResults(userId: number, moduleId?: string): Promise<QuizResult[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private progress: Map<string, UserProgress>;
  private quiz: Map<number, QuizResult>;
  currentId: number;
  progressId: number;
  quizId: number;

  constructor() {
    this.users = new Map();
    this.progress = new Map();
    this.quiz = new Map();
    this.currentId = 1;
    this.progressId = 1;
    this.quizId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return Array.from(this.progress.values()).filter(
      (progress) => progress.userId === userId
    );
  }
  
  async updateUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const key = `${insertProgress.userId}-${insertProgress.moduleId}-${insertProgress.lessonId}`;
    let progress = this.progress.get(key);
    
    if (progress) {
      progress = { ...progress, ...insertProgress };
    } else {
      progress = { ...insertProgress, id: this.progressId++ };
    }
    
    this.progress.set(key, progress);
    return progress;
  }
  
  async saveQuizResult(insertResult: InsertQuizResult): Promise<QuizResult> {
    const id = this.quizId++;
    const result: QuizResult = { ...insertResult, id };
    this.quiz.set(id, result);
    return result;
  }
  
  async getQuizResults(userId: number, moduleId?: string): Promise<QuizResult[]> {
    return Array.from(this.quiz.values()).filter(
      (quiz) => quiz.userId === userId && (!moduleId || quiz.moduleId === moduleId)
    );
  }
}

export const storage = new MemStorage();
