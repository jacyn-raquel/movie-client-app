import MovieCard from '../components/MovieCard';
import AdminView from '../components/AdminView';

import {useState, useEffect, useContext} from 'react';
import UserContext from '../UserContext';
import {Navigate} from 'react-router-dom';

export default function Movies() {

	const {user}=useContext(UserContext);

	const [movies, setMovies] = useState([]);

	function getMovies(){
		fetch(`${process.env.REACT_APP_API_URL}/movies/getMovies`,{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data.movies);
			setMovies(data.movies);
		})
	}

	useEffect(()=> {
		getMovies();
	},[user])

	return(
		<>
		{

			(user.id !== null) ?
				(user.isAdmin) ?
				<AdminView movieData={movies} fetchMovies={getMovies}/>
				:

				<div className="p-5 text-center">		
					<h1 className="my-4"> Movies </h1>
					<MovieCard data={movies} fetchMovies={getMovies}/>
				</div>

			:
			<Navigate to="/login"/>
		}
		
		</>
		)
}