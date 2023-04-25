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
import SignUpVerification from './components/SignUp/SignUpVerification';
import PhotoGallery from './components/Gallery/PhotoGallery';
import Restaurants from './components/Restaurant/Restaurants';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = () => {
    setMenuOpen(false);
  };


    return (
    <Router>
      <div className="App">
        <div className="app-content">
          <header className="App-header">
            <Banner onButtonClick={toggleMenu} />
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
          
          <main>
              <Routes>
                <Route path="/" element={<Home />} index />
                <Route path="/events" element={<Events />} />
                <Route path="/reviews" element={<MovieReview />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signup-verification" element={<SignUpVerification />} />
                <Route path="/gallery" element={<PhotoGallery />} />
                <Route path="/food" element={<Restaurants />} />
              </Routes>
            </main>

        </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
