import React, { useEffect, useState } from 'react';
import Question from './components/Question';
import CategorySelector from './components/CategorySelector';
import ResultModal from './components/ResultModal';
import Scoreboard from './components/Scoreboard';
import './App.css';

export default function App() {
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const getQuestion = async () => {
      const url = 'https://opentdb.com/api.php?amount=1';
      try {
        const res = await fetch(url);
        const resQuestion = await res.json();
        setQuestion(resQuestion.results[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getQuestion();
  }, []);

  return (
    <div className='app'>
      {/* show the result modal ----------------------- */}
      {/* <ResultModal /> */}

      {/* question header ----------------------- */}
      <div className='question-header'>
        <CategorySelector />
        <Scoreboard />
      </div>

      {/* the question itself ----------------------- */}
      <div className='question-main'>
        {question && <Question question={question} />}
      </div>

      {/* question footer ----------------------- */}
      <div className='question-footer'>
        <button>Go to next question 👉</button>
      </div>
    </div>
  );
}
