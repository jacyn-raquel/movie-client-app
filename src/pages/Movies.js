import MovieCard from '../components/MovieCard';

import {useState, useEffect} from 'react';

export default function Movies() {

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

	},[])


	return(

		<>
		<div className="p-5 text-center">		
			<h1 className="my-4"> Movies </h1>
			<MovieCard data={movies} fetchMovies={getMovies}/>
		</div>
		</>
		)
}