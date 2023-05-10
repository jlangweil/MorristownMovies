import React, { useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
import './CreateThread.css';

const CreateThread = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { categoryId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { userId } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/forum?action=createThread`, {
        title,
        userId,
        categoryId,
        }, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        }
      });

      const threadId = response.data.id;

      await axios.post(`${process.env.REACT_APP_API_URL}/forum?action=createPost`, {
        content,
        threadId,
        userId,
        parentPostId: null,
        }, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        }
      });

      onSubmit();

      navigate(`/forum/posts/${threadId}`, { state: { threadTitle: title } });
    } catch (error) {
      console.error('Error creating thread:', error);
    } finally {
        setIsLoading(false);
      }
  };

  return (
    <div className="create-thread">
      <h2>New Topic</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="content">Content:</label>
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

export default CreateThread;
