import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Row, Col, Modal, Button, Spinner } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import './Members.css';

const apiUrl = process.env.REACT_APP_API_URL;

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

const Members = () => {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleModal = (image) => {
    setShowModal(!showModal);
    setModalImage(image);
  };

  const fetchMembers = useCallback(
    debounce(async (page) => {
      if (loading || !hasMore) return;

      setLoading(true);

      try {
        const response = await axios.get(`${apiUrl}/users`, {
          headers: {
            'x-fetch-all-users': 'true',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
          params: {
            page,
            limit: 10,
          },
        });

        const newMembers = response.data;
        console.log('newmembers: ' + newMembers.length);
        console.log('page' + page);
        if (newMembers.length < 10) {
            setHasMore(false);
        }
        if (newMembers.length === 0) {
          setHasMore(false);
        } else {
          setMembers((prevMembers) => [...prevMembers, ...newMembers]);
        }
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    }, 300),
    [loading, hasMore]
  );

  useEffect(() => {
    // Reset page state and fetch members
    setPage(1);
    setHasMore(true);
    setLoading(true);
    setMembers([]);

    // Call fetchMembers
    fetchMembers(1);
  }, []);

  if (loading) {
    return <center><Spinner animation="border" role="status"/></center>;
  }

  return (
    <>
     
        <h1>Members</h1>
        <InfiniteScroll
        dataLength={members.length}
        next={() => fetchMembers(page)}
        hasMore={hasMore}
        endMessage={<p><center>End of Members</center></p>}
        >
          {members.map((member) => (
            <Row key={member.id} className="member-row">
                <Col xs={6} className="member-card">
                {member.pic ? (
                    <a onClick={() => handleModal(member.pic)}>
                    <img src={member.pic} alt={`${member.firstName} ${member.lastName}`} className="member-image" />
                    </a>
                ) : (
                    <FaUserCircle className="member-image" size="60" />
                )}
                <div className="member-info">
                    <h2 className="member-name">
                    {member.first_name} {member.last_name[0]}.
                    </h2>
                    <p className="member-location">
                    {member.city}, {member.state}
                    </p>
                </div>
                </Col>
            </Row>
            ))}

        </InfiniteScroll>
      
      <Modal show={showModal} onHide={handleModal} centered>
        <Modal.Body>
          <img src={modalImage} alt="Member" className="img-fluid" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Members;

