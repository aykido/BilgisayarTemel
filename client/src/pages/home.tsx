import Layout from "@/components/layout/Layout";
import { courseData } from "@/lib/data";
import { useLocation } from "wouter";
import useProgress from "@/hooks/use-progress";

export default function Home() {
  const [, navigate] = useLocation();
  const { overallProgress } = useProgress();
  
  const handleModuleClick = (moduleId: string) => {    
    const module = courseData.find(m => m.id === moduleId);
    if (module && module.lessons.length > 0) {
      navigate(`/modul/${moduleId}/ders/${module.lessons[0].id}`);
    }
  };
  
  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">Bilgisayar İşletmenliği - Operatörlüğü Eğitimine Hoş Geldiniz</h1>
          <p className="text-neutral-600 mb-4">Bu eğitimde temel bilgisayar bilgileri, Microsoft Office uygulamaları ve internet kullanımı hakkında bilgi edineceksiniz.</p>
          
          <div className="mt-6 flex items-center justify-center">
            <button
              onClick={() => navigate('/modul/modul-1/ders/donanim-bilesenleri')}
              className="px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Eğitime Başla
            </button>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-neutral-800 mb-4">Eğitim Modülleri</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courseData.map(module => (
            <div 
              key={module.id}
              onClick={() => handleModuleClick(module.id)}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-transform hover:translate-y-[-4px]"
            >
              <div className="p-4 bg-primary">
                <div className="flex items-center">
                  <span className="material-icons text-white mr-2">{module.icon}</span>
                  <h3 className="text-lg font-bold text-white">{module.title}</h3>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-neutral-600 text-sm mb-3">{module.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500">{module.lessons.length} ders</span>
                  <button className="text-sm text-primary hover:text-primary/80 font-medium">
                    Derse Git
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 mb-4 text-neutral-500 text-sm">
          Hazırlayan: Aykut BOZALAN
        </div>
      </div>
    </Layout>
  );
}
