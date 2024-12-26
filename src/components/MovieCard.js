import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function MovieCard({ data }) {
  return (
    <Container>
      <Row>
        {data && data.length > 0 ? (
          data.map((movie) => (
            <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="h-100 mb-3">
              <Card>
                <Card.Img
                  variant="top"
                  src={movie.image || 'https://placehold.co/600x400/png'}
                  alt="Movie Poster"
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>Genre: {movie.genre}</Card.Text>
                  <Button as={Link} variant="primary" to={`/movies/getMovie/${movie._id}`}>
                    Check Movie Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No movies available</p>
        )}
      </Row>
    </Container>
  );
}
