import React, { Component } from 'react';
import Navbars from './components/Navbars';
import ImagePost from './components/ImagePost';
import './App.css';


class App extends Component {
 
  render() {
    return (
<div>
  <Navbars auth={this.props.auth} history={this.props.history}/>
  <br />
  <ImagePost />
  </div>
    );
  }
};

export default App;
