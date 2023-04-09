import React from "react";
import "./StarRating.css";

const StarRating = ({ rating, setRating }) => {
  const decreaseRating = () => {
    if (rating > 0) {
      setRating(rating - 0.5);
    }
  };

  const increaseRating = () => {
    if (rating < 5) {
      setRating(rating + 0.5);
    }
  };

  return (
    <div className="input-group">
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="decreaseRating"
        onClick={decreaseRating}
        disabled={rating === 0}
      >
        -
      </button>
      <div className="star-rating-input">
        <i className="fas fa-star fa-3x"></i>
        <span className="star-rating-value">{rating.toFixed(1)}</span>
      </div>
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="increaseRating"
        onClick={increaseRating}
        disabled={rating === 5}
      >
        +
      </button>
    </div>
  );
};

export default StarRating;
