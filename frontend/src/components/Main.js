import React from 'react';
import PickCity from './PickCity';
import { Modal, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import '../ImageUpload.css';



class Main extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      imageURL: '',
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }



  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    console.log(this.uploadInput.files[0]);
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    console.log(data)
    console.log(JSON.stringify(data))
    fetch('/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      //console.log(response.json())
      response.json().then((body) => {
        console.log(body)
        this.setState({ imageURL: `/${body.file}` });
      });
    });
    this.setState({ show: false });
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }


  goTo(route) {
    this.props.history.replace(`/${route}`)
}

  render() {
    return (

      <div id="center">
        <h1>Post Item! </h1>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" name="imageDatas" />
          <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter Title" />
          <br />
          <img src={this.state.imageURL} width="300" height="300" alt="img" />
          <br />
        <Button bsStyle="primary" bsSize="sm" onClick={this.handleShow}>
          Upload
        </Button>
        <Button eventKey={2} bsStyle="primary" bsSize="sm" href="ImageUpload"
          onClick={this.goTo.bind(this, 'ImageUpload')}
        > New Post
        </Button>

        <div>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>1. Pick a Size!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Clothes: </h4>
              <h5>* Measurements shown refer to age/body measurements and not clothing measurements. </h5>
              
                <DropdownButton title='Infant' id='dropdown'>
                  <MenuItem eventKey="1">0 months</MenuItem>
                  <MenuItem eventKey="2">1-3 months (24,4 INCHES)</MenuItem>
                  <MenuItem eventKey="3">3-6 months (26,8 INCHES)</MenuItem>
                  <MenuItem eventKey="4">6-9 months (29,1 INCHES)</MenuItem>
                  <MenuItem eventKey="5">9-12 months (31,5 INCHES)</MenuItem>
                  <MenuItem eventKey="6">SMALL</MenuItem>
                  <MenuItem eventKey="7">MEDIUM</MenuItem>
                  <MenuItem eventKey="8">LARGE</MenuItem>
                  <MenuItem eventKey="9">NO SIZE</MenuItem>
                </DropdownButton>
              
           
                <DropdownButton title='Baby' id='dropdown'>
                  <MenuItem eventKey="2">12-18 months (33,9 INCHES)</MenuItem>
                  <MenuItem eventKey="3">18-24 months (36,2 INCHES)</MenuItem>
                  <MenuItem eventKey="4">2-3 years (38,6 INCHES)</MenuItem>
                  <MenuItem eventKey="5">3-4 years (40,9 INCHES)</MenuItem>
                  <MenuItem eventKey="6">SMALL</MenuItem>
                  <MenuItem eventKey="7">MEDIUM</MenuItem>
                  <MenuItem eventKey="8">LARGE</MenuItem>
                  <MenuItem eventKey="9">NO SIZE</MenuItem>
                </DropdownButton>
           
                <DropdownButton title='Kids' id='dropdown'>
                  <MenuItem eventKey="1">5 years (43, 3 INCHES)</MenuItem>
                  <MenuItem eventKey="2">6 years (45, 7 INCHES)</MenuItem>
                  <MenuItem eventKey="3">7 years (48,0 INCHES)</MenuItem>
                  <MenuItem eventKey="4">8 years (50,4 INCHES)</MenuItem>
                  <MenuItem eventKey="5">9 years (55,1 INCHES)</MenuItem>
                  <MenuItem eventKey="6">10 years (55,1 INCHES)</MenuItem>
                  <MenuItem eventKey="7">11-12 years (59, 8 INCHES)</MenuItem>
                  <MenuItem eventKey="8">13-14 years (64,6 INCHES)</MenuItem>
                  <MenuItem eventKey="9">SMALL</MenuItem>
                  <MenuItem eventKey="10">MEDIUM</MenuItem>
                  <MenuItem eventKey="11">LARGE</MenuItem>
                  <MenuItem eventKey="12">NO SIZE</MenuItem>
                </DropdownButton>
         
              <hr />
              <h4>Shoes: </h4>
              
                <DropdownButton title='Infant' id='dropdown'>
                  <MenuItem eventKey="1">0 (0-3 months)</MenuItem>
                  <MenuItem eventKey="2">0.5 (3-6 months)</MenuItem>
                  <MenuItem eventKey="3">1-2 (6-9 months)</MenuItem>
                </DropdownButton>
             
                <DropdownButton title='Baby' id='dropdown'>
                  <MenuItem eventKey="1">2 (6-9 months)</MenuItem>
                  <MenuItem eventKey="2">3 (9-12 months)</MenuItem>
                  <MenuItem eventKey="3">4 ( 1 year)</MenuItem>
                  <MenuItem eventKey="4">5(1 year)</MenuItem>
                  <MenuItem eventKey="5">6 (2 years)</MenuItem>
                  <MenuItem eventKey="6">6.5 (2 years)</MenuItem>
                  <MenuItem eventKey="7">7.5 (3 years)</MenuItem>
                  <MenuItem eventKey="8">8 (3 years)</MenuItem>
                  <MenuItem eventKey="9">9 (4 years)</MenuItem>
                  <MenuItem eventKey="10">9.5 (4 years)</MenuItem>
                </DropdownButton>
         
                <DropdownButton title='Kids' id='dropdown'>
                  <MenuItem eventKey="1">10.5 (5 years)</MenuItem>
                  <MenuItem eventKey="2">11.5 (5 years)</MenuItem>
                  <MenuItem eventKey="3">12 (6 years)</MenuItem>
                  <MenuItem eventKey="4">13.5 (7 years)</MenuItem>
                  <MenuItem eventKey="5">1.5 (8 years)</MenuItem>
                  <MenuItem eventKey="6">2 (9 years)</MenuItem>
                  <MenuItem eventKey="7">3 (10 years)</MenuItem>
                  <MenuItem eventKey="8">4 (11 years)</MenuItem>
                  <MenuItem eventKey="9">4.5 (12 years)</MenuItem>
                  <MenuItem eventKey="10">5.5 (13 years)</MenuItem>
                  <MenuItem eventKey="11">6 (14 years)</MenuItem>
                  <MenuItem eventKey="12">7 (14 years)</MenuItem>
                  <MenuItem eventKey="13">7.5 (14 years) </MenuItem>
                </DropdownButton>

                 <hr />
                 <Modal.Title>2. Choose a category:  </Modal.Title>
                 <hr />
                 <select>
                 <option disable selected value> Category </option>
                  <option  name="category" value='Clothes'>CLOTHES</option>
                  <option  name="category" value='Home'>HOME</option>
                  <option  name="category" value='Travel'>TRAVEL</option>
                  <option  name="category" value='Education'>EDUCATION</option>
                  <option  name="category" value='Play'>PLAY</option>
                  </select>
                 <hr />
                 <Modal.Title>3. Select a City:  </Modal.Title>
                 <hr />
                 <PickCity />

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleUploadImage}>Done!</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      
    );
  }
}

export default Main;

