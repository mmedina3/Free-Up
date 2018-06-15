import React from 'react';	
//import { Redirect } from 'react-router-dom';
//import { Button } from 'react-bootstrap';
import '../App.css';



// Images is an array of image search results
const Images = ({ images }) => (
	<div>
		<h1>Explore: </h1>
		{images.map(function(imageSrc) {
				 return   <img src={ imageSrc.image_data } width="350" height="350"  class="img-fluid img-thumbnail" alt="not available" />  
		}
	)}
	</div>
	
) 


class ImagePost extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			status: 'ready',
			images: []
		}
	}

	handleSearch = (e) => {
		e.preventDefault();
	 const searchTerm = e.target.search.value; 
	 fetch(`/imagePost/?post_city=${searchTerm}`,{
			method: 'GET'
		}).then((response)=>{
			response.json().then((body) => {
				window.apple = body;
				this.setState({images: body});
			})});
	}
		render(){
			return (
				<div className="image-search">
					<form onSubmit={this.handleSearch}>
					<input type="text" name="search"  /> <button> Search City </button>
					</form>
				 <Images images={this.state.images} /> 
				</div>
			);
		}
};
 

export default ImagePost;