import {Navbar, Nav, Container} from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';
import {useState, useContext} from 'react';

import UserContext from '../UserContext';

export default function AppNavBar(){

	const {user} = useContext(UserContext);

	return(
		<Navbar expand="lg" className="bg-body-tertiary">
		      <Container>
		        <Navbar.Brand as={NavLink} to="/">Zuitt Movie Library</Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav" />
		        <Navbar.Collapse id="basic-navbar-nav">
		          <Nav className="ms-auto">
		            <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
		            {(user.id !== null)?
		            <>
		            	<Nav.Link as={NavLink} to="/movies" exact="true">Movies</Nav.Link>
		            	<Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
		            </>
		            
		            :
		            <>
		            	<Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
		            	<Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
		            </>
		        	}	            
		          </Nav>
		        </Navbar.Collapse>
		      </Container>
		    </Navbar>
		)
}