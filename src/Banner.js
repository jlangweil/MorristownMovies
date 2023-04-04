import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserProfileIcon from './components/UserProfile/UserProfileIcon';

function Banner({ onButtonClick, loggedIn, onLoginToggle }) {
  return (
    <Container fluid>
      <Row className="align-items-center">
        <Col xl={2} className="text-end">
         
        </Col>
        <Col xl={8} className="text-center">
          <div className="banner-text">The Morristown Movie <span className="default-font">&</span> Dining Meetup Group</div>
        </Col>
        <Col xl={2} className="d-flex justify-content-xl-end justify-content-center">
            <div className="auth-buttons">
                {/* <UserProfileIcon initial="J" /> */}
                <button>Sign Up</button>
                <button onClick={onLoginToggle}>
                    {loggedIn ? "Signout" : "Login"}
                </button>
                <button className="hamburger" onClick={onButtonClick}>
                    &#9776;
                </button>
            </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Banner;