import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaMeetup } from 'react-icons/fa';
import './Home.css';
import Testimonial from './Testimonial';
import MovieQuote from '../Movies/MovieQuote';
import meetupImage from '../../images/logo.jpg';
import catsImage from '../../images/cats.jpg';
import Latest from './Latest';
import TopMovies from '../Movies/TopMovies';
import { Link } from 'react-router-dom';

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
          <center><Link to="/signup"><Button variant="primary">
            Register
          </Button></Link>&nbsp;&nbsp;&nbsp;<Button variant="primary" style={{backgroundColor:'red'}} onClick={handleClick}>
            Join Meetup! <FaMeetup/>
          </Button>
          </center>
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
        
        <TopMovies/>

        <Row className="justify-content-center">
          <Col lg={8}>
            <MovieQuote />
          </Col>
        </Row>

        <Row className="justify-content-center">
            <Col xs={12} lg={8}>
                <Testimonial />
            </Col>
        </Row>
        

        <Row className="justify-content-center">
            <Col lg={8}>
                <Latest />
            </Col>
        </Row>

        <Row className="justify-content-center">
            <Col lg={8}>
            <Link to="/gallery" className="custom-link">
              <div className="image-caption-container">
                  <img src={catsImage} alt="cats" className="meetup-image" />
                  <div className="caption">Cats of Morristown Movies - Coming Soon!</div>
              </div>
            </Link>
            </Col>
        </Row>

      </Container>
    </>
  );
};

export default Home;
