import {Button, Form} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import {Navigate} from 'react-router-dom';

import UserContext from '../UserContext';

import {Notyf} from 'notyf';

export default function Register(){
	const notyf = new Notyf();
	const {user} = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isActive, setIsActive] = useState(false);

	function registerUser(event){
		event.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/users/register`,{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data.message === "Registered Successfully"){
				setEmail('');
				setPassword('');
				setConfirmPassword('');

				notyf.success("Registered Successfully!");

			} else if (data.message === "User Account already exists."){
				notyf.error("User Account already exists.");
			} else if (data.message === "Email or password is invalid!"){
				notyf.error("Email or password is invalid!");
			} else {
				notyf.error("Something went wrong! Need to contact the IT Admin.")
			}
		})
	}


	useEffect(()=>{
		(email !== '' && password !== '' && confirmPassword === password && password.length >= 8) ? setIsActive(true): setIsActive(false);
	},[email, password, confirmPassword])


	return(
		(user.id !== null) ?
		<Navigate to="/movies"/>
		:
		<Form className ="col-6 mx-auto shadow rounded-3 p-5 mt-4 text-center" onSubmit = {event => registerUser(event)}>
			<h1>Register</h1>

		      <Form.Group className="mb-3" >
		        <Form.Label>Email address:</Form.Label>
		        <Form.Control 
		        	type="email" 
		        	placeholder="Enter email" 
		        	value = {email}
		        	onChange = {event => setEmail(event.target.value)}
		        	required/>
		      </Form.Group>

		      <Form.Group className="mb-3">
		        <Form.Label>Password:</Form.Label>
		        <Form.Control 
		        	type="password" 
		        	placeholder="Password (atleast 8 characters)" 
		        	value = {password}
		        	onChange = {event => setPassword(event.target.value)}
		        	required/>
		      </Form.Group>

		      <Form.Group className="mb-3">
		        <Form.Label>Confirm Password:</Form.Label>
		        <Form.Control 
		        	type="password" 
		        	placeholder="Confirm your Password" 
		        	value = {confirmPassword}
		        	onChange = {event => setConfirmPassword(event.target.value)}
		        	required/>
		      </Form.Group>

		      {
		      	isActive ?
		      		<Button variant="primary" type="submit">
		      		  Register
		      		</Button>
		      	:
		      		<Button variant="danger" type="submit" disabled>
		        		Fill out all fields first
		      		</Button>
		      }
		      <p className="mt-3">Already have an account? <a href="/login">Login in here instead</a></p>
		      
		</Form>
		)
}
