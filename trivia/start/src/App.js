import React, { useEffect, useState, useCallback } from 'react';
import Question from './components/Question';
import CategorySelector from './components/CategorySelector';
import ResultModal from './components/ResultModal';
import Scoreboard from './components/Scoreboard';
import './App.css';

export default function App() {
  const [question, setQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('any');
  const [isCorrect, setIsCorrect] = useState(false);

  const getQuestion = useCallback(async () => {
    setIsCorrect(null);
    let url = 'https://opentdb.com/api.php?amount=1';
    if (selectedCategory !== 'any') url += `&category=${selectedCategory}`;
    try {
      const res = await fetch(url);
      const resQuestion = await res.json();
      if (resQuestion) {
        setQuestion(resQuestion.results[0]);
      }
    } catch (err) {
      console.log(err);
    }
  }, [selectedCategory]);

  const handleQuestionAnswered = (answer) => {
    const isAnswerCorrect = answer === question.correct_answer;
    setIsCorrect(isAnswerCorrect);
  };

  useEffect(() => {
    getQuestion();
  }, [selectedCategory, getQuestion]);

  return (
    <div className='app'>
      {/* show the result modal ----------------------- */}
      {isCorrect !== null && question && (
        <ResultModal
          isCorrect={isCorrect}
          question={question}
          getQuestion={getQuestion}
        />
      )}

      {/* question header ----------------------- */}
      <div className='question-header'>
        <CategorySelector
          category={selectedCategory}
          chooseCategory={setSelectedCategory}
        />
        <Scoreboard />
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
        <button onClick={getQuestion}>Go to next question 👉</button>
      </div>
    </div>
  );
}
