import { useState, useContext } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';

import { Notyf } from 'notyf';
import UserContext from '../UserContext';

export default function CreateProduct({ show, onClose, refreshData }) {
  const notyf = new Notyf();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [director, setDirector] = useState('');

  const addMovie = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    fetch(`${process.env.REACT_APP_API_URL}/movies/addMovie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        genre: genre,
        year: new Date(year).getFullYear(),
        director: director
      }),
    })
      .then((res) => res.json())
      .then((data) => {
      	console.log(data);
        if (data.success === true) {
          setTitle('');
          setDescription('');
          setGenre('');
          setYear('');
          setDirector('');

          onClose();
          refreshData();
          notyf.success('Movie Added');

        } else if (data.message === 'Movie already exists'){
          notyf.error(`Movie already exists`);
        } else {
          notyf.error('Error: Something Went Wrong.');
        }
      });
     } 


  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Genre:</Form.Label>
            <Form.Control
              type="string"
              placeholder="Enter Genre"
              required
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Year:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Year"
              required
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Director:</Form.Label>
            <Form.Control
              type="string"
              placeholder="Enter Director name"
              required
              value={director}
              onChange={(e) => setDirector(e.target.value)}
            />
          </Form.Group>
          
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={e => addMovie(e)} className = "my-3">
          Submit
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
