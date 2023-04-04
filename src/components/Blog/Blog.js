/* import React from 'react';

const Blog = () => {
  return (
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
  );
};

export default Blog; */

import React, { useState, useEffect } from 'react';
import BlogPostAdd from './BlogPostAdd';
import { Container, Row, Col, Button, Modal, Spinner } from 'react-bootstrap';
import axios from 'axios';
import './Blog.css';
import blogTitle from '../../images/blog.JPG';



const Blog = () => {

    const [showAddPost, setShowAddPost] = useState(false);
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/blog`);
        const sortedPosts = response.data.sort((a, b) => new Date(b.BlogDateTime) - new Date(a.BlogDateTime));
        setBlogPosts(sortedPosts);
      } catch (error) {
        console.error(error);
        alert('An error occurred while fetching blog posts.');
      }
      setLoading(false);
    };
    
    useEffect(() => {
      fetchBlogPosts();
    }, []);
    

    const toggleAddPost = () => {
        setShowAddPost(!showAddPost);
    };

    const handlePostSubmitted = () => {
        toggleAddPost();
    // Refresh the list of posts
        fetchBlogPosts();
    };  

    return (
    <div className="blogPage">
    <Container className="blogPage">
        <Row className="justify-content-center">
            <Col lg={12}>
            <center><img src={blogTitle} alt="Morristown Movie Blog" className="blogPage-title"/></center>
            </Col>
        </Row>
        {!showAddPost && (
        <Row className="justify-content-center">
            <Col lg={8}>
            <center><button className="btn btn-primary blogPage-addBtn" onClick={toggleAddPost}>Add Blog Post</button></center>
            </Col>
        </Row>
        )}
        {showAddPost && <BlogPostAdd onPostSubmitted={handlePostSubmitted} onCancel={toggleAddPost}/>}
            <hr />
            
        
    </Container>
      
      
{/*       <div className="blogPage-post">
  <h2 className="blogPage-postTitle">The Iconic Suit of Cary Grant in 'North by Northwest'</h2>
  <div className="blogPage-postDetails">
   
  </div>
  <p>
    In Alfred Hitchcock's classic 1959 film, <em>North by Northwest</em>, Cary Grant plays the role of Roger Thornhill, a man mistaken for a fictional government agent. One of the film's most memorable elements is Grant's iconic suit. This <a href="https://crimereads.com/north-by-northwest-cary-grants-suit/" target="_blank" rel="noopener noreferrer">article</a> delves into the history and significance of the suit in the film.
  </p>
  <p>
    Designed by the legendary costume designer Edith Head, the suit represents the perfect blend of style and functionality. It plays a crucial role in the film, symbolizing Thornhill's transformation and endurance throughout the story. The suit's impeccable tailoring, lightweight fabric, and timeless design have made it a classic that continues to influence men's fashion today.
  </p>
  <p>
    To learn more about the story behind Cary Grant's suit in <em>North by Northwest</em>, read the full <a href="https://crimereads.com/north-by-northwest-cary-grants-suit/" target="_blank" rel="noopener noreferrer">article</a> on CrimeReads.
  </p>
  <span className="blogPage-postAuthor">Posted By John Doe</span>
    <span>March 24, 2023</span>
</div><hr /> */}
      {loading ? (
      <center>
        <Spinner animation="border" role="status" />
      </center>
    ) : (
      <div>
        {blogPosts.map((post) => (
          <div key={post.id} className="blogPage-post">
            <p dangerouslySetInnerHTML={{ __html: decodeURIComponent(post.BlogPost) }}></p>
            <p><i>Posted by: {post.BlogAuthor} on {new Date(post.BlogDateTime).toLocaleString()}</i></p>
          </div>
        ))}
      </div>
    )}


    </div>
    
  );
};

export default Blog;

