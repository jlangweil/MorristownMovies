// RestaurantReview.js

import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './RestaurantReview.css';

function RestaurantReview(props) {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit();
    // Handle the form submission logic here
    
  };

  const handleStarClick = (index) => {
    setRating(index);
  };

  return (
    <div className="food-review">
        <Form onSubmit={handleSubmit}>
        <Row className="justify-content-center">
            <Col xs={12} lg={8} className="mb-3 mx-auto">
                <Form.Group controlId="reviewText">
                    <Form.Label>Review {props.restaurantBeingReviewed}</Form.Label>
                    <Form.Control
                    as="textarea"
                    rows={3}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    />
                </Form.Group>
            </Col>
      </Row>
      <Row className="justify-content-center">
      <Col xs={12} lg={8} className="mb-3 mx-auto">
        <Form.Group controlId="reviewStars">
          <Form.Label className="d-flex justify-content-center">Rate the Restaurant:</Form.Label>
          <div className="d-flex justify-content-center">
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <i
                key={starIndex}
                className={`fa-star ${rating >= starIndex ? 'fas' : 'far'}`}
                style={{ color: 'yellow', cursor: 'pointer', margin: '0 3px' }}
                onClick={() => handleStarClick(starIndex)}
              ></i>
            ))}
          </div>
        </Form.Group>
      </Col>
    </Row>

      <Row className="justify-content-center">
        <Col xs={12} lg={8} className="d-flex justify-content-end mb-3 mx-auto"> 
           
            <Button variant="primary" type="submit">
            Submit
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="secondary" type="cancel" onClick={props.onCancel}>
            Cancel
            </Button>
        </Col>
       
    </Row>
    
    </Form>
    </div>
    
  );
}

export default RestaurantReview;
