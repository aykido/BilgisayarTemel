import { useState, useEffect } from "react";
import { Quiz as QuizType, QuizQuestion } from "@/lib/types";

interface QuizProps {
  quiz: QuizType;
  onComplete: (score: number, total: number) => void;
  onBack: () => void;
}

export function Quiz({ quiz, onComplete, onBack }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(quiz.questions.length).fill(-1));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  const handleAnswerSelect = (answerIndex: number) => {
    if (isSubmitted) return;
    
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };
  
  const goToNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmit = () => {
    if (selectedAnswers.includes(-1)) {
      alert("Lütfen tüm soruları cevaplayın!");
      return;
    }
    
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    setScore(correctAnswers);
    setIsSubmitted(true);
    onComplete(correctAnswers, quiz.questions.length);
  };
  
  const isAllAnswered = !selectedAnswers.includes(-1);
  const isCorrectAnswer = isSubmitted && selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer;
  const isWrongAnswer = isSubmitted && selectedAnswers[currentQuestionIndex] !== currentQuestion.correctAnswer;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-neutral-800">{quiz.title}</h2>
        <span className="text-sm text-neutral-500">
          Soru {currentQuestionIndex + 1} / {quiz.questions.length}
        </span>
      </div>
      
      <div className="relative h-1.5 bg-neutral-100 rounded-full overflow-hidden mb-6">
        <div 
          className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
        ></div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-neutral-800 mb-4">{currentQuestion.question}</h3>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <div 
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                selectedAnswers[currentQuestionIndex] === index
                  ? isSubmitted
                    ? index === currentQuestion.correctAnswer
                      ? "bg-green-50 border-green-300"
                      : "bg-red-50 border-red-300"
                    : "bg-primary/10 border-primary"
                  : isSubmitted && index === currentQuestion.correctAnswer
                    ? "bg-green-50 border-green-300"
                    : "border-neutral-200 hover:border-primary/30"
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                  selectedAnswers[currentQuestionIndex] === index
                    ? isSubmitted
                      ? index === currentQuestion.correctAnswer
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-primary text-white"
                    : isSubmitted && index === currentQuestion.correctAnswer
                      ? "bg-green-500 text-white"
                      : "bg-neutral-100"
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-neutral-800">{option}</span>
                
                {isSubmitted && index === currentQuestion.correctAnswer && (
                  <span className="material-icons text-green-500 ml-auto">check_circle</span>
                )}
                
                {isSubmitted && selectedAnswers[currentQuestionIndex] === index && index !== currentQuestion.correctAnswer && (
                  <span className="material-icons text-red-500 ml-auto">cancel</span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {isSubmitted && currentQuestion.explanation && (
          <div className="mt-4 p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
            <p className="text-sm text-neutral-700">
              <span className="font-medium">Açıklama:</span> {currentQuestion.explanation}
            </p>
          </div>
        )}
      </div>
      
      <div className="flex justify-between">
        <div>
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-white border border-neutral-200 rounded-md text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Derse Dön
          </button>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-4 py-2 bg-white border border-neutral-200 rounded-md text-neutral-700 transition-colors ${
              currentQuestionIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-neutral-50"
            }`}
          >
            Önceki
          </button>
          
          {currentQuestionIndex === quiz.questions.length - 1 ? (
            isSubmitted ? (
              <div className="flex items-center text-green-600 font-medium">
                <span className="material-icons mr-1">check_circle</span>
                <span>Skorunuz: {score}/{quiz.questions.length}</span>
              </div>
            ) : (
              <button 
                onClick={handleSubmit}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isAllAnswered 
                    ? "bg-primary text-white hover:bg-primary/90" 
                    : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                }`}
                disabled={!isAllAnswered}
              >
                Tamamla
              </button>
            )
          ) : (
            <button 
              onClick={goToNextQuestion}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Sonraki
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
