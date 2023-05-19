import React, { useState, useEffect } from 'react';
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
        <>
        <br />
        <div className="movie-quote-container">
        <div className="movie-quote-text">
           <p>{movieQuote.quote}</p>
           <br />
      </div>
        <div className="movie-quote-details">
         <p>{movieQuote.movie} ({movieQuote.year})</p>
        </div>
        </div></>
    
  );
};

export default MovieQuote;
