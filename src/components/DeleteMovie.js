import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function DeleteMovie({movie, fetchMovies}) {


    const notyf = new Notyf();

    //state for movieId for the fetch URL
    const {_id} = movie;

    const deleteToggle = (event) => {
        event.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/movies/deleteMovie/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.message === 'Movie deleted successfully!') {
                notyf.success("Movie successfully deleted")
                fetchMovies();

            }else {
                notyf.error("Something Went Wrong")
                fetchMovies();
            }


        })
    }
 

    return(
        <>
                <Button variant="danger" size="sm" onClick={(event) => deleteToggle(event)}>Delete</Button>
        </>

        )
}
