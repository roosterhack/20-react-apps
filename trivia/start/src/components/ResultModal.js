import React from 'react';

export default function ResultModal({ isCorrect, question, getQuestion }) {
  return (
    <div className={`result-modal ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
      <div className='overlay' />
      <div className='result-modal-content'>
        {isCorrect && (
          <>
            <h3>
              👊👊👊
              <br />
              YOU WON!
            </h3>
          </>
        )}
        {!isCorrect && (
          <>
            <h3>
              😟😢😟
              <br />
              YOU LOST!
            </h3>
          </>
        )}

        <div className='correct-answer'>
          <small>The correct answer was:</small>
          <br />
          <strong
            dangerouslySetInnerHTML={{ __html: question.correct_anwser }}
          ></strong>
        </div>

        <button onClick={getQuestion}>Go to next question 👉</button>
      </div>
    </div>
  );
}
