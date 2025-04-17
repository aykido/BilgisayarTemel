import { 
  users, userProgress, quizResults, moduleUnlocks,
  type User, type InsertUser, 
  type UserProgress, type InsertUserProgress,
  type QuizResult, type InsertQuizResult,
  type ModuleUnlock
} from "@shared/schema";
import { DatabaseStorage } from "./storage-db";

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
  
  // Modül kilit yönetimi
  getModuleUnlocks?(userId: number): Promise<ModuleUnlock[]>;
  unlockModule?(userId: number, moduleId: string): Promise<ModuleUnlock>;
  isModuleUnlocked?(userId: number, moduleId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private progress: Map<string, UserProgress>;
  private quiz: Map<number, QuizResult>;
  private unlocks: Map<string, ModuleUnlock>; // Modül kilit durumları
  currentId: number;
  progressId: number;
  quizId: number;
  unlockId: number;

  constructor() {
    this.users = new Map();
    this.progress = new Map();
    this.quiz = new Map();
    this.unlocks = new Map();
    this.currentId = 1;
    this.progressId = 1;
    this.quizId = 1;
    this.unlockId = 1;
    
    // İlk modülü varsayılan olarak aç
    this.unlockModule(1, 'modul-1');
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
    
    // İlk modülü yeni kullanıcı için aç
    this.unlockModule(id, 'modul-1');
    
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
      // Ensure completed is always a boolean
      const completed = insertProgress.completed !== undefined ? insertProgress.completed : progress.completed;
      progress = { 
        ...progress, 
        ...insertProgress,
        completed 
      };
    } else {
      // Set defaults for required fields
      progress = { 
        ...insertProgress, 
        id: this.progressId++,
        completed: insertProgress.completed !== undefined ? insertProgress.completed : false,
        quizScore: insertProgress.quizScore !== undefined ? insertProgress.quizScore : null,
        lastAccessed: insertProgress.lastAccessed || new Date().toISOString()
      };
    }
    
    this.progress.set(key, progress);
    
    // Ders tamamlandıysa, modül tamamlanma kontrolü yap
    if (progress.completed) {
      this.checkAndUnlockNextModule(progress.userId, progress.moduleId);
    }
    
    return progress;
  }
  
  async saveQuizResult(insertResult: InsertQuizResult): Promise<QuizResult> {
    const id = this.quizId++;
    const result: QuizResult = { ...insertResult, id };
    this.quiz.set(id, result);
    
    // Quiz sonuçlarından sonra dersi tamamlanmış olarak işaretle
    await this.updateUserProgress({
      userId: insertResult.userId,
      moduleId: insertResult.moduleId,
      lessonId: insertResult.lessonId,
      completed: true,
      lastAccessed: insertResult.completedAt
    });
    
    return result;
  }
  
  async getQuizResults(userId: number, moduleId?: string): Promise<QuizResult[]> {
    return Array.from(this.quiz.values()).filter(
      (quiz) => quiz.userId === userId && (!moduleId || quiz.moduleId === moduleId)
    );
  }
  
  async getModuleUnlocks(userId: number): Promise<ModuleUnlock[]> {
    return Array.from(this.unlocks.values()).filter(
      (unlock) => unlock.userId === userId
    );
  }
  
  async unlockModule(userId: number, moduleId: string): Promise<ModuleUnlock> {
    const key = `${userId}-${moduleId}`;
    let unlock = this.unlocks.get(key);
    
    if (unlock) {
      // Zaten var olan kilitleri güncelle
      unlock = { 
        ...unlock, 
        isUnlocked: true,
        unlockedAt: new Date().toISOString() 
      };
    } else {
      // Yeni kilit açma kaydı oluştur
      unlock = {
        id: this.unlockId++,
        userId,
        moduleId,
        isUnlocked: true,
        unlockedAt: new Date().toISOString()
      };
    }
    
    this.unlocks.set(key, unlock);
    console.log(`Unlocked module ${moduleId} for user ${userId}`);
    return unlock;
  }
  
  async isModuleUnlocked(userId: number, moduleId: string): Promise<boolean> {
    const key = `${userId}-${moduleId}`;
    const unlock = this.unlocks.get(key);
    return unlock ? unlock.isUnlocked : (moduleId === 'modul-1'); // İlk modül her zaman açık
  }
  
  // Modül tamamlanma durumunu kontrol et ve sonraki modülü aç
  private async checkAndUnlockNextModule(userId: number, moduleId: string): Promise<void> {
    const moduleProgress = await this.getUserProgress(userId);
    const moduleLessons = moduleProgress.filter(p => p.moduleId === moduleId);
    
    // Modül içindeki derslerin sayısı (basitleştirilmiş)
    const lessonCounts: { [key: string]: number } = {
      'modul-1': 3,
      'modul-2': 3,
      'modul-3': 3,
      'modul-4': 3,
      'modul-5': 3,
      'modul-6': 3
    };
    
    // Tüm dersler tamamlanmış mı kontrol et
    const totalLessons = lessonCounts[moduleId] || 0;
    const completedLessons = moduleLessons.filter(p => p.completed).length;
    
    console.log(`Module ${moduleId}: ${completedLessons}/${totalLessons} lessons completed`);
    
    if (totalLessons > 0 && completedLessons >= totalLessons) {
      // Sonraki modülü belirle
      const nextModuleId = this.getNextModuleId(moduleId);
      if (nextModuleId) {
        await this.unlockModule(userId, nextModuleId);
      }
    }
  }
  
  // Modül ID'sine göre sonraki modülü belirle
  private getNextModuleId(currentModuleId: string): string | null {
    const moduleMap: { [key: string]: string } = {
      'modul-1': 'modul-2',
      'modul-2': 'modul-3',
      'modul-3': 'modul-4',
      'modul-4': 'modul-5',
      'modul-5': 'modul-6'
    };
    
    return moduleMap[currentModuleId] || null;
  }
}

// Veritabanı bağlantısı durumuna göre uygun depolama seçeneğini kullan
export const storage = process.env.DATABASE_URL 
  ? new DatabaseStorage() 
  : new MemStorage();
