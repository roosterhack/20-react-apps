import React, { useEffect, useState } from 'react';
import Question from './components/Question';
import CategorySelector from './components/CategorySelector';
import ResultModal from './components/ResultModal';
import Scoreboard from './components/Scoreboard';
import './App.css';

export default function App() {
  const [question, setQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('any');

  useEffect(() => {
    const getQuestion = async () => {
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
    };
    getQuestion();
  }, [selectedCategory]);

  return (
    <div className='app'>
      {/* show the result modal ----------------------- */}
      {/* <ResultModal /> */}

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
        {question && <Question question={question} />}
      </div>

      {/* question footer ----------------------- */}
      <div className='question-footer'>
        <button>Go to next question 👉</button>
      </div>
    </div>
  );
}
