import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faMeetup, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="justify-content-between">
          <Col xs={12} sm={4}>
            <h5>About Morristown Movie and Dinner Meetup</h5>
            <p>
              We are a group of movie enthusiasts who love watching and discussing films together. Join us
              for movie nights and dinner, and online events, in the Morristown area.
            </p>
          </Col>
          <Col xs={12} sm={4}>
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><a href="#">Events</a></li>
              <li><Link to="gallery">Gallery</Link></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </Col>
          <Col xs={12} sm={4}>
            <h5>Connect with Us</h5>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="social-icon">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://discord.com/channels/964877736822837349/965064633704661042" className="social-icon">
                <FontAwesomeIcon icon={faDiscord} />
              </a>
              <a href="https://www.meetup.com/movies-594/" className="social-icon">
                <FontAwesomeIcon icon={faMeetup} />
              </a>
            </div>
          </Col>
        </Row>
        <hr className="footer-divider" />
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <p>&copy; {new Date().getFullYear()} Morristown Movie and Dining Meetup. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
