// Games.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Games.css';

const Games = () => {
  return (
    <>
      <div className="games-header">Games</div>
      <div className="games-container">
        <Link to="/wordle" style={{ textDecoration: 'none' }}> 
          <div className="game-card">
            <div className="gameLink">HollyWordle</div>
            <div className="game-description">
              HollyWordle is a daily word game.<br/>You have 6 attempts to guess the secret 5-letter word.<br/>Each will reveal letters in the correct place (green), correct letters in the wrong place (yellow), and incorrect letters.
            </div>
          </div>
        </Link>
        <Link to="/trivia" style={{ textDecoration: 'none' }}>
          <div className="game-card">
            <div className="gameLink">Hollywood Trivia</div>
            <div className="game-description">
              Test your knowledge with Hollywood Trivia.<br/>Answer multiple choice questions about movies and movie stars.
            </div>
          </div>
        </Link>
        <Link to="/blanks" style={{ textDecoration: 'none' }}>
          <div className="game-card">
            <div className="gameLink">Hollywood MadLibs</div>
            <div className="game-description">
              Mad Libs with a Movie and TV vibe.<br/>Select AI generated stories and fill in the blanks!
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Games;
