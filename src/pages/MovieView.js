import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';
import UserContext from '../UserContext'; // Ensure correct import

export default function MovieView() {
  const notyf = new Notyf();
  const { movieId } = useParams();
  const {user, setUser} = useContext(UserContext); // Consume context here
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Fetch movie details
    fetch(`${process.env.REACT_APP_API_URL}/movies/getMovie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title || 'N/A');
        setDescription(data.description || 'No description available.');
        setGenre(data.genre || 'N/A');
        setDirector(data.director || 'Unknown');
        setYear(data.year || '');
        setComments(data.comments || []);
      })
      .catch((err) => {
        console.error('Error fetching movie:', err);
        notyf.error('Failed to fetch movie details.');
      });
  }, [movieId]);


  const addComment = (event) => {
    event.preventDefault();

    if (!newComment.trim()) {
      notyf.error('Comment cannot be empty.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      notyf.error('You must be logged in to comment.');
      return;
    }

    if (!user?.id) {
      notyf.error('User not found.');
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/movies/addComment/${movieId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: user.id, // Use user.id since user is checked
        comment: newComment.trim(),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to add comment');
        }
        return res.json();
      })
      .then((data) => {
        if (data.message === 'Comment added successfully!') {
          notyf.success('Comment added successfully!');
          setComments((prevComments) => [
            ...prevComments,
            { userId: user.id, comment: newComment },
          ]);
          setNewComment('');
        } else if (data.message === 'Comment already saved!') {
          notyf.error('Comment already saved!');
        } else if (data.message === 'Movie not found!') {
          notyf.error('Movie not found');
        } else {
          notyf.error(data.message || 'Error adding comment.');
        }
      })
      .catch((err) => {
        console.error(err);
        notyf.error('Something went wrong with adding the comment.');
      });
  };

  


  return (
    <Container>
      <Row>
        <Col className="col-12 mt-4 text-center">
          <Card>
            <Card.Img variant="top" src="https://placehold.co/600x400/png" className="h-50"alt="Movie Poster" />
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
              <Card.Text>{description}</Card.Text>
              <Card.Subtitle className="mb-2 text-muted">Genre: {genre}</Card.Subtitle>
              <Card.Text>Year released: <strong>{new Date(year).getFullYear()}</strong></Card.Text>
              {user.id !==null ? (
                <>
                  <Form>
                    <Form.Group className="mb-3 text-start" controlId="comment">
                      <Form.Label>Leave a Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="primary" onClick={(event)=>addComment(event)}>
                      Add Comment
                    </Button>
                  </Form>
                </>
              ) : (
                <Button as={Link} variant="primary" to="/login">
                  Login to Add Comment
                </Button>
              )}
              <hr />
              <h5 className="text-start">Comments</h5>
              {comments.length > 0 ? (
                comments.map((c, index) => (
                  <p className="text-start" key={index}>
                    <strong>User ID: {c.userId}:</strong> {c.comment}
                  </p>
                ))
              ) : (
                <p className="text-start">No comments yet.</p>
              )}

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
