import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserProfileIcon from './components/UserProfile/UserProfileIcon';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Banner({ onButtonClick }) {

  const { currentUser, logout } = useAuth();
  const loggedIn = currentUser !== null;
  const navigate = useNavigate();
  

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Container fluid>
      <Row className="align-items-center">
        <Col xl={2} className="text-end">
         
        </Col>
        <Col xl={8} className="text-center">
            <div className="banner-text">
              <Link to="/" className="text-decoration-none text-reset">
                 The Morristown Movie <span className="default-font">&</span> Dining Meetup Group
            </Link>
        </div>
        </Col>
        <Col xl={2} className="d-flex justify-content-xl-end justify-content-center">
          <div className="auth-buttons d-flex align-items-center">
            {loggedIn && (
              <UserProfileIcon initial={currentUser[0]} />
            )}
            {!loggedIn && (
              <Link to="/signup">
                <Button variant="primary" className="responsive-text">Sign Up</Button>
              </Link>
            )}
            <Button
              variant="secondary"
              onClick={loggedIn ? handleLogout : () => navigate('/login')}
            >
              {loggedIn ? 'Logout' : 'Login'}
            </Button>
            <Button className="hamburger" onClick={onButtonClick}>
              &#9776;
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Banner;
