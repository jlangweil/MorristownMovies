import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserProfileIcon from '../UserProfile/UserProfileIcon';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

function Banner({ onButtonClick }) {

  const { currentUser, logout } = useAuth();
  const loggedIn = currentUser !== null;
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }
 

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
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
  </Row>
  <Row className="d-none d-xl-flex bg-darkred py-2">
  <Col className="text-center">
    <NavLink exact to="/" className="menu-link">Home</NavLink>
  </Col>
  <Col className="text-center">
    <NavLink exact to="/events" className="menu-link">Events</NavLink>
  </Col>
  <Col className="text-center">
    <NavLink exact to="/reviews" className="menu-link">Reviews</NavLink>
  </Col>
  <Col className="text-center">
    <NavLink exact to="/forum" className="menu-link">Forum</NavLink>
  </Col>
  <Col className="text-center">
    <NavLink exact to="/blog" className="menu-link">Blog</NavLink>
  </Col>
  <Col className="text-center">
    <NavLink exact to="/food" className="menu-link">Restaurants</NavLink>
  </Col>
  <Col className="text-center">
    <NavLink exact to="/gallery" className="menu-link">Gallery</NavLink>
  </Col>
  <Col className="text-center">
    <NavLink exact to="/games" className="menu-link">Games</NavLink>
  </Col>
</Row>


    </Container>
    <div className="auth-buttons pinned-hamburger">
    {loggedIn && (
              // <Link to="/user"><UserProfileIcon initial={currentUser[0]} showArrow /></Link>
              <div onClick={toggleDropdown}>
              <UserProfileIcon initial={currentUser[0]} showArrow />
              {dropdownOpen && (
                <div className="user-menu">
                  <Link to="/user">Profile</Link>
                  <br/>
                  <Link to="/members">Members</Link>
                </div>
              )}
            </div>
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
            <Button className="hamburger d-xl-none" onClick={onButtonClick}>
    &#9776;
  </Button>
    </div>
    
  </>
  );
}
export default Banner;
