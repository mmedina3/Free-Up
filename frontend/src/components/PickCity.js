import React from 'react';
//import { BrowserRouter as Router } from 'react-router-dom';
import Search from './Search';
import City from './City';
import $ from 'jquery';
// eslint-disable-next-line
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
require('dotenv').load();


const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
const POSTMAN_KEY = process.env.REACT_APP_POSTMAN;


class PickCity extends React.Component{

  // The following code is for the City search
  state = {
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
    // constructor(props) {
    //   super(props);

    //   this.state = {
    //     address: '',
    //     // collapse: false,
    //     // isWideEnough: false,
    //     // dropdownOpen: false
    //   };
    //   this.onClick = this.onClick.bind(this);
    //   this.toggle = this.toggle.bind(this);
    // }
  
    handleChange = (address) => {
      this.setState({ address })
    }
  
    handleSelect = (address) => {
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => console.log('Success', latLng))
        .catch(error => console.error('Error', error))
    }

    render() {
        return(
            <div>
              <City city={this.state.city} />
              <Search getSearch={this.getCity} city={this.state.city} />
                </div>
        )
    }
  }     
  
  export default PickCity;
