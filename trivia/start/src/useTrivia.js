import React, { useState, useEffect, useCallback } from 'react';

export const useTrivia = () => {
  const [question, setQuestion] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('any');

  const getQuestion = useCallback(async () => {
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

  useEffect(() => {
    getQuestion();
  }, [selectedCategory, getQuestion]);

  return {
    question,
    getQuestion,
    selectedCategory,
    setSelectedCategory,
  };
};
