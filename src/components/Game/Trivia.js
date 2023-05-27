import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Trivia.css';

function Trivia() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsAnswered(false); // Add this line
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/games`, {}, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    });
    setQuestions(response.data);
    setLoading(false);
    setIsAnswered(false); // Add this line
  };

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    if (answerIndex === answerLetter.indexOf(questions[currentQuestionIndex].answer)) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestionClick = () => {
    setCurrentQuestionIndex(prevCurrentQuestionIndex => prevCurrentQuestionIndex + 1);
    setIsAnswered(false);
    setSelectedAnswer(null);
  };

  const handleNewGameClick = () => {
    fetchQuestions();
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setIsAnswered(false); // Add this line
  };

  const handleShowScoreClick = () => {
    setShowScore(true);
  };

  const answerLetter = ['a', 'b', 'c', 'd'];

  return (
    <div className="triviaContainer">
      {loading && (
        <p>Loading...</p>
      )}
      {!loading && questions.length > 0 && !showScore && (
        <>
          <div className="questionStatus">Question {currentQuestionIndex + 1}/5</div>
          <h2 className="question">{questions[currentQuestionIndex].question}</h2>
          {['choicea', 'choiceb', 'choicec', 'choiced'].map((choice, index) => (
            <div
              key={index}
              className={`answer ${!isAnswered && selectedAnswer === index ? 'selected' : ''} 
                          ${isAnswered && index === answerLetter.indexOf(questions[currentQuestionIndex].answer) ? 'correct' : ''}
                          ${isAnswered && selectedAnswer === index && index !== answerLetter.indexOf(questions[currentQuestionIndex].answer) ? 'incorrect' : ''}`}
              onClick={!isAnswered ? () => handleAnswerClick(index) : null}
            >
              {`${answerLetter[index].toUpperCase()}. ${questions[currentQuestionIndex][choice]}`}
            </div>
          ))}
          {isAnswered && currentQuestionIndex < questions.length - 1 && (
            <button className="nextButton" onClick={handleNextQuestionClick}>Next</button>
          )}
          {isAnswered && currentQuestionIndex === questions.length - 1 && (
            <button className="showScoreButton" onClick={handleShowScoreClick}>See Score</button>
          )}
        </>
      )}
      {!loading && showScore && (
        <>
          <h3 className="finalScore">Final score: {score}/{questions.length}</h3><br/>
          <center><button className="newGameButton" onClick={handleNewGameClick}>New Game</button></center>
        </>
      )}
    </div>
  );
}

export default Trivia;
