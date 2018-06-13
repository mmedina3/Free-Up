import React from 'react';	
//import { Redirect } from 'react-router-dom';



// Images is an array of image search results
const Images = ({ images }) => (
	<div>
		<h1>Explore: </h1>
		{images.map(function(imageSrc) {
				 return  <img src={ imageSrc.image_data } width="300" height="300" alt="not available" />  
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
	 fetch(`/imagePost/?user__id=${searchTerm}`,{
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