import OpenAI from "openai";
import { Request, Response, NextFunction } from "express";

// OpenAI API bağlantısı için gerekli gizli anahtarlar
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ASSISTANT_ID = process.env.ASSISTANT_ID;
const VECTOR_STORE_ID = process.env.VECTOR_STORE_ID;

// OpenAI API istemcisi yapılandırması
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// Geçmiş konuşma oturumlarını saklamak için basit bir Map
const threadMap = new Map<number, string>();

/**
 * Kullanıcı mesajını iletir ve Asistandan yanıt alır
 */
export async function askAssistant(req: Request, res: Response, next: NextFunction) {
  try {
    const { message, userId } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Soru metni gereklidir" });
    }

    if (!OPENAI_API_KEY || !ASSISTANT_ID) {
      return res.status(500).json({ error: "Asistan API yapılandırması eksik" });
    }
    
    // Vector Store ID'nin varlığını kontrol et
    if (!VECTOR_STORE_ID) {
      console.warn("Vector Store ID bulunamadı, belge tabanlı yanıtlar kısıtlı olabilir.");
    }

    // Kullanıcı için konuşma thread'i oluştur veya mevcut olanı kullan
    let threadId = threadMap.get(userId);
    
    if (!threadId) {
      const thread = await openai.beta.threads.create();
      threadId = thread.id;
      threadMap.set(userId, threadId);
    }

    // Kullanıcı mesajını thread'e ekle
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    });

    // Thread üzerinde çalıştırma başlat
    const runOptions: any = {
      assistant_id: ASSISTANT_ID,
    };
    
    // Vector Store ID varsa, çalıştırma parametrelerine ekle
    if (VECTOR_STORE_ID) {
      runOptions.tools = [
        {
          type: "retrieval"
        }
      ];
      runOptions.tool_resources = {
        retrieval: {
          vector_store_ids: [VECTOR_STORE_ID]
        }
      };
    }
    
    const run = await openai.beta.threads.runs.create(threadId, runOptions);

    // Çalıştırma tamamlanana kadar bekle
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);

    // Durum tamamlanana kadar kontrol et (basit polling)
    while (runStatus.status !== "completed") {
      // Kısa bir bekleme süresi (500ms)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
      
      // Hata durumlarını kontrol et
      if (runStatus.status === "failed" || runStatus.status === "cancelled") {
        return res.status(500).json({ 
          error: "Asistan yanıt verirken bir hata oluştu",
          details: runStatus.status
        });
      }
    }

    // Asistan yanıtını al
    const messages = await openai.beta.threads.messages.list(threadId);
    const assistantMessages = messages.data.filter(msg => msg.role === "assistant");
    
    if (assistantMessages.length === 0) {
      return res.status(500).json({ error: "Asistan yanıt vermedi" });
    }

    // En son asistan mesajını döndür
    const latestMessage = assistantMessages[0];
    
    // Metin içeriğini ayıkla ve döndür
    const responseContent = latestMessage.content.filter(content => content.type === "text");
    
    const textResponse = responseContent.map(content => {
      if (content.type === "text") {
        return content.text.value;
      }
      return "";
    }).join("\n");

    return res.json({ 
      response: textResponse,
      threadId: threadId
    });

  } catch (error: any) {
    console.error("OpenAI Assistant API error:", error);
    return res.status(500).json({ 
      error: "OpenAI servisine bağlanırken bir hata oluştu",
      details: error.message 
    });
  }
}

/**
 * Bir konuşma thread'ini siler
 */
export async function clearThread(req: Request, res: Response) {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Kullanıcı ID gereklidir" });
    }

    const threadId = threadMap.get(userId);
    
    if (threadId) {
      threadMap.delete(userId);
      return res.json({ message: "Konuşma geçmişi temizlendi" });
    } else {
      return res.status(404).json({ error: "Konuşma geçmişi bulunamadı" });
    }
  } catch (error: any) {
    console.error("Thread temizleme hatası:", error);
    return res.status(500).json({ error: "Konuşma geçmişi temizlenirken bir hata oluştu" });
  }
}