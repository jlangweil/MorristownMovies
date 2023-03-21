import React, { useState } from 'react';
import './App.css';

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

  return (
    <div className="App">
      <header className="App-header">
        <h1></h1>
         <div className="auth-buttons">
          <button>Sign In</button>
          <button>Log Out</button>
          <button className="hamburger" onClick={toggleMenu}>
            &#9776;
          </button>
        </div>
      </header>
      <nav className={`nav-links ${menuOpen ? 'show' : ''}`}>
        <a href="#home" onClick={() => handleMenuClick('home')}>Home</a>
        <a href="#events" onClick={() => handleMenuClick('events')}>Events</a>
        <a href="#forum" onClick={() => handleMenuClick('forum')}>Forum</a>
        <a href="#blog" onClick={() => handleMenuClick('blog')}>Blog</a>
      </nav>
      <main>
        {activeSection === 'home' && (
          <section id="home" className="login-section">
          <h2>Welcome to Morristown Movie Meetup!</h2>
          <div className="login-box">
            <h3>Login</h3>
            <form>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
              <button type="submit">Log In</button>
            </form>
          </div>
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
