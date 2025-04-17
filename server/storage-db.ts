import { eq, and } from "drizzle-orm";
import { db } from "./db";
import { 
  users, userProgress, quizResults, moduleUnlocks,
  type User, type InsertUser, 
  type UserProgress, type InsertUserProgress,
  type QuizResult, type InsertQuizResult,
  type ModuleUnlock
} from "@shared/schema";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    
    // İlk modülü otomatik olarak kilitsiz hale getir
    await this.unlockModule(user.id, 'modul-1');
    
    return user;
  }

  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return db.select().from(userProgress).where(eq(userProgress.userId, userId));
  }

  async updateUserProgress(progress: InsertUserProgress): Promise<UserProgress> {
    // Önce mevcut kaydı kontrol et
    const [existingProgress] = await db.select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, progress.userId),
          eq(userProgress.moduleId, progress.moduleId),
          eq(userProgress.lessonId, progress.lessonId)
        )
      );

    // Eğer mevcut kayıt varsa güncelle, yoksa yeni kayıt oluştur
    if (existingProgress) {
      const [updated] = await db.update(userProgress)
        .set({
          completed: progress.completed,
          lastAccessed: progress.lastAccessed
        })
        .where(eq(userProgress.id, existingProgress.id))
        .returning();
      
      // Check if we need to unlock the next module
      await this.checkAndUnlockNextModule(progress.userId, progress.moduleId);
      
      return updated;
    } else {
      const [newProgress] = await db.insert(userProgress)
        .values(progress)
        .returning();
      
      // Check if we need to unlock the next module
      await this.checkAndUnlockNextModule(progress.userId, progress.moduleId);
      
      return newProgress;
    }
  }

  async saveQuizResult(result: InsertQuizResult): Promise<QuizResult> {
    const [quizResult] = await db.insert(quizResults)
      .values(result)
      .returning();

    // Quiz sonucunu kullanıcı ilerlemesi olarak da kaydet
    await this.updateUserProgress({
      userId: result.userId,
      moduleId: result.moduleId,
      lessonId: result.lessonId,
      completed: true,
      lastAccessed: result.completedAt
    });

    // Modül içindeki tüm derslerin tamamlanıp tamamlanmadığını kontrol et
    await this.checkAndUnlockNextModule(result.userId, result.moduleId);

    return quizResult;
  }

  async getQuizResults(userId: number, moduleId?: string): Promise<QuizResult[]> {
    if (moduleId) {
      return db.select()
        .from(quizResults)
        .where(
          and(
            eq(quizResults.userId, userId),
            eq(quizResults.moduleId, moduleId)
          )
        );
    } else {
      return db.select()
        .from(quizResults)
        .where(eq(quizResults.userId, userId));
    }
  }

  async getModuleUnlocks(userId: number): Promise<ModuleUnlock[]> {
    return db.select()
      .from(moduleUnlocks)
      .where(eq(moduleUnlocks.userId, userId));
  }

  async unlockModule(userId: number, moduleId: string): Promise<ModuleUnlock> {
    // Önce mevcut kaydı kontrol et
    const [existingUnlock] = await db.select()
      .from(moduleUnlocks)
      .where(
        and(
          eq(moduleUnlocks.userId, userId),
          eq(moduleUnlocks.moduleId, moduleId)
        )
      );

    if (existingUnlock) {
      // Eğer kayıt varsa ve kilitliyse güncelle
      if (!existingUnlock.isUnlocked) {
        const [updated] = await db.update(moduleUnlocks)
          .set({
            isUnlocked: true,
            unlockedAt: new Date().toISOString()
          })
          .where(eq(moduleUnlocks.id, existingUnlock.id))
          .returning();
        console.log(`Unlocked module ${moduleId} for user ${userId}`);
        return updated;
      }
      return existingUnlock;
    } else {
      // Yeni kayıt oluştur
      const [newUnlock] = await db.insert(moduleUnlocks)
        .values({
          userId,
          moduleId,
          isUnlocked: true,
          unlockedAt: new Date().toISOString()
        })
        .returning();
      console.log(`Unlocked module ${moduleId} for user ${userId}`);
      return newUnlock;
    }
  }

  async isModuleUnlocked(userId: number, moduleId: string): Promise<boolean> {
    const [unlock] = await db.select()
      .from(moduleUnlocks)
      .where(
        and(
          eq(moduleUnlocks.userId, userId),
          eq(moduleUnlocks.moduleId, moduleId)
        )
      );
    
    return unlock ? unlock.isUnlocked : false;
  }

  // Yardımcı fonksiyon: Bir modüldeki tüm dersler tamamlandıysa bir sonraki modülü aç
  private async checkAndUnlockNextModule(userId: number, moduleId: string): Promise<void> {
    // Modül içindeki tüm dersleri al
    const progressEntries = await db.select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, userId),
          eq(userProgress.moduleId, moduleId)
        )
      );

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
    const completedLessons = progressEntries.filter(p => p.completed).length;
    
    console.log(`Module ${moduleId}: ${completedLessons}/${totalLessons} lessons completed`);

    if (totalLessons > 0 && completedLessons >= totalLessons) {
      // Bir sonraki modülü belirle
      const nextModuleId = this.getNextModuleId(moduleId);
      if (nextModuleId) {
        // Sonraki modülü kilitsiz hale getir
        await this.unlockModule(userId, nextModuleId);
      }
    }
  }

  // Yardımcı fonksiyon: Modül ID'sine göre bir sonraki modül ID'sini döndür
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