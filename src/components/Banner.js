import {Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function Banner({data}){
	const {title, content, destination, image, buttonLabel} = data;

	return(
		<Row>
			<Col className="col-12 col-md-8 offset-md-2 shadow rounded-3 text-center p-5 mt-5">
				<img src={image} alt="*" style={{width: "100%", height: "50vh", objectFit: "cover"}}  />
				<h1 className="pt-5">{title}</h1>
				<p>{content}</p>
				<Button as={Link} variant="primary" to={destination}>{buttonLabel}</Button>
			</Col>
		</Row>
		)
}