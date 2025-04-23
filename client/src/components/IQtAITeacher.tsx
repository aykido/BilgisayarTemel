import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Trash2, Loader2, Bot } from "lucide-react";
import { apiRequest, getQueryFn } from "@/lib/queryClient";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function IQtAITeacher() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Kullanıcı mesajını gönder ve asistan yanıtını al
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    const userMessage: Message = {
      role: "user",
      content: inputMessage,
      timestamp: new Date()
    };
    
    // Kullanıcı mesajını hemen ekle
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    try {
      // API isteği gönder
      const response = await apiRequest("/api/assistant/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMessage.content,
          userId: 1  // Gerçek sistemde kullanıcı kimliği eklenecek
        })
      });

      // API yanıtını kontrol et
      if (response && response.response) {
        // Asistan yanıtını ekle
        const assistantMessage: Message = {
          role: "assistant",
          content: response.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error("API geçerli bir yanıt döndürmedi");
      }
    } catch (err: any) {
      console.error("Asistan API hatası:", err);
      setError(err.message || "Asistanla iletişim kurarken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  // Konuşma geçmişini temizle
  const clearConversation = async () => {
    try {
      setIsLoading(true);
      await apiRequest("/api/assistant/clear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: 1  // Gerçek sistemde kullanıcı kimliği eklenecek
        })
      });
      
      setMessages([]);
      setError(null);
    } catch (err: any) {
      console.error("Konuşma temizleme hatası:", err);
      setError(err.message || "Konuşma geçmişi temizlenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  // Enter tuşu ile mesaj gönderme
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto h-[calc(100vh-200px)] flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center">
          <Bot className="h-6 w-6 mr-2 text-primary" />
          IQt AI Öğretmene Sor
        </CardTitle>
        <CardDescription>
          Bilgisayar ve Microsoft Office konularındaki sorularınızı yapay zeka destekli öğretmenimize sorabilirsiniz.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto py-4 space-y-4 mb-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
            <Bot className="h-16 w-16 mb-2 text-muted-foreground/50" />
            <p>Merhaba! Size nasıl yardımcı olabilirim? Excel'de formül yazmak, PowerPoint sunumu hazırlamak ya da bilgisayar kavramları hakkında sorularınızı cevaplayabilirim.</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted"
                }`}
              >
                <div className="mb-1 text-sm">
                  {message.role === "user" ? "Siz" : "AI Öğretmen"}
                </div>
                <div className="whitespace-pre-wrap">
                  {message.content}
                </div>
                <div className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}
        
        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
            <p className="font-semibold">Hata:</p>
            <p>{error}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-4 border-t gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={clearConversation} 
          disabled={isLoading || messages.length === 0}
          title="Konuşmayı temizle"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        
        <div className="flex-grow relative">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Sorunuzu yazın..."
            className="min-h-11 resize-none"
            disabled={isLoading}
          />
        </div>
        
        <Button 
          onClick={sendMessage} 
          disabled={isLoading || !inputMessage.trim()}
          size="icon"
          title="Gönder"
        >
          <Send className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}