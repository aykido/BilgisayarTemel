import { useState } from "react";
import { Exercise, ExerciseItem } from "@/lib/types";

interface InteractiveExerciseProps {
  exercise: Exercise;
  onComplete: () => void;
}

export function InteractiveExercise({ exercise, onComplete }: InteractiveExerciseProps) {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  
  const handleAnswerChange = (itemId: string, answer: string) => {
    setUserAnswers({
      ...userAnswers,
      [itemId]: answer
    });
  };
  
  const checkAnswers = () => {
    let correct = 0;
    
    exercise.items.forEach(item => {
      if (userAnswers[item.id] === item.answer) {
        correct++;
      }
    });
    
    setScore(correct);
    setIsChecked(true);
    
    if (correct === exercise.items.length) {
      onComplete();
    }
  };
  
  const renderMatchingExercise = () => {
    return (
      <div className="space-y-3">
        {exercise.items.map(item => (
          <div key={item.id} className="bg-white p-3 rounded-lg border border-neutral-200 flex justify-between items-center">
            <span className="font-medium">{item.question}</span>
            <select 
              className="bg-neutral-100 px-3 py-1 rounded text-sm border-none focus:ring-1 focus:ring-primary"
              value={userAnswers[item.id] || ""}
              onChange={e => handleAnswerChange(item.id, e.target.value)}
              disabled={isChecked}
            >
              <option value="">Seçiniz</option>
              {exercise.items.map(answerItem => (
                <option key={answerItem.id} value={answerItem.answer}>
                  {answerItem.answer}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    );
  };
  
  const renderMultipleChoiceExercise = () => {
    return (
      <div className="space-y-4">
        {exercise.items.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-lg border border-neutral-200">
            <p className="font-medium mb-2">{item.question}</p>
            <div className="space-y-2">
              {item.options?.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input 
                    type="radio" 
                    id={`${item.id}-${index}`} 
                    name={item.id} 
                    value={option}
                    checked={userAnswers[item.id] === option}
                    onChange={() => handleAnswerChange(item.id, option)}
                    disabled={isChecked}
                    className="mr-2 text-primary focus:ring-primary"
                  />
                  <label htmlFor={`${item.id}-${index}`} className="text-sm">{option}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderFillBlankExercise = () => {
    return (
      <div className="space-y-3">
        {exercise.items.map(item => (
          <div key={item.id} className="bg-white p-3 rounded-lg border border-neutral-200">
            <p className="font-medium mb-2">{item.question}</p>
            <input 
              type="text" 
              value={userAnswers[item.id] || ""} 
              onChange={e => handleAnswerChange(item.id, e.target.value)}
              disabled={isChecked}
              className="w-full px-3 py-2 border border-neutral-200 rounded focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Cevabınızı buraya yazın"
            />
          </div>
        ))}
      </div>
    );
  };
  
  const renderExercise = () => {
    switch (exercise.type) {
      case "matching":
        return renderMatchingExercise();
      case "multiplechoice":
        return renderMultipleChoiceExercise();
      case "fillblank":
        return renderFillBlankExercise();
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-neutral-50 p-6 border-t border-neutral-100">
      <h3 className="text-lg font-bold text-neutral-800 mb-4">{exercise.title}</h3>
      <p className="mb-4 text-neutral-700">{exercise.description}</p>
      
      {renderExercise()}
      
      {isChecked && (
        <div className={`mt-4 p-3 rounded-lg ${score === exercise.items.length ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-800"}`}>
          <p className="font-medium">
            {score === exercise.items.length 
              ? "Tebrikler! Tüm soruları doğru cevapladınız." 
              : `Skorunuz: ${score}/${exercise.items.length}. Yeniden deneyin.`
            }
          </p>
        </div>
      )}
      
      {!isChecked && (
        <button 
          onClick={checkAnswers} 
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          Kontrol Et
        </button>
      )}
      
      {isChecked && score < exercise.items.length && (
        <button 
          onClick={() => {
            setIsChecked(false);
            setScore(0);
          }} 
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          Tekrar Dene
        </button>
      )}
    </div>
  );
}

export default InteractiveExercise;
