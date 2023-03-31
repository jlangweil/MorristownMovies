import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import './BlogPostAdd.css';

const BlogPostAdd = ({ onPostSubmitted, onCancel }) => {
  const [postContent, setPostContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Save the post to the server

    // Clear the content
    setPostContent('');

    // Notify the parent component to hide the editor and refresh the posts
    if (onPostSubmitted) {
      onPostSubmitted();
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
