import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './MovieQuote.css';
import quotesData from './quotes.json';

const MovieQuote = () => {
  const [movieQuote, setMovieQuote] = useState({});

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotesData.length);
    const randomQuote = quotesData[randomIndex];
    setMovieQuote(randomQuote);
  }, []);

  return (
   
        <div className="movie-quote-container">
        <div className="movie-quote-text">
           <p>{movieQuote.quote}</p>
      </div>
        <div className="movie-quote-details">
         <p>{movieQuote.movie} ({movieQuote.year})</p>
        </div>
        </div>
    
  );
};

export default MovieQuote;
