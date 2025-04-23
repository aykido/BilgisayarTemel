import { Layout } from "@/components/layout/Layout";
import { IQtAITeacher } from "@/components/IQtAITeacher";

export default function AskTeacherPage() {
  return (
    <Layout>
      <div className="flex-1 px-4 py-8 md:p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            IQt AI Öğretmen
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Yapay Zeka ekranında: "Hocam", "Öğretmenim" şeklinde başlayan hitaplarla IQt öğretmene bilişim konuları hakkında sorular sorabilirsiniz.
          </p>
        </header>
        
        <IQtAITeacher />
      </div>
    </Layout>
  );
}