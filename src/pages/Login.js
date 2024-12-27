import { Button, Form } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import UserContext from '../UserContext';

import { Notyf } from 'notyf';

export default function Login() {
  const notyf = new Notyf();
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false);

  // Retrieve User Details after successful login
  function retrieveUserDetails(token) {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch user details');
        }
        return res.json();
      })
      .then((data) => {
        const userData = {
          id: data.result._id,
          isAdmin: data.result.isAdmin,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
      })
      .catch((error) => {
        notyf.error('Error retrieving user details');
        console.error(error);
      });
  }

  // Login User
  function loginUser(event) {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Login failed');
        }
        return res.json();
      })
      .then((data) => {
        if (data.access) {
          localStorage.setItem('token', data.access);
          retrieveUserDetails(data.access);
          setEmail('');
          setPassword('');
          notyf.success('Successful Login');
        } else {
          notyf.error(data.message || 'Something went wrong!');
        }
      })
      .catch((error) => {
        notyf.error('Login failed');
        console.error(error);
      });
  }

  useEffect(() => {
    email !== '' && password !== '' ? setIsActive(true) : setIsActive(false);
  }, [email, password]);

  return user.id !== null ? (
    <Navigate to="/movies" />
  ) : (
    <Form
      className="col-6 mx-auto shadow rounded-3 p-5 mt-4 text-center"
      onSubmit={(event) => loginUser(event)}
    >
      <h1>Login</h1>

      <Form.Group className="mb-3">
        <Form.Label>Email address:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password
