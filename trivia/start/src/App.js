import React, { useState } from 'react';
import './App.css';
import CategorySelector from './components/CategorySelector';
import Question from './components/Question';
import ResultModal from './components/ResultModal';
import Scoreboard from './components/Scoreboard';
import { useTrivia } from './useTrivia';

export default function App() {
  const [isCorrect, setIsCorrect] = useState(false);

  const {
    question,
    getQuestion,
    selectedCategory,
    setSelectedCategory,
  } = useTrivia();

  const handleNextQuestion = () => {
    setIsCorrect(null);
    getQuestion();
  };

  const handleQuestionAnswered = (answer) => {
    const isAnswerCorrect = answer === question.correct_answer;
    setIsCorrect(isAnswerCorrect);
  };

  return (
    <div className='app'>
      {/* show the result modal ----------------------- */}
      {isCorrect !== null && question && (
        <ResultModal
          isCorrect={isCorrect}
          question={question}
          getQuestion={handleNextQuestion}
        />
      )}

      {/* question header ----------------------- */}
      <div className='question-header'>
        <CategorySelector
          category={selectedCategory}
          chooseCategory={setSelectedCategory}
        />
        <Scoreboard isCorrect={isCorrect} />
      </div>

      {/* the question itself ----------------------- */}
      <div className='question-main'>
        {question && (
          <Question
            question={question}
            answerQuestion={handleQuestionAnswered}
          />
        )}
      </div>

      {/* question footer ----------------------- */}
      <div className='question-footer'>
        <button onClick={handleNextQuestion}>Go to next question 👉</button>
      </div>
    </div>
  );
}
