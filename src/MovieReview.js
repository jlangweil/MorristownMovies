import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './MovieReview.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import FilterDropdown from './components/Utils/FilterDropdown';

const MovieReview = () => {
    const [reviews, setReviews] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("");
  
    const fetchMovies = useCallback(async () => {
        try {
          const response = await axios.get('https://movies-six-gilt.vercel.app/api/movies');
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
          const response = await axios.get(`https://movies-six-gilt.vercel.app/api/reviews?page=${page}&limit=10&movie=${encodeURIComponent(filter)}`);
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
      }, [filter]);
      
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
    
      return (
        <>
        <div className="filter-add-container">
            <FilterDropdown movies={movies} setFilter={setFilter} />
            <button className="add-review-button" onClick={() => {/* Functionality to open MovieReviewAdd component */}}>
            <i className="fas fa-plus"></i>
            </button>
        </div>
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
        </>
    );
    };

export default MovieReview;