import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import './CategoryList.css';

const apiUrl = process.env.REACT_APP_API_URL;

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const cachedData = sessionStorage.getItem('categories');
    if (cachedData) {
      setCategories(JSON.parse(cachedData));
    } else {
      fetchCategories();
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/forum?action=getCategories`,{
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      });
      setCategories(response.data);
      sessionStorage.setItem('categories', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <Container style={{ maxWidth: '1200px' }}>
  <Row>
    <Col>
      <div className="forum-header">Discussion Forum</div>
      <div className="category-list">
        {categories.map((category) => (
          <Row key={category.id} className="category-item">
            <Col xs={8} sm={8}>
              <Link to={`/forum/threads/${category.id}?categoryTitle=${encodeURIComponent(category.name)}`}>
                <h3>{category.name}</h3>
              </Link>
              <p>{category.description}</p>
            </Col>
            <Col xs={2} sm={2}>
            <div className="category-count">
                <div className="post-info">
                  {category.thread_count}
                  <div className="posts-text">Topics</div>
                </div>
              </div>
            </Col>
            <Col xs={2} sm={2}>
              <div className="category-count">
                <div className="post-info">
                  {category.post_count}
                  <div className="posts-text">Posts</div>
                </div>
              </div>
            </Col>
          </Row>
        ))}
      </div>
    </Col>
  </Row>
</Container>

  );
  
};

export default CategoryList;
