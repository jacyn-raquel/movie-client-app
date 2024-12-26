import { useContext } from 'react';
import { UserProvider } from './UserContext';  // Import UserProvider
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Import Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Movies from './pages/Movies';
import MovieView from './pages/MovieView';
import Logout from './pages/Logout';

// Import Components
import AppNavBar from './components/AppNavBar';

function App() {
  return (
    // Wrap the entire Router with UserProvider
    <UserProvider>
      <Router>
        <AppNavBar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/getMovie/:movieId" element={<MovieView />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
