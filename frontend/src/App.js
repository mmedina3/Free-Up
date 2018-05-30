
import React from 'react';
import Main from './components/Main';
import Search from './components/Search';
import Form from './components/Form';
import City from './components/City';
import $ from 'jquery';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
require('dotenv').load();


const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
const POSTMAN_KEY = process.env.REACT_APP_POSTMAN;


class App extends React.Component {
  state= {
    city: undefined,
    error: undefined
  }

  getCity = async (e) => {
    e.preventDefault();
      try {
        const city = e.target.elements.city.value;
        console.log(city);

        let cors_url = 'https://cors-anywhere.herokuapp.com/';
        let google_url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&key=${API_KEY}`;

        var settings = {
          "async": true,
          "crossDomain": true,
          "url": cors_url + google_url,
          "method": "GET",
          "headers": {
            "Cache-Control": "no-cache",
            "Postman-Token": `${POSTMAN_KEY}`
          }
        }

        $.ajax(settings).done(function (response) {
          console.log(response);
        });

    }
    catch (e) {
      console.log('Error!', e);
    }
  }
    constructor(props) {
    super(props);  
    this.state = { address: '' }
  }

  handleChange = (address) => {
    this.setState({ address })
  }

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

//   render() {
//     return (
//       <div>
//       <Search
//         value={this.state.city}
//         onChange={this.handleChange}
//         onSelect={this.handleSelect}
//       >
//         {({ getInputProps, suggestions, getSuggestionItemProps }) => (
//           <div>
//             <input
//               {...getInputProps({
//                 placeholder: 'Search Places ...',
//                 className: 'location-search-input'
//               })}
//             />
//             <div className="autocomplete-dropdown-container">
//               {suggestions.map(suggestion => {
//                 const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
//                 // inline style for demonstration purpose
//                 const style = suggestion.active
//                             ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                             : { backgroundColor: '#ffffff', cursor: 'pointer' };
//                 return (
//                   <div {...getSuggestionItemProps(suggestion, { className, style })}>
//                     <span>{suggestion.description}</span>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         )}
//       </Search>
      
//       </div>
//     );
//   }
// }
render(){
  return(
    <div>
         <h1>Input Information</h1>
         <Form />    
         <h1> Search City</h1>
         <City city={this.state.city} />
         <Search getSearch={this.getCity}  
          city={this.state.city} />
        <h1>Image Upload</h1>
        <Main />
    </div>
  );
 }
};

export default App;
