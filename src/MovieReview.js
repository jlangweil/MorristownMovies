import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './MovieReview.css';
import { Container, Row, Col, Button, Modal, Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import FilterDropdown from './components/Utils/FilterDropdown';
import MovieReviewAdd from './MovieReviewAdd';


const MovieReview = () => {
    const [reviews, setReviews] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [showAddReviewModal, setShowAddReviewModal] = useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;

    const toggleAddReviewModal = (submitted = false) => {
        if (submitted) {
          // Call the function that fetches the reviews, e.g., fetchReviews()
          fetchReviews();
        }
        setShowAddReviewModal(!showAddReviewModal);
      };

      const onReviewSubmitted = () => {
        // Reset state variables
        setPage(1);
        setHasMore(true);
        setLoading(true);
        setReviews([]);
        
        // Call fetchReviews
        fetchReviews();
      
        // Hide the MovieReviewAdd component
        setShowAddReviewModal(false);
      };

  
    const fetchMovies = useCallback(async () => {
        try {
          const response = await axios.get('${apiUrl}/movies');
          setMovies(response.data);
        } catch (error) {
          console.error(error);
        }
      }, []);
    
      useEffect(() => {
        fetchMovies();
      }, [fetchMovies]);

      const fetchReviews = useCallback(async () => {
        try {
          const response = await axios.get(`${apiUrl}/reviews?page=${page}&limit=10&movie=${encodeURIComponent(filter)}`);
          console.log(`URL: ${apiUrl}`);
          if (response.data.length === 0) {
            setHasMore(false);
          } else {
            setReviews(prevReviews => (page === 1 ? response.data : [...prevReviews, ...response.data]));
            setPage(prevPage => prevPage + 1);
          }
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      }, [page, filter]);
    
      useEffect(() => {
        setPage(1);
        fetchReviews();
      }, [filter, fetchReviews]);
       
    
      if (loading) {
        return <center><Spinner animation="border" role="status"/></center>;
      }
    
      if (error) {
        return <center>Error: {error.message}</center>;
      }
    
      return (
        <>
        <Container>
        <Row className="justify-content-center">
            <Col lg={8}>
            <div className="filter-add-container">
                <h3>Member Reviews</h3>
            </div>
        </Col>
        </Row>
        <Row className="justify-content-center">
            <Col lg={8}>
            <div className="filter-add-container">
                <FilterDropdown movies={movies} setFilter={setFilter} />
                <button className="add-review-button" onClick={toggleAddReviewModal}>
                <i className="fas fa-plus"></i>
                </button>
            </div>
        </Col>
        </Row>
        <Modal show={showAddReviewModal} onHide={toggleAddReviewModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add a Movie Review</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <MovieReviewAdd onReviewSubmitted={onReviewSubmitted} />
            </Modal.Body>
        </Modal>
        <Row className="justify-content-center">
            <Col lg={8}>
                <InfiniteScroll
                dataLength={reviews.length}
                next={fetchReviews}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p><center>End of Reviews</center></p>}
                >
                {reviews
                .filter(review => (filter === '' || review.MovieName === filter))
                .map(review => (
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
                ))}
                </InfiniteScroll>
            </Col>
        </Row>
        </Container>
        </>
    );
    };

export default MovieReview;