import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useAuth } from '../../AuthContext';
import CreatePost from './CreatePost';
import UserProfileIcon from '../UserProfile/UserProfileIcon';
import './PostList.css';

const PostList = () => {
  const { threadId } = useParams();
  const location = useLocation();
  const { threadTitle } = location.state || {};
  const [posts, setPosts] = useState([]);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyToPostId, setReplyToPostId] = useState(null);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [formPosition, setFormPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [shownLikesId, setShownLikesId] = useState(null);
  const [postLikes, setPostLikes] = useState({});
  const initialLoadingState = posts.reduce((acc, post) => {
    acc[post.id] = false;
    return acc;
  }, {});
  const [loadingLikes, setLoadingLikes] = useState(initialLoadingState);


  const handleMouseEnter  = async (postId) => {
    
    setShownLikesId(postId);

    if (!postLikes[postId]) {
        setLoadingLikes(prevLoadingLikes => ({
          ...prevLoadingLikes,
          [postId]: true,
        }));

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/forum?action=getLikes&postId=${postId}`,{
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        });
  
        // Store the likes data in the postLikes state
        setPostLikes(prevPostLikes => ({
          ...prevPostLikes,
          [postId]: response.data,
        }));
      }catch (error) {
      console.error('Failed to get post likes', error);
    } finally {
      setLoadingLikes(prevLoadingLikes => ({
        ...prevLoadingLikes,
        [postId]: false,
      }));
    }
  }

  };

  const handleMouseLeave = () => {
    setShownLikesId(null);
  };

  

  const refreshPosts = async () => {
    try {
      handleCreatePostFormSubmitted();
      setIsLoading(true);
      let url = `${process.env.REACT_APP_API_URL}/forum?action=getPosts&threadId=${threadId}`;
      if (userId !== null) {
        url += `&userId=${userId}`;
      }
      const response = await axios.get(url,{
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      });
      setIsLoading(false);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        let url = `${process.env.REACT_APP_API_URL}/forum?action=getPosts&threadId=${threadId}`;
        if (userId !== null) {
          url += `&userId=${userId}`;
        }
        const response = await axios.get(url,{
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
          });
        setIsLoading(false);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [threadId]);

  const handleCreatePostFormSubmitted = () => {
    setShowCreatePostForm(false);
    setFormPosition(null);
  };
  

  const handleReplyClick = (postId) => {
    if (!userId) {
        navigate('/login');
        return;
      }
    setShowCreatePostForm(true);
    setFormPosition(postId);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCreatePostButtonClick = () => {
    if (!userId) {
        navigate('/login');
        return;
      }
    setShowCreatePostForm(true);
    setFormPosition('top');
  };

  const handleCancelCreatePostButtonClick = () => {
    setShowCreatePostForm(false);
    setFormPosition(null);
  };

  const handleLikeClick = async (postId) => {
    // Find the index of the post in the array
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex === -1) {
      // Handle error
      return;
    }
  
    // Create a new copy of the posts array
    const newPosts = [...posts];
  
    // Save the current like status
    const currentLikeStatus = Number(newPosts[postIndex].user_like);

    // Toggle the like status
    newPosts[postIndex].user_like = !newPosts[postIndex].user_like;

    // Update the likes count based on the old like status
    newPosts[postIndex].total_likes = Number(newPosts[postIndex].total_likes) + (currentLikeStatus ? -1 : 1);
    postLikes[postId] = null;
  
    // Update the posts state
    setPosts(newPosts);
  
     try {
      // Send a request to the server to toggle the like status
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/forum?action=updateLike&userId=${userId}&postId=${postId}`,{},{
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      });
    } catch (error) {
      // If the request fails, revert the likeStatus and likesCount of the specific post
      // newPosts[postIndex].user_like = !newPosts[postIndex].user_like;
      // newPosts[postIndex].total_likes += newPosts[postIndex].user_like ? 1 : -1;
      
      // Update the posts state
      //setPosts(newPosts);
  
      console.error('Failed to update like status', error); 
    }
  };
  
  

  const createPostHierarchy = (posts) => {
    const topLevelPosts = posts
      .filter((post) => !post.parent_post_id)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Change this line
    const childPosts = posts.filter((post) => post.parent_post_id);
  
    const addReplies = (post) => {
      const replies = childPosts
        .filter((reply) => reply.parent_post_id === post.id)
        .sort((a, b) => new Date(a.last_updated) - new Date(b.last_updated));
      return { ...post, replies: replies.map(addReplies) };
    };
  
    return topLevelPosts.map(addReplies);
  };
  

  function formatDate(dateString) {
    if (!dateString) {
      return '';
    }

    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const hours24 = date.getHours();
    const hours12 = (hours24 % 12) || 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
        const amPm = hours24 < 12 ? 'AM' : 'PM';

    return `${month}/${day}/${year} ${hours12}:${minutes} ${amPm}`;
  }

  const postHierarchy = createPostHierarchy(posts);

  const renderPosts = (posts, level = 0) => {
    if (isLoading) {
        return <center><Spinner animation="border" role="status"/></center>;
      }
    return posts.map((post, index) => {
      
  
      return (
        <React.Fragment key={post.id}>
          <div className={`post ${level === 0 ? 'top-level' : 'reply-level'}`}>
            <div className="user-info">
              <UserProfileIcon initial={post.first_name[0]} imageUrl={post.pic}/>
              <div className="username">{post.first_name} {post.last_name[0]}.</div>
            </div>
            <div className="post-details" style={{ paddingLeft: `${level * 30}px` }}>
              <div className="post-header">
                <h4>{level === 0 ? threadTitle : `Re: ${threadTitle}`}</h4>
                <span className="post-date">{formatDate(post.created_at)}</span>
              </div>
              <div className="post-content">
                <p>{post.content}</p>
              </div>
              <div className="like-button">
                <div className="like-button" onMouseEnter={() => handleMouseEnter(post.id)} onMouseLeave={handleMouseLeave}>&nbsp;&nbsp;{post.total_likes} likes&nbsp;&nbsp;</div>
                {userId && (
                Number(post.user_like) == 0 ? (
                  <i className="far fa-thumbs-up" aria-hidden="true" onClick={() => handleLikeClick(post.id)}></i>
                ) : (
                  <i className="fas fa-thumbs-up" aria-hidden="true" onClick={() => handleLikeClick(post.id)}></i>
                )
              )}
            </div>
            {shownLikesId === post.id && (
  <div id={`likes-${post.id}`} className="likes-dropdown">
    {loadingLikes[post.id] ? (
      <div>Loading...</div>
    ) : postLikes[post.id]?.length > 0 ? (
      postLikes[post.id]?.map(user => (
        <div>{user.user_name}</div>
      ))
    ) : (
      <div>No likes yet</div>
    )}
  </div>
)}


              <div className="reply-icon" onClick={() => handleReplyClick(post.id)}>
                Reply &nbsp;<i className="fa-solid fa-reply"></i>
              </div>
            </div>
          </div>
          {formPosition === post.id && (
            <div className="create-post-form">
              <CreatePost parentPostId={post.id} onSubmit={refreshPosts}/>
              <div className="cancel-button-wrapper">
                  <Button variant="danger" className="cancel-button" onClick={handleCancelCreatePostButtonClick}>
                  Cancel
                  </Button>
              </div>
            </div>
          )}
          {post.replies && post.replies.length > 0 && renderPosts(post.replies, level + 1)}
        </React.Fragment>
      )
    });
  };
  

  return (
    <div className="post-list-wrapper">
      <div className="post-list-header">
        <button className="back-button" onClick={handleBackClick}>
          &#9664; Back
        </button>
        <button className="create-post-button btn btn-primary" onClick={handleCreatePostButtonClick}>
          Create Post
        </button>
      </div>
      {formPosition === 'top' && (
        <div className="create-post-form">
          <CreatePost parentPostId={null} onSubmit={refreshPosts} />
          <div className="cancel-button-wrapper">
            <Button
                variant="danger"
                className="cancel-button"
                onClick={() => handleCancelCreatePostButtonClick()}
            >
                Cancel
            </Button>
            </div>
        </div>
      )}
      <div className="post-list">
        <Modal show={showReplyModal} onHide={() => setShowReplyModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Reply to Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreatePost parentPostId={replyToPostId} onSubmit={refreshPosts} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowReplyModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {renderPosts(postHierarchy)}
      </div>
    </div>
  );
};

export default PostList;

