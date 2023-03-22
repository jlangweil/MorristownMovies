import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import './App.css';
import UserProfileIcon from './components/UserProfile/UserProfileIcon';
import OAuthLogin from './components/Login/OAuthLogin';
import Events from './Events';
import Banner from './Banner';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  const [user, setUser] = useState(null);

  const handleGoogleSuccess = (response) => {
    const profile = response.getBasicProfile();
    const userData = {
      id: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
      imageUrl: profile.getImageUrl(),
      accessToken: response.getAuthResponse().id_token,
    };
    setUser(userData);
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Login Error:', error);
  };

  const handleFacebookSuccess = (response) => {
    const userData = {
      id: response.userID,
      name: response.name,
      email: response.email,
      imageUrl: response.picture.data.url,
      accessToken: response.accessToken,
    };
    setUser(userData);
  };

  const handleFacebookFailure = (error) => {
    console.error('Facebook Login Error:', error);
  };

  return (
    <div className="App">
      <header className="App-header">
{/*         <div className="centered-div">
           <h1 className="banner-text">The Morristown Movie & Dining (and More) Meetup Group</h1>
        </div>
        <div className="right-justified-divs">
          <div className="auth-buttons">
          <div>
            <UserProfileIcon initial="J" />
          </div>
          <button>Sign Up</button>
          <button>Log Out</button>
          <button className="hamburger" onClick={toggleMenu}>
            &#9776;
          </button>
          </div>
        </div> */}
        <Banner onButtonClick={toggleMenu}/>
      </header>
      <nav className={`nav-links ${menuOpen ? 'show' : ''}`}>
        <a href="#home" onClick={() => handleMenuClick('home')}><FaHome />&nbsp;&nbsp;Home</a>
        <a href="#events" onClick={() => handleMenuClick('events')}>Events</a>
        <a href="#forum" onClick={() => handleMenuClick('forum')}>Forum</a>
        <a href="#blog" onClick={() => handleMenuClick('blog')}>Blog</a>
      </nav>
      <main>
        {activeSection === 'home' && (
          <section id="home" className="login-section">
          <h2>Welcome!  Log on or sign up below.</h2>
          <div className="login-box">
            <h3>Login</h3>
            <form>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
              <button type="submit">Log In</button>
              <text align="right">Forgot Password?</text>
            </form>
          </div>
          <div><center>or</center></div>
          &nbsp;
          <OAuthLogin
            onGoogleSuccess={handleGoogleSuccess}
            onGoogleFailure={handleGoogleFailure}
            onFacebookSuccess={handleFacebookSuccess}
            onFacebookFailure={handleFacebookFailure}
          />
        </section>
        )}
        {activeSection === 'events' && (
          <section id="events">
            <h2>Upcoming Events</h2>
            <ul>
              <li>March 25th: Movie Night - "The Shawshank Redemption"</li>
              <li>April 1st: Movie Night - "Pulp Fiction"</li>
              <li>April 8th: Movie Night - "The Godfather"</li>
            </ul>
            <Events />
          </section>
        )}
        {activeSection === 'forum' && (
          <section id="forum">
            <h2>Discussion Forum</h2>
            <p>Our online forum is the perfect place to discuss your favorite movies, share opinions, and connect with other movie enthusiasts.</p>
          </section>
        )}
        {activeSection === 'blog' && (
          <section id="blog">
            <h2>Blog</h2>
            <article>
              <h3>10 Must-Watch Classic Movies</h3>
              <p>From timeless dramas to unforgettable thrillers, here's our list of top 10 classic movies every film enthusiast should watch.</p>
            </article>
            <article>
              <h3>How to Analyze a Movie: A Beginner's Guide</h3>
              <p>Discover the key elements of movie analysis and learn how to evaluate films beyond just entertainment.</p>
            </article>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
