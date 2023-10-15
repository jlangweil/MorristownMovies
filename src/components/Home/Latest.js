import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Latest.css';
import { Row, Col, Spinner } from 'react-bootstrap';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';

const Latest = () => {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogPost, setBlogPost] = useState(null);
  const [foodPost, setFoodPost] = useState(null);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  const SafeHTML = ({ html }) => {
    const sanitizedHTML = DOMPurify.sanitize(decodeURIComponent(html));
  
    return <p dangerouslySetInnerHTML={{ __html: sanitizedHTML }}></p>;
  };

  const fetchLatestContent = useCallback(async () => {
    try {
      setLoading(true);
      const reviewResponse = await axios.get(`${apiUrl}/latestreview`);
      setReview(reviewResponse.data);

      const blogResponse = await axios.get(`${apiUrl}/blog?action=latest`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      });
      console.log(blogResponse);
      setBlogPost(blogResponse.data[0]);

      const foodResponse = await axios.get(`${apiUrl}/latestreview?type=food`);
      setFoodPost(foodResponse.data);

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLatestContent();
  }, []);

  if (error) {
    return <center>Error: {error.message}</center>;
  }

  return (
    <>
        <div className="justify-content-center">
           <br/><br/><br/><br/><center><h3>Latest Reviews and News:</h3></center><br/><br/>
            </div>
            {review && (
              <>
              <Link to="/reviews" className="no-underline">
                <div className="latest-movie-review" key={review.id}>
                  <h2 className="latest-movie-name"><i className="fa fa-film fa-lg"/>&nbsp;&nbsp;{review.MovieName}</h2>
                  <p className="latest-review-text">{review.ReviewText}</p>
                  <p className="latest-user-name">Reviewed by {review.first_name} {review.last_name}</p>
                  <p className="latest-review-date">Date: {review.DateOfReview}</p>
                  <div className="latest-rating">
                    {Array.from({ length: Math.floor(review.Rating) }, (_, index) => (
                      <i className="fas fa-star full-star" key={index}></i>
                    ))}
                    {review.Rating % 1 !== 0 && (
                      <i className="fas fa-star-half-alt half-star" key="half"></i>
                    )}
                  </div>
                </div>
              </Link>
              </>
            )}
      <br/><br/><br/>

      {foodPost && (
      <>     
      <div className="latest-movie-review">
      <Link to="/food" className="no-underline">
            <Row > 
              <Col xs={10}>
                <h3 className="restaurant-name">
                <i className="fa fa-utensils fa-lg"></i>&nbsp;&nbsp;{foodPost.RestaurantName}
                </h3>
              </Col>
              {foodPost.cuisine && (
                <Col xs={2} className="d-flex justify-content-end">
                  <img
                    src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/${foodPost.cuisine.toLowerCase()}.svg`}
                    alt={`${foodPost.cuisine.toUpperCase()} Flag`}
                    width="32"
                    height="24"
                  />
                </Col>
              )}
            </Row>
            <Row>
              <Col xs={12}>
                <p className="restaurant-address">
                  {foodPost.StreetAddress}
                </p>
              </Col>
            </Row>
          
        <div className="review-separator"></div>
        <div className="review">
        <p className="review-text">{foodPost.ReviewText}</p>
          <div className="rating-stars">
          {[...Array(5)].map((_, index) => {
                  const filledStar = index < foodPost.Rating;

                  return (
                    <i
                      key={index}
                      className={`fa${filledStar ? "s" : "r"} fa-star`}
                      style={{ color: filledStar ? "gold" : "lightgray" }}
                    ></i>
                  );
                })}
          </div>
          <p className="review-user">Reviewed on {foodPost.ReviewDate} by {foodPost.first_name} {foodPost.last_name[0]}</p>
        </div>
        </Link>
        </div>
        <br/><br/><br/>
        </>
      )}
        
      <div>
        {loading ? (
      <center>
        <Spinner animation="border" role="status" />
      </center>
    ) : (
      <div>
        {blogPost && (
          <>
          <Link to="/blog" className="no-underline">
          <div key={blogPost.id} className="blogPage-post no-underline">
            <SafeHTML html={blogPost.BlogPost} />
            <p><i>Posted by: {blogPost.BlogAuthor} on {new Date(blogPost.BlogDateTime).toLocaleString()}</i></p>
          </div><br/><br/><br/>
          </Link>
          </>
        )}
      </div>
    )}
    </div>
    </>
  );
};

export default Latest;
