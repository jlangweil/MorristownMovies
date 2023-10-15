import React, { useState, useEffect } from 'react';
import BlogPostAdd from './BlogPostAdd';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import DOMPurify from 'dompurify';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import './Blog.css';
import blogTitle from '../../images/blog.JPG';



const Blog = () => {

    const [showAddPost, setShowAddPost] = useState(false);
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { currentUser } = useAuth();
    const navigate = useNavigate();


    const SafeHTML = ({ html }) => {
      const sanitizedHTML = DOMPurify.sanitize(decodeURIComponent(html));
    
      return <p dangerouslySetInnerHTML={{ __html: sanitizedHTML }}></p>;
    };

    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/blog`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          }
        });
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
      if (!currentUser) {
        navigate('/login');
        return;
      }
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
      

      {loading ? (
      <center>
        <Spinner animation="border" role="status" />
      </center>
    ) : (
      <div>
        {blogPosts.map((post) => (
          <div key={post.id} className="blogPage-post">
            <SafeHTML html={post.BlogPost} />
            <p><i>Posted by: {post.BlogAuthor} on {new Date(post.BlogDateTime).toLocaleString()}</i></p>
          </div>
        ))}
      </div>
    )}


    </div>
    
  );
};

export default Blog;

