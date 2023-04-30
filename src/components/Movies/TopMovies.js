import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import './TopMovies.css';

const TopMovies = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await axios.get(`${apiUrl}/movies?topMovies=true`);
        setTopMovies(response.data);
      } catch (error) {
        console.error('Error fetching top movies:', error);
      }
    };

    fetchTopMovies();
  }, []);

  return (
    <Container className="top-movies-container">
      <Row className="justify-content-center">
        <Col className="mb-3 mx-auto text-center"><br/><h3>What's Hot:</h3></Col>
      </Row>
      <Row className="justify-content-center top-movies-row">
        <Col xs={12} sm={4} md={2} className="top-movie-col">
          {topMovies[0] && <img src={topMovies[0].poster_path} alt="Top Movie 1" />}
        </Col>
        <Col xs={6} sm={4} md={2} className="top-movie-col">
          {topMovies[1] && <img src={topMovies[1].poster_path} alt="Top Movie 2" />}
        </Col>
        <Col xs={6} sm={4} md={2} className="top-movie-col">
          {topMovies[2] && <img src={topMovies[2].poster_path} alt="Top Movie 3" />}
        </Col>
        <Col xs={6} sm={4} md={2} className="top-movie-col">
          {topMovies[3] && <img src={topMovies[3].poster_path} alt="Top Movie 4" />}
        </Col>
        <Col xs={6} sm={4} md={2} className="top-movie-col">
          {topMovies[4] && <img src={topMovies[4].poster_path} alt="Top Movie 5" />}
        </Col>
      </Row>
    </Container>
  );
};

export default TopMovies;

