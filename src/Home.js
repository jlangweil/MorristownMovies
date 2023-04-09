import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Home.css';
import Testimonial from './Testimonial';
import MovieQuote from './MovieQuote';
import meetupImage from './images/logo.jpg';
import catsImage from './images/cats.jpg';
import Latest from './Latest';
import Blog from './components/Blog/Blog';

const Home = () => {

    const handleClick = () => {
        window.open("https://www.meetup.com/movies-594/", "_blank");
      };  

  return (
    <>
      <Container>
        
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="mission-statement">
                <h1 className="mission-statement-heading">
                    What's better than seeing a movie, then discussing it over food and drink?
                </h1>
                <div className="white-rule">
                </div>
                <p className="mission-statement-text">
                    In Morristown, it's easy enough to do both! Enjoy a great movie, discover a new place with delicious food, and have stimulating conversation with friendly, interesting people. We'll enjoy a broad, eclectic range of movies and a variety of food. Join our regular virtual events, too! All movie fans are welcome. Hope you can join us!
                </p>
            </div>
          </Col>
        </Row>

       <Row className="justify-content-center">
        <Col xs="auto">
          <Button variant="primary" onClick={handleClick}>
            Join Us!
          </Button>
        </Col>
      </Row>

        <Row className="justify-content-center">
            <Col lg={7}>
                <div className="image-container">
                <a href="https://www.meetup.com/movies-594/" target="_blank" rel="noreferrer">
                    <img src={meetupImage} alt="Meetup" onClick={handleClick} className="meetup-image" />
                </a>
                </div>
            </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={8}>
            <MovieQuote />
          </Col>
        </Row>

        <Row className="justify-content-center">
            <Col lg={8}>
                <Testimonial />
            </Col>
        </Row>
        

        <Row className="justify-content-center">
            <Col lg={8}>
                <Latest />
            </Col>
        </Row>

        <Row className="justify-content-center">
            <Col lg={7}>
            <div className="image-caption-container">
                <img src={catsImage} alt="cats" className="meetup-image" />
                <div className="caption">Cats of Morristown Movies - Coming Soon!</div>
            </div>
            </Col>
        </Row>

      </Container>
    </>
  );
};

export default Home;
