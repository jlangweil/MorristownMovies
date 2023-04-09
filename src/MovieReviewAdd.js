import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from './AuthContext';
import StarRating from './StarRating';

import './MovieReviewAdd.css';

const MovieReviewAdd = ({onReviewSubmitted}) => {
const [movieName, setMovieName] = useState('');
const [reviewText, setReviewText] = useState('');
const [userName, setUserName] = useState('');
const [rating, setRating] = useState(0);
const [movieNameError, setMovieNameError] = useState('');
const [reviewTextError, setReviewTextError] = useState('');
const [serverError, setServerError] = useState('');
const { currentUser } = useAuth();


const validateForm = () => {
    let isValid = true;
  
    if (movieName.trim() === '') {
      setMovieNameError('Movie name is required');
      isValid = false;
    } else {
      setMovieNameError('');
    }
  
    if (reviewText.trim() === '') {
      setReviewTextError('Review text is required');
      isValid = false;
    } else {
      setReviewTextError('');
    }
  
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (validateForm()) {
      try {
        // Perform API call to save the review
        const currentDate = new Date().toISOString();
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/reviews`, {
          MovieName: movieName,
          ReviewText: reviewText,
          UserName: currentUser,
          DateOfReview: currentDate,
          Rating: rating,
        });
  
        // Clear form data
        setMovieName('');
        setReviewText('');
        setUserName(currentUser);
        setRating(0);
  
        // Hide the form after submitting the review
        if (response.status === 200 || response.status === 201) {
            if (onReviewSubmitted) {
              console.log('about to call onReviewSubmitted');
              onReviewSubmitted();
            }
          }
      } catch (error) {
        setServerError('An error occurred while submitting the review.');
      }
    }
  };
  

  const [formData, setFormData] = useState({
    MovieName: "",
    ReviewText: "",
    UserName: "",
    DateOfReview: "",
    Rating: 0,
  });

  return (
    <div className="movieReviewAdd">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="movieName">
          <Form.Label>Movie Name</Form.Label>
          <Form.Control
            type="text"
            value={movieName}
            required
            onChange={(event) => setMovieName(event.target.value)}
         />
         {movieNameError && <div className="error-message">{movieNameError}</div>}
        </Form.Group>
  
        <Form.Group controlId="reviewText">
          <Form.Label>Review Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={reviewText}
            required
            onChange={(event) => setReviewText(event.target.value)}
          />
           {reviewTextError && <div className="error-message">{reviewTextError}</div>}
        </Form.Group>
  
        <Form.Group controlId="userName">
          <Form.Label>Reviewed by</Form.Label>
          <p style={{ color: 'white' }}>{currentUser}</p>
        </Form.Group>

        <Form.Group controlId="rating">
          <Form.Label>Rating</Form.Label>
          <StarRating rating={rating} setRating={setRating} />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {serverError && <div className="error-message"><br/>{serverError}</div>}
      </Form>
    </div>
  );
};

export default MovieReviewAdd;

    