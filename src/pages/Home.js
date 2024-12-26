import Banner from '../components/Banner';
import UserContext from '../UserContext';
import {useContext} from 'react';
import Movies from '../images/Movies.jpg';

export default function Home(){

	const {user} = useContext(UserContext);

	const data = {
		title: "Zuitt's Movie Library!",
		content: "Know all the trending movies out there!",
		image: Movies,
		destination: (user.id !== null) ? "/movies" : "/login",
		buttonLabel: (user.id !== null) ? "See movie list!" : "Login first to see movie list"
	}
	return(
		<>
			<Banner data={data}/>
		</>
		)
}