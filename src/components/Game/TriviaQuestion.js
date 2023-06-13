// TriviaQuestion.js
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';  // Importing Container, Row and Col from react-bootstrap
import './TriviaQuestion.css';

const TriviaQuestion = ({ question, answers, correctAnswer, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === correctAnswer;
    onAnswer(isCorrect);
  };

  const answerLetter = ['a', 'b', 'c', 'd'];

  return (
    <Container className="triviaContainer">  
      <Row className="justify-content-center">
        <Col xs={8} className="px-2">
          <h2 className="question">{question}</h2>
          {answers.map((answer, index) => (
            <div
              key={index}
              className={`answer ${selectedAnswer === index ? (index === answerLetter.indexOf(correctAnswer) ? 'correct' : 'incorrect') : ''}`}
              onClick={() => handleAnswerClick(index)}
            >
              {`${answerLetter[index].toUpperCase()}. ${answer}`}
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default TriviaQuestion;
