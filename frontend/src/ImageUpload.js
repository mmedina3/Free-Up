import React, { Component } from 'react';
import Main from './components/Main';
import Navbars from './components/Navbars';


class ImageUpload extends Component {
 
  render() {
    return (
<div>
  <Navbars auth={this.props.auth} history={this.props.history}/>
  <Main />
  {/* <PickCity /> */}
  </div>
    );
  }
};

export default ImageUpload;
 