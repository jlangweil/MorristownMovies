import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserProfileIcon from './components/UserProfile/UserProfileIcon';

function Banner({ onButtonClick }) {
  return (
    <Container fluid>
      <Row className="align-items-center">
        <Col xl={2} className="text-end">
         
        </Col>
        <Col xl={8} className="text-center">
          <div class="banner-text">The Morristown Movie & Dining (and More) Meetup Group</div>
        </Col>
        <Col xl={2} className="d-flex justify-content-end">
            <div className="auth-buttons">
                <UserProfileIcon initial="J" />
                <button>Sign Up</button>
                <button>Log Out</button>
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