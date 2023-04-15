import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import './BlogPostAdd.css';

const BlogPostAdd = ({ onPostSubmitted, onCancel }) => {
  const [postContent, setPostContent] = useState('');

  const { currentUser } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the content length
  if (postContent.trim().length < 10) {
    alert('The content must be at least 10 characters long.');
    return;
  }

  // Prepare the data to be sent to the server
  const data = {
    BlogAuthor: currentUser,
    BlogPost: encodeURIComponent(postContent),
    BlogDateTime: new Date().toISOString()
  };

  try {
    // Save the post to the server
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/blog`, data, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      }
    });

    // Check if the response indicates success
    if (response.status === 201) {
      // Clear the content
      setPostContent('');

      // Notify the parent component to hide the editor and refresh the posts
      if (onPostSubmitted) {
        onPostSubmitted();
      }
    } else {
      alert('An error occurred while submitting the post.');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred while submitting the post.');
  }
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <ReactQuill value={postContent} onChange={setPostContent} />
      <br />
      <div align="right">
        <button className="btn btn-primary" type="submit">Submit</button>&nbsp;&nbsp;&nbsp;
        <Button variant="danger" className="ml-3" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
    
  );
};

export default BlogPostAdd;
