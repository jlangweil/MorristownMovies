import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.css';
import { Container, Row, Col } from 'react-bootstrap';

const testimonials = [
  {
    text: 'This group is fantastic! I made so many new friends.',
    author: 'John Doe',
  },
  {
    text: 'I love the movie nights and discussions afterward.',
    author: 'Jane Smith',
  },
  {
    text: 'Great way to explore new restaurants and enjoy movies with like-minded people.',
    author: 'Michael Johnson',
  },
];

const Testimonial = () => {
    return (
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="testimonial-carousel">
                <Carousel autoPlay infiniteLoop interval={5000} showStatus={false} showThumbs={false} showIndicators={false}>
                  {testimonials.map((testimonial, index) => (
                    <div key={index}>
                      <p className="testimonial-text"><i class="fa-solid fa-quote-left"></i>&nbsp;&nbsp;{testimonial.text}&nbsp;&nbsp;<i class="fa-solid fa-quote-right"></i></p>
                      <p><i className="fas fa-star full-star"></i><i className="fas fa-star full-star"></i><i className="fas fa-star full-star"></i><i className="fas fa-star full-star"></i><i className="fas fa-star full-star"></i></p>
                      <p className="testimonial-author">— {testimonial.author}</p>
                    </div>
                  ))}
                </Carousel>
              </div>
            </Col>
          </Row>
      );
    };
    
    export default Testimonial;
