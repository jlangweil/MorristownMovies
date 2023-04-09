import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserProfileIcon from './components/UserProfile/UserProfileIcon';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Banner({ onButtonClick }) {

  const { currentUser, logout } = useAuth();
  const loggedIn = currentUser !== null;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container fluid>
      <Row className="align-items-center">
        <Col xl={2} className="text-end">
         
        </Col>
        <Col xl={8} className="text-center">
          <div className="banner-text">The Morristown Movie <span className="default-font">&</span> Dining Meetup Group</div>
        </Col>
        <Col xl={2} className="d-flex justify-content-xl-end justify-content-center">
          <div className="auth-buttons d-flex align-items-center">
                {loggedIn && (
                <UserProfileIcon initial="J" /> 
                )}
                {!loggedIn && (
                  <Link to="/signup">
                    <Button variant="primary">Sign Up</Button>
                  </Link>
                )}
                <Link to={loggedIn ? '/' : '/login'}>
                  <Button variant="secondary" onClick={loggedIn ? handleLogout : null}>
                    {loggedIn ? 'Logout' : 'Login'}
                  </Button>
                </Link>
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
