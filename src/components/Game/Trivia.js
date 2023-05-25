// Trivia.js
import React from 'react';
import TriviaQuestion from './TriviaQuestion';

const Trivia = () => {
  return (
    <div>
      <h1>Trivia Questions</h1>
      <TriviaQuestion
        question="What's the capital of France?"
        answers={["Paris", "Berlin", "Madrid", "Rome"]}
        correctAnswer="a"
      />
    </div>
  );
};

export default Trivia;
