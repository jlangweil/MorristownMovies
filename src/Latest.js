import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Latest.css';
import { Container, Row, Col, Button, Modal, Spinner } from 'react-bootstrap';
import DOMPurify from 'dompurify';
import blogTitle from './images/blog.JPG';
import { Link } from 'react-router-dom';

const Latest = () => {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogPost, setBlogPost] = useState(null);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  const SafeHTML = ({ html }) => {
    const sanitizedHTML = DOMPurify.sanitize(decodeURIComponent(html));
  
    return <p dangerouslySetInnerHTML={{ __html: sanitizedHTML }}></p>;
  };

  const fetchLatestReview = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/latestreview`);
      setReview(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, []);

  const fetchLatestContent = useCallback(async () => {
    try {
      const reviewResponse = await axios.get(`${apiUrl}/latestreview`);
      setReview(reviewResponse.data);

      const blogResponse = await axios.get(`${apiUrl}/latestblog`);
      setBlogPost(blogResponse.data);

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLatestContent();
  }, [fetchLatestContent]);

  if (loading) {
    return (
      <center>
        <Spinner animation="border" role="status" />
      </center>
    );
  }

  if (error) {
    return <center>Error: {error.message}</center>;
  }

  return (
    <>
      {/* <Container>
        <Row className="justify-content-center"> 
          <Col lg={12}>  */}
            <div className="justify-content-center">
            <br/><br/><br/><br/><center><h3>Latest Reviews and News:</h3></center><br/>
            </div>
          {/* </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={12}> */}
            {review && (
              <Link to="/reviews" className="no-underline">
                <div className="latest-movie-review" key={review.id}>
                  <h2 className="latest-movie-name">{review.MovieName}</h2>
                  <p className="latest-review-text">{review.ReviewText}</p>
                  <p className="latest-user-name">Reviewed by {review.UserName}</p>
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
            )}
          {/* </Col>
        </Row>
      </Container> */}<br/><br/>
      <div>
        {/* <Container className="blogPage">
            <Row className="justify-content-center"> */}
              <Link to="/blog" className="no-underline">
                {/* <Col lg={12}> */}
                <center><img src={blogTitle} alt="Morristown Movie Blog" className="blogPage-title"/></center>
                {/* </Col> */}
              </Link>
            {/* </Row>
            
        </Container> */}<br/>
        {loading ? (
      <center>
        <Spinner animation="border" role="status" />
      </center>
    ) : (
      <div>
        {blogPost && (
          <Link to="/blog" className="no-underline">
          <div key={blogPost.id} className="blogPage-post no-underline">
            <SafeHTML html={blogPost.BlogPost} />
            <p><i>Posted by: {blogPost.BlogAuthor} on {new Date(blogPost.BlogDateTime).toLocaleString()}</i></p>
          </div><br/><br/><br/>
          </Link>
          
        )}
      </div>
    )}
    </div>
    </>
  );
};

export default Latest;
