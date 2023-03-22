import React from 'react';
import './MovieReview.css';

const MovieReview = ({ movieName, reviewText, userName, numberOfStars, dateOfReview }) => {
  const stars = [];
  for (let i = 1; i <= Math.floor(numberOfStars); i++) {
    stars.push(<i className="fas fa-star full-star" key={i}></i>);
  }

  if (numberOfStars % 1 !== 0) {
    stars.push(<i className="fas fa-star-half-alt half-star" key="half"></i>);
  }

  return (
    <div className="movie-review">
      <h2 className="movie-name">{movieName}</h2>
      <p className="review-text">{reviewText}</p>
      <p className="user-name">Reviewed by {userName}</p>
      <p className="review-date">Date: {dateOfReview}</p>
      <div className="rating">{stars}</div>
    </div>
  );
};

export default MovieReview;
