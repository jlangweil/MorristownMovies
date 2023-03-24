/* import React from 'react';
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

export default MovieReview; */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieReview.css';

const MovieReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://morristown-movies.onrender.com/reviews')
      .then(response => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {reviews.map(review => {
        return (
          <div className="movie-review" key={review.id}>
            <h2 className="movie-name">{review.MovieName}</h2>
            <p className="review-text">{review.ReviewText}</p>
            <p className="user-name">Reviewed by {review.UserName}</p>
            <p className="review-date">Date: {review.DateOfReview}</p>
            <div className="rating">
              {Array.from({ length: Math.floor(review.Rating) }, (_, index) => (
                <i className="fas fa-star full-star" key={index}></i>
              ))}
              {review.Rating % 1 !== 0 && (
                <i className="fas fa-star-half-alt half-star" key="half"></i>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
  
};

export default MovieReview;

