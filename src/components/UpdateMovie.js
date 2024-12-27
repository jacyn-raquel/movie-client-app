import {Modal, Button, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {Notyf} from 'notyf';

export default function UpdateProduct({show, close, movie, refreshData}){
	
	const notyf = new Notyf();
	const {_id, title, description, genre, year, director} = movie;

	const [newTitle, setNewTitle] = useState(title);
	const [newDescription, setNewDescription] = useState(description);
	const [newGenre, setNewGenre] = useState(genre);
	const [newYear, setNewYear] = useState(new Date(year).getFullYear());
	const [newDirector, setNewDirector] = useState(director);
	const [isActive, setIsActive] = useState(false);

	const updateData = (event, id)=>{
		event.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/movies/updateMovie/${id}`,{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				title: newTitle,
				description: newDescription,
				genre: newGenre,
				year: new Date(newYear).getFullYear(),
				director: newDirector,
			})
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			if(data.message === 'Movie updated successfully!'){
				notyf.success(`Movie updated successfully!`);

				refreshData();
				console.log(refreshData);
				close();
			} else {
				notyf.error(`Movie not found`);
				refreshData();
				console.log(refreshData);
				close();
			}
		})
	}

	useEffect(()=>{
		if(newTitle !== title || newDescription!== description || newGenre !== genre || newYear !== year || newDirector !== director){
			setIsActive(true);
		} else {
			setIsActive(false);
		}

	},[newTitle, newDescription, newGenre, newYear, newDirector])
	return(
		<>

	      <Modal show={show} onHide={close}>
	        <Modal.Header closeButton>
	          <Modal.Title>Edit the Product</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        {movie ? (
	        	<Form>
        	      	<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
	        	        <Form.Label>Title</Form.Label>
	        	        <Form.Control 
	        	        type="text" 
	        	        value={newTitle}
	        	        onChange={(event) => setNewTitle(event.target.value)}
	        	         />
    	        	</Form.Group>
        	      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        	        <Form.Label>Description</Form.Label>
        	        <Form.Control 
        	        as="textarea" 
        	        rows={3} 
        	        value= {newDescription}
        	        onChange= {event => setNewDescription(event.target.value)}
        	        />
        	      </Form.Group>
        	      	<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
	        	        <Form.Label>Year</Form.Label>
	        	        <Form.Control 
	        	        type="text" 
	        	        placeholder="Input the new name"
	        	        value={newYear}
	        	        onChange={(event) => setNewYear(event.target.value)}
	        	         />
    	        	</Form.Group>

    	        	<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
	        	        <Form.Label>Genre</Form.Label>
	        	        <Form.Control 
	        	        type="text" 
	        	        placeholder="Input the new name"
	        	        value={newGenre}
	        	        onChange={(event) => setNewGenre(event.target.value)}
	        	         />
    	        	</Form.Group>

    	        	<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
	        	        <Form.Label>Director</Form.Label>
	        	        <Form.Control 
	        	        type="text" 
	        	        placeholder="Input the new name"
	        	        value={newDirector}
	        	        onChange={(event) => setNewDirector(event.target.value)}
	        	         />
    	        	</Form.Group>
	        	</Form>
	        ):(
	        	<p> No movie selected </p>
	        )}

	        </Modal.Body>
	        <Modal.Footer>
	          <Button variant="secondary" onClick={close}>
	            Close
	          </Button>
	          {isActive ?
	          	<Button variant="primary" onClick={(event)=>updateData(event,_id) }>
	            Save Changes
	          </Button>
	          :
	          <Button variant="primary" disabled onClick={(event)=>updateData(event,_id) }>
	            Save Changes
	          </Button>
	      		}
	        </Modal.Footer>
	      </Modal>
	    </>
	)
}