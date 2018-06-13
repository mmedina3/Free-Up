import React, { Component } from 'react';
import Navbars from './components/Navbars';
import ImagePost from './components/ImagePost';


class App extends Component {
 
  render() {
    return (
<div>
  <Navbars auth={this.props.auth} history={this.props.history}/>
  <ImagePost />
  </div>
    );
  }
};

export default App;
