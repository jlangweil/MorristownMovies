import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import './CreatePost.css';

const CreatePost = ({ parentPostId, onSubmit }) => {
  const [content, setContent] = useState('');
  const { threadId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/forum?action=createPost`, {
        content,
        threadId,
        userId,
        parentPostId,
        }, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        }
      });
      onSubmit();
    } catch (error) {
    } finally {
        setIsLoading(false);
    }
  };


  const formTitle = parentPostId ? 'Reply' : 'New Post';

  return (
    <div className="create-post">
      <h2>{formTitle}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="content"></label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <Button
            variant="primary"
            type="submit"
            className="create-thread-submit-button"
            disabled={isLoading}
            >
            {isLoading ? (
                <Spinner animation="border" size="sm" />
            ) : (
                'Submit'
            )}
            </Button>
      </form>
    </div>
  );
};

export default CreatePost;
