import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './MovieReview.css';
import { Container, Row, Col, Button, Modal, Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import FilterDropdown from '../Utils/FilterDropdown';
import MovieReviewAdd from './MovieReviewAdd';
import MovieReviewEdit from './MovieReviewEdit';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';


function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}
const MovieReview = () => {
    const [reviews, setReviews] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [showAddReviewModal, setShowAddReviewModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [reviewIdToDelete, setReviewIdToDelete] = useState(null);
    const [showEditReviewModal, setShowEditReviewModal] = useState(false);
    const [reviewToEdit, setReviewToEdit] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;
    //const apiUrl = 'http://localhost:4000/api';

    const { currentUser } = useAuth();
    const { userId } = useAuth();

    const navigate = useNavigate();

    const handleEditReviewClick = (review) => {
      setReviewToEdit(review);
      toggleEditReviewModal();
    };
    

    const toggleAddReviewModal = (submitted = false) => {
      if (!currentUser) {
        navigate('/login');
        return;
      }
      if (submitted) {
        // Call the function that fetches the reviews, e.g., fetchReviews()
        fetchReviews();
      }
      setShowAddReviewModal(!showAddReviewModal);
    };

    const toggleEditReviewModal = () => {
      if (!currentUser) {
        navigate('/login');
        return;
      }
      setShowEditReviewModal(!showEditReviewModal);
    };
    

    const handleDeleteReviewClick = (reviewId) => {
      setReviewIdToDelete(reviewId);
      setShowConfirmModal(true);
    };

    const handleDeleteReview = async () => {
      try {
        const response = await axios.delete(`${apiUrl}/reviews?id=${reviewIdToDelete}`);
  
        if (response.status === 200) {
          // Refresh the reviews after deletion
          setPage(1);
          setHasMore(true);
          setLoading(true);
          setReviews([]);
          fetchReviews();
  
          // Close the confirm modal
          setShowConfirmModal(false);
        }
      } catch (error) {
        console.error(error);
        alert('Error deleting the review');
      }
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

      const onReviewUpdated = () => {
        // Reset state variables
        setPage(1);
        setHasMore(true);
        setLoading(true);
        setReviews([]);
      
        // Call fetchReviews
        fetchReviews();
      
        // Hide the MovieReviewAdd component
        setShowEditReviewModal(false);
      };
      
     const fetchMovies = useCallback(async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/movies`);
          setMovies(response.data);
        } catch (error) {
          console.error(error);
        }
      }, []);
    
      useEffect(() => {
        fetchMovies();
      }, [fetchMovies]);
      

      const fetchReviews = useCallback(
        debounce(async () => {
        try {
          const response = await axios.get(`${apiUrl}/reviews?page=${page}&limit=10&movie=${encodeURIComponent(filter)}`, {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
          });
          console.log(`URL: ${apiUrl}`);
          if (response.data.length < 10) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
          setReviews(prevReviews => (page === 1 ? response.data : [...prevReviews, ...response.data]));
          if (page !== 1) {
            setPage(prevPage => prevPage + 1);
          }
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      }, 300),
      [page, filter]);
      
      useEffect(() => {
        // Reset page state when filter changes
        setPage(1);
        setHasMore(true);
        setLoading(true);
        setReviews([]);
      
        // Call fetchReviews
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
        <Modal show={showEditReviewModal} onHide={toggleEditReviewModal} centered backdrop="static">
  <Modal.Header closeButton>
    <Modal.Title>Edit a Movie Review</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <MovieReviewEdit onReviewUpdated={onReviewUpdated} movies={movies} reviewToEdit={reviewToEdit} />
  </Modal.Body>
</Modal>{/* <button className="edit-review-button" onClick={toggleEditReviewModal}>
  Edit Review
</button> */}
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
        <Modal show={showAddReviewModal} onHide={toggleAddReviewModal} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Add a Movie Review</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <MovieReviewAdd onReviewSubmitted={onReviewSubmitted} movies={movies}/>
            </Modal.Body>
        </Modal>
        <Row className="justify-content-center">
            <Col lg={8}>
                <InfiniteScroll
                dataLength={reviews.length}
                next={() => fetchReviews(page)}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<center>End of Reviews</center>}
                >
                {reviews
                .filter(review => (filter === '' || review.MovieName === filter))
                .map(review => (
                    <div className="movie-review" key={review.id}>
                    <h2 className="movie-name">{review.MovieName}</h2>
                    <p className="review-text">{review.ReviewText}</p>
                    <p className="user-name">Reviewed by {review.first_name} {review.last_name}</p>
                    <p className="review-date">Date: {review.DateOfReview}</p>
                    <div className="rating">
                    <div className="stars">
                      {Array.from({ length: Math.floor(review.Rating) }, (_, index) => (
                        <i className="fas fa-star full-star" key={index}></i>
                      ))}
                      {review.Rating % 1 !== 0 && (
                        <i className="fas fa-star-half-alt half-star" key="half"></i>
                      )}
                    </div>
                    {userId && Number(userId) === Number(review.UserID) && (
                     <div style={{ display: 'flex' }}>
                       <i className="fa-solid fa-pen" title="Edit" onClick={() => handleEditReviewClick(review)}></i>
                       <i className="fa-solid fa-trash-can" title="Delete" onClick={() => handleDeleteReviewClick(review.id)}></i>
                    </div>
                    )} 
                  </div>
                </div>
                ))}
               <Modal className="custom-modal delete-modal with-custom-backdrop" show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered backdrop="static">
                  <Modal.Header closeButton>
                    <Modal.Title>Delete Review</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure you want to delete this review?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteReview} >
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
                </InfiniteScroll>
            </Col>
        </Row>
        </Container>
        </>
    );
    };

export default MovieReview;