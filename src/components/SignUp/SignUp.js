import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './SignUp.css';

const apiUrl = process.env.REACT_APP_API_URL;

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    city: '',
    state: 'New Jersey',
  });

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
  ];

  
  const passwordsMatch = () => {
    return formData.password === formData.confirmPassword;
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(`${apiUrl}/users`, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        password: formData.password,
        email: formData.email,
        city: formData.city,
        state: formData.state,
      }, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      });
  
      console.log(response.data);
  
      // Handle success, e.g., navigate to the next page, display a success message, etc.
    } catch (error) {
      console.error(error);
  
      // Handle error, e.g., display an error message
    }
  };
  
  

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };



  return (
    <Container className="signup-container">
      <Row>
        <Col xs={12} md={8} className="mx-auto">
          <h2 className="signup-title">Sign Up</h2>
          <hr/>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="firstName" className="no-validation-spacing"> 
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="lastName" className="no-validation-spacing">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="password" className="no-validation-spacing">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
            <Form.Label>Retype Password</Form.Label>
            <Form.Control
                type="password"
                placeholder="Retype Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                isInvalid={!passwordsMatch()}
            />
            <div className="validation-placeholder">
                {!passwordsMatch() && (
                <div className="validation-error">Passwords must match.</div>
                )}
            </div>
            </Form.Group>
            <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                isInvalid={!validateEmail(formData.email)}
            />
            <div className="validation-placeholder">
                {!validateEmail(formData.email) && (
                <div className="validation-error">
                    Please enter a valid email address.
                </div>
                )}
            </div>
            </Form.Group>
            <Form.Group controlId="city" className="no-validation-spacing">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="City" name="city" value={formData.city} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="state" className="no-validation-spacing">
            <Form.Label>State</Form.Label>
            <div className="custom-dropdown-container">
                <Form.Control as="select" name="state" value={formData.state} onChange={handleChange} required>
                {states.map((state, index) => (
                    <option key={index} selected={state === 'New Jersey'}>{state}</option>
                ))}
                </Form.Control>
            </div>
            </Form.Group>


            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
