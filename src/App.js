import { useContext, useState, useEffect } from 'react';
import { UserProvider } from './UserContext';  // Import UserProvider
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import UserContext from './UserContext';

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
  const [user, setUser] = useState({
    id:null,
    isAdmin: null
  });

  function unsetUser(){
    localStorage.clear();
    setUser({
      id:null,
      isAdmin: null
    });
  }

  useEffect(()=>{
    const token = localStorage.getItem('token');

    if(token){
      fetch(`${process.env.REACT_APP_API_URL}/users/details`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {

        data.result._id === undefined ? (
          setUser({
            id:null,
            isAdmin: null
          }))
        :
          (
            setUser({
              id:data.result._id,
              isAdmin: data.result.isAdmin
            })

            )
      })
    } else {
      setUser({
        id:null,
        isAdmin: null
      })
    }
  },[])

  return (
    // Wrap the entire Router with UserProvider
    <UserProvider value ={{user, setUser, unsetUser}}>
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
