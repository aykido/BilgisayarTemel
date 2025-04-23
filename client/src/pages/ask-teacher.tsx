import { Layout } from "@/components/layout/Layout";
import { IQtAITeacher } from "@/components/IQtAITeacher";
import { useLocation } from "wouter";
import { Home } from "lucide-react";

export default function AskTeacherPage() {
  const [, navigate] = useLocation();

  return (
    <Layout>
      <div className="flex-1 px-4 py-8 md:p-10">
        <header className="mb-8">
          {/* Ana sayfaya dönüş butonu - Mobil ve Dar Ekranlar İçin */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
              IQt AI Öğretmen
            </h1>
            
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg transition-all hover:bg-primary/90 text-sm md:text-base"
            >
              <Home className="h-5 w-5" />
              <span>Ana Sayfa</span>
            </button>
          </div>
          
          <p className="mt-2 text-lg text-muted-foreground">
            Yapay Zeka ekranında: "Hocam", "Öğretmenim" şeklinde başlayan hitaplarla IQt öğretmene bilişim konuları hakkında sorular sorabilirsiniz.
          </p>
        </header>
        
        <IQtAITeacher />
      </div>
    </Layout>
  );
}