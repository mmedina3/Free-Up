// 

import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';
//import React from 'react';
import Main from './components/Main';
import Search from './components/Search';
import Form from './components/Form';
import City from './components/City';
import $ from 'jquery';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
require('dotenv').load();


const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
const POSTMAN_KEY = process.env.REACT_APP_POSTMAN;

class App extends Component {
  // the following code is for Auth0

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  // The following code is for the homepage
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

  render() {
    const { isAuthenticated } = this.props.auth;

    return (

    // the following code is for Auth0
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
            {
              !isAuthenticated() && (
                  <Button
                    id="qsLoginBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    id="qsLogoutBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                )
            }
          </Navbar.Header>
        </Navbar>
      

      {/* The following code is for the homepage */}
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
