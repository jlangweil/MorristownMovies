import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Outlet, Routes } from 'react-router-dom';
import { FaHome, FaCalendar, FaStar, FaDiscord, FaNewspaper, FaMeetup, FaCamera, FaWineGlass, FaComments } from 'react-icons/fa';
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
import Verify from './components/Login/Verify';
import UserProfile from './components/UserProfile/UserProfile';
import Members from './components/UserProfile/Members';
import CategoryList from './components/Forum/CategoryList';
import ThreadList from './components/Forum/ThreadList';
import CreateThread from './components/Forum/CreateThread';
import PostList from './components/Forum/PostList';
import CreatePost from './components/Forum/CreatePost';
import ForgotPassword from './components/Login/ForgotPassword';
import ResetPassword from './components/Login/ResetPassword';


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
            <Link to="/" onClick={handleMenuClick}>&nbsp;<FaHome />&nbsp;&nbsp;Home</Link>
            <Link to="/events" onClick={handleMenuClick}>&nbsp;<FaCalendar />&nbsp;&nbsp;Events</Link>
            <Link to="/reviews" onClick={handleMenuClick}>&nbsp;<FaStar />&nbsp;&nbsp;Movie Reviews</Link>
            <Link to="/forum" onClick={() => handleMenuClick('forum')}>&nbsp;<FaComments />&nbsp;&nbsp;Forum</Link>
            <Link to="/food" onClick={() => handleMenuClick('food')}>&nbsp;<FaWineGlass />&nbsp;&nbsp;Restaurants</Link>
            <Link to="/blog" onClick={handleMenuClick}>&nbsp;<FaNewspaper />&nbsp;&nbsp;Blog</Link>
            <Link to="/gallery" onClick={() => handleMenuClick('gallery')}>&nbsp;<FaCamera />&nbsp;&nbsp;Gallery</Link>
            
            
            {/* <a href="https://discord.com/channels/964877736822837349/965064633704661042" target="_blank" rel="noopener noreferrer"><FaDiscord />&nbsp;&nbsp;Discord</a> */}
            <a href="https://www.meetup.com/movies-594/" target="_blank" rel="noopener noreferrer">&nbsp;<FaMeetup />&nbsp;&nbsp;Meetup</a>
            {/* Add more links as needed */}
          </nav>
          
          <main>
              <Routes>
                <Route path="/" element={<Home />} index />
                <Route path="/events" element={<Events />} />
                <Route path="/reviews" element={<MovieReview />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/reset" element={<ResetPassword />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signup-verification" element={<SignUpVerification />} />
                <Route path="/gallery" element={<PhotoGallery />} />
                <Route path="/food" element={<Restaurants />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/register" element={<SignUpVerification />} />
                <Route path="/user" element={<UserProfile />} />
                <Route path="/members" element={<Members />} />
                <Route path="/forum" element={<CategoryList />} />
                <Route path="/forum/threads/:categoryId" element={<ThreadList />} />
                <Route path="/forum/create-thread/:categoryId" element={<CreateThread />} />
                <Route path="/forum/posts/:threadId" element={<PostList />} />
                <Route path="/forum/create-post/:threadId" element={<CreatePost />} />
              </Routes>
            </main>

        </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
