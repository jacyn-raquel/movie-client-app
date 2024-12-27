import UserContext from '../UserContext';
import {useState, useEffect, useContext} from 'react';
import {Table, Row, Col, Button} from 'react-bootstrap';
import {NavLink, useParams} from 'react-router-dom';
import UpdateMovie from './UpdateMovie';
import DeleteMovie from './DeleteMovie';
import AddMovie from './AddMovie';

export default function AdminView({movieData, fetchMovies}){
	console.log(movieData);
	const {user} = useContext(UserContext);
  	const [showAddMovieModal, setShowAddMovieModal] = useState(false);
	// const {name, description, price} = productData;
	const [tableData, setTableData] = useState([]);
	const [specificMovie, setSpecificMovie] = useState(null);
	const [showUpdateModal, setShowUpdateModal] = useState(false);

	// To Open Modal for Create Product
	const handleShowAddModal = () => {
		setShowAddMovieModal(true);
		return (
			<AddMovie/>
			)
	}

	const handleCloseAddModal =() => {
		setShowAddMovieModal(false);
	}

	// To Open Modal for Update
	const handleUpdateClick = (movie) => {
		setSpecificMovie(movie);
		setShowUpdateModal(true);
	}

	// To Close Modal for Update
	const handleCloseUpdateModal = () => {
		setShowUpdateModal(false);
		setSpecificMovie(null);
	}

	function mapOut(){
		console.log(movieData);
		const rows = movieData.map(movie => {
			const year = new Date(movie.year).getFullYear();
			return (
				<tr key={movie._id}>
		          <td>{movie.title}</td>
		          <td>{movie.description}</td>
		          <td>{movie.director}</td>
		          <td>{year}</td>
		          <td>{movie.genre}</td>
             	  <td>
	              	<Button variant="primary" onClick={() => handleUpdateClick(movie)}>Update</Button> 
	              	<DeleteMovie movie={movie} fetchMovies={fetchMovies}/>
		           </td>		
		  	    </tr>
				)


		});
		setTableData(rows);
		
	}


	useEffect(()=>{
		mapOut();
	},[user, movieData])

	return(
		showUpdateModal ?
		<>
		<UpdateMovie show={showUpdateModal} close={handleCloseUpdateModal} movie={specificMovie} refreshData={fetchMovies}/>

		<div className ="text-center p-3">
			<h2> Admin Dashboard </h2>
			<Button className="mx-2 px-4" variant="primary" onClick={()=> handleShowAddModal()}>Add New Movie </Button>
		</div>
		<Row>
		<Table striped bordered hover>
		      <thead className="text-white bg-dark">
		        <tr>
		          <th>Name</th>
		          <th>Description</th>
		          <th>Director</th>
		          <th>Year</th>
		          <th>Genre</th>
		          <th colSpan="2">Actions</th>
		        </tr>
		      </thead>
		      <tbody>
		        {tableData}
		      </tbody>
		 </Table>
		 </Row>
		</>
		:
		<>
		
			{showAddMovieModal ?
				<>
						{/*For Adding a Movie*/}
						<h1 className="text-center my-4">Admin Dashboard</h1>
				      <div className="text-center my-4">
				        <Button variant="primary" onClick={handleShowAddModal}>
				          Add Movie
				        </Button>
				      </div>
				      <AddMovie show={handleShowAddModal} onClose={handleCloseAddModal} refreshData={fetchMovies} tableData={tableData}/>
				     <Row>
				     <Table striped bordered hover>
				           <thead>
				             <tr>
				               <th>Name</th>
				               <th>Description</th>
				               <th>Director</th>
               		           <th>Year</th>
               		           <th>Genre</th>
               		           <th colSpan="2">Actions</th>
               		         </tr>
				           </thead>
				           <tbody>
				             {tableData}
				           </tbody>
				      </Table>
				      </Row>

				</>

				:
				<>
					<div className ="text-center p-3">
						<h2> Admin Dashboard </h2>
						<Button className="mx-2 px-4" variant="primary" onClick={()=> handleShowAddModal()}>Add New Movie </Button>
					</div>
					<Row>
					<Table striped bordered hover>
					      <thead>
					        <tr>
					          <th>Name</th>
					          <th>Description</th>
					          <th>Director</th>
               		          <th>Year</th>
               		          <th>Genre</th>
               		          <th colSpan="2">Actions</th>
               		         </tr>
					      </thead>
					      <tbody>
					        {tableData}
					      </tbody>
					 </Table>
					 </Row>
			 </>
			}
		</>
		)
}