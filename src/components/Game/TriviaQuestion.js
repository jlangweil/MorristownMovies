// TriviaQuestion.js
import React, { useState } from 'react';
import './TriviaQuestion.css';

const TriviaQuestion = ({ question, answers, correctAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
  };

  const answerLetter = ['a', 'b', 'c', 'd'];

  return (
    <div className="triviaContainer">
      <h3 className="question">{question}</h3>
      {answers.map((answer, index) => (
        <div
          key={index}
          className={`answer ${
            isAnswered
              ? index === answerLetter.indexOf(correctAnswer)
                ? 'correct'
                : selectedAnswer === index
                ? 'incorrect'
                : ''
              : ''
          }`}
          onClick={() => handleAnswerClick(index)}
        >
          {`${answerLetter[index].toUpperCase()}. ${answer}`}
        </div>
      ))}
    </div>
  );
};

export default TriviaQuestion;
