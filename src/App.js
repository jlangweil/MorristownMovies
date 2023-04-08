import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Outlet, Routes } from 'react-router-dom';
import { FaHome, FaCalendar, FaStar, FaDiscord, FaNewspaper, FaMeetup, FaCamera, FaWineGlass } from 'react-icons/fa';
import './App.css';
import Events from './Events';
import Banner from './Banner';
import Login from './components/Login/Login';
import Home from "./Home";
import Blog from './components/Blog/Blog';
import Footer from './Footer';
import MovieReview from './MovieReview';
import SignUp from './components/SignUp/SignUp';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleLogin = () => {
    setLoggedIn(!loggedIn);
    if (!loggedIn) {
      handleMenuClick('login');
    }
    else
    { 
      handleMenuClick('home');
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
  };


    return (
    <Router>
      <div className="App">
        <div className="app-content">
          <header className="App-header">
            <Banner onButtonClick={toggleMenu} loggedIn={loggedIn} onLoginToggle={toggleLogin} />
          </header>
          <nav className={`nav-links ${menuOpen ? 'show' : ''}`}>
            <Link to="/" onClick={handleMenuClick}><FaHome />&nbsp;&nbsp;Home</Link>
            <Link to="/events" onClick={handleMenuClick}><FaCalendar />&nbsp;&nbsp;Events</Link>
            <Link to="/reviews" onClick={handleMenuClick}><FaStar />&nbsp;&nbsp;Movie Reviews</Link>
            <Link to="/blog" onClick={handleMenuClick}><FaNewspaper />&nbsp;&nbsp;Blog</Link>
            <Link to="/gallery" onClick={() => handleMenuClick('gallery')}><FaCamera />&nbsp;&nbsp;Gallery</Link>
            <Link to="/food" onClick={() => handleMenuClick('food')}><FaWineGlass />&nbsp;&nbsp;Restaurants</Link>
            <a href="https://discord.com/channels/964877736822837349/965064633704661042" target="_blank" rel="noopener noreferrer"><FaDiscord />&nbsp;&nbsp;Discord</a>
            <a href="https://www.meetup.com/movies-594/" target="_blank" rel="noopener noreferrer"><FaMeetup />&nbsp;&nbsp;Meetup</a>
            {/* Add more links as needed */}
          </nav>
          {/* <nav className={`nav-links ${menuOpen ? 'show' : ''}`}>
            <a href="#home" onClick={() => handleMenuClick('home')}><FaHome />&nbsp;&nbsp;Home</a>
            <a href="#events" onClick={() => handleMenuClick('events')}><FaCalendar />&nbsp;&nbsp;Events</a>
            <a href="#reviews" onClick={() => handleMenuClick('reviews')}><FaStar />&nbsp;&nbsp;Movie Reviews</a>
            <a href="#blog" onClick={() => handleMenuClick('blog')}><FaNewspaper />&nbsp;&nbsp;Blog</a>
            <a href="#gallery" onClick={() => handleMenuClick('gallery')}><FaCamera />&nbsp;&nbsp;Gallery</a>
            <a href="#food" onClick={() => handleMenuClick('food')}><FaWineGlass />&nbsp;&nbsp;Restaurants</a>
            <a href="https://discord.com/channels/964877736822837349/965064633704661042" target="_blank" rel="noopener noreferrer"><FaDiscord />&nbsp;&nbsp;Discord</a>
            <a href="https://www.meetup.com/movies-594/" target="_blank" rel="noopener noreferrer"><FaMeetup />&nbsp;&nbsp;Meetup</a>
          </nav> */}
          <main>
              <Routes>
                <Route path="/" element={<Home />} index />
                <Route path="/events" element={<Events />} />
                <Route path="/reviews" element={<MovieReview />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </main>
          {/* <main>
            {activeSection === 'login' && (
                <Login />
            )}
            {activeSection === 'home' && (
                <Home/>
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
                <p>Link to or window containing our Discord server goes here</p>
              </section>
            )}
            {activeSection === 'blog' && (
              <Blog />
            )}
            {activeSection === 'reviews' && (
              <section id="reviews">
                <MovieReview />
              </section>
            )}
          </main> */}
        </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
