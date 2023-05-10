import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Spinner } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import CreateThread from './CreateThread';
import { useAuth } from '../../AuthContext';
import './ThreadList.css';

const ThreadList = () => {
  const [threads, setThreads] = useState([]);
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [showCreateThreadForm, setShowCreateThreadForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const threadsPerPage = 10;
  const [totalThreads, setTotalThreads] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryTitle = searchParams.get('categoryTitle');
  const { userId } = useAuth();

  const handlePageChange = (selectedObject) => {
    setCurrentPage(selectedObject.selected);
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
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const amPm = hours24 < 12 ? 'AM' : 'PM';
    return `${month}/${day}/${year}`;
    //return `${month}/${day}/${year} ${hours12}:${minutes}:${seconds} ${amPm}`;
  }

  const handleBackClick = () => {
    navigate('/forum');
  };

  const handleClick = (thread) => {
    navigate(`/forum/posts/${thread.id}`, { state: { threadTitle: thread.title } });
  };

  const handleCreateThreadButtonClick = () => {
    if (!userId) {
        navigate('/login');
        return;
      }
    setShowCreateThreadForm(true);
  };

  const handleCancelCreateThreadButtonClick = () => {
    setShowCreateThreadForm(false);
  };

  const handleRefreshClick = async () => {
    try {
      setIsLoading(true);  
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/forum?action=getThreads&categoryId=${categoryId}&offset=${
          currentPage * threadsPerPage
        }&limit=${threadsPerPage}`,{
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
        });
      setThreads(response.data.threads);
      setTotalThreads(response.data.totalThreads);
      sessionStorage.setItem(`threads_${categoryId}_${currentPage}`, JSON.stringify(response.data.threads));
    } catch (error) {
      console.error("Error refreshing threads:", error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  

  useEffect(() => {
    const fetchThreads = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/forum?action=getThreads&categoryId=${categoryId}&offset=${
              currentPage * threadsPerPage
            }&limit=${threadsPerPage}`,{
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
            });
          setThreads(response.data.threads);
          setTotalThreads(response.data.totalThreads);
          sessionStorage.setItem(`threads_${categoryId}_${currentPage}`, JSON.stringify(response.data.threads));
        } catch (error) {
          console.error("Error fetching threads:", error);
        }
      };
      
      const cachedData = sessionStorage.getItem(`threads_${categoryId}_${currentPage}`);
      if (cachedData) {
        setThreads(JSON.parse(cachedData));
      } else {
        fetchThreads();
      }
    }, [categoryId, currentPage]);

  const totalPages = Math.ceil(totalThreads / threadsPerPage);
 
  return (
    <div className="thread-list">
      <div><center> {categoryTitle && <h3>{categoryTitle}</h3>}</center></div>
        <div className="thread-list-header">
        <button className="back-button" onClick={handleBackClick}>
            &#9664; Back
        </button>
        <div className="action-buttons">
            <button className="refresh-button btn btn-primary" onClick={handleRefreshClick}>
            <i className="fas fa-sync-alt"></i>
            </button>
            <button className="create-thread-button btn btn-primary" onClick={handleCreateThreadButtonClick}>
            Create Topic
            </button>
        </div>
        </div>

      {showCreateThreadForm && (
        <div className="create-thread-form">
          <CreateThread categoryId={categoryId} onSubmit={() => { setShowCreateThreadForm(false); }} />
          <div className="cancel-button-wrapper">
            <Button
              variant="danger"
              className="cancel-button"
              onClick={() => handleCancelCreateThreadButtonClick()}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      {isLoading ? (
        <div className="spinner-container">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          </div>
      ) : (  
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Posts</th>
            <th>Last Post</th>
          </tr>
        </thead>
        <tbody>
          {threads.map((thread) => (
            <tr className="thread-item" key={thread.id} onClick={() => handleClick(thread)}>
              <td>{thread.title}</td>
              <td align="right">{thread.post_count}</td>
              <td align="center">{formatDate(thread.last_post_date)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      )}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        activeClassName={"active"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        />
    </div>
      
  );
};

export default ThreadList;
