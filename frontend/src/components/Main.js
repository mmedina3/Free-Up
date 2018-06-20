import React from 'react';
import PickCity from './PickCity';
import { Modal, Button,FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import '../ImageUpload.css';



class Main extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      imageURL: '',
      show: false,
      category: null,
      infant_clothes: null,
      infant_shoe: null,
      baby_clothes: null,
      baby_shoe: null,
      kids_clothes: null,
      kids_shoe: null,
      post_city: null
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKidsShoeChange = this.handleKidsShoeChange.bind(this);
    this.handleBabyShoeChange = this.handleBabyShoeChange.bind(this);
    this.handleInfantShoeChange = this.handleInfantShoeChange.bind(this);
    this.handleKidsClothesChange = this.handleKidsClothesChange.bind(this);
    this.handleBabyClothesChange = this.handleBabyClothesChange.bind(this);
    this.handleInfantClothesChange = this.handleInfantClothesChange.bind(this);
  }

  handleChange(e) {
    this.setState({ category: e.target.value });
  }
  handleKidsShoeChange(e) {
    this.setState({ kids_shoe: e.target.value });
  }
  handleBabyShoeChange(e) {
    this.setState({ baby_shoe: e.target.value });
  }
  handleInfantShoeChange(e) {
    this.setState({ infant_shoe: e.target.value });
  }
  handleKidsClothesChange(e) {
    this.setState({ kids_clothes: e.target.value });
  }
  handleBabyClothesChange(e) {
    this.setState({ baby_clothes: e.target.value });
  }
  handleInfantClothesChange(e) {
    this.setState({ infant_clothes: e.target.value });
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    console.log(this.uploadInput.files[0]);
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);
    data.append('category', this.state.category);
    data.append('kids_shoe', this.state.kids_shoe);
    data.append('baby_shoe', this.state.baby_shoe);
    data.append('infant_shoe', this.state.infant_shoe);
    data.append('kids_clothes', this.state.kids_clothes);
    data.append('baby_clothes', this.state.baby_clothes);
    data.append('infant_clothes', this.state.infant_clothes);

    console.log(data)
    console.log(JSON.stringify(data))
    fetch('/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      console.log(response, "this is response")
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
        <br />
        <div class='centerFile'>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" name="imageDatas"  />
          </div>
          <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter Title" />

          <br />
          <img src={this.state.imageURL} width="300" height="300" alt="img" />
          <br />
        <Button bsStyle="primary" bsSize="lg" onClick={this.handleShow}>
          Upload
        </Button>
        <Button eventKey={2} bsStyle="primary" bsSize="lg" href="ImageUpload"
          onClick={this.goTo.bind(this, 'ImageUpload')}
        > New Post
        </Button>

        <div id="modal">
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>1. Pick a Size!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Clothes: </h4>
              <h5>* Measurements shown refer to age/body measurements and not clothing measurements. </h5>
              
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select:</ControlLabel>
                <FormControl onChange={this.handleInfantClothesChange}
                  componentClass="select" placeholder="Select">
                  <option value="Infant">Infant</option>     
                  <option value="0 months">0 months</option>
                  <option value="1-3 months (24,4 INCHES)">1-3 months (24,4 INCHES)</option>    
                  <option value="3-6 months (26,8 INCHES)">3-6 months (26,8 INCHES)</option>    
                  <option value="6-9 months (29,1 INCHES)">6-9 months (29,1 INCHES)</option>    
                  <option value="9-12 months (31,5 INCHES)">9-12 months (31,5 INCHES)</option>    
                  <option value="SMALL">SMALL</option>    
                  <option value="MEDIUM<">MEDIUM</option>    
                  <option value="LARGE">LARGE</option>    
                  <option value="NO SIZE">NO SIZE</option>    
                  </FormControl>
              </FormGroup>
              
           
              <FormGroup controlId="formControlsSelect">
                <FormControl onChange={this.handleBabyClothesChange}
                  componentClass="select" placeholder="Select">
                  <option value="Baby">Baby</option>
                  <option value="12-18 months (33,9 INCHES)">12-18 months (33,9 INCHES)</option>   
                  <option value="18-24 months (36,2 INCHES)">18-24 months (36,2 INCHES)</option>   
                  <option value="2-3 years (38,6 INCHES)">2-3 years (38,6 INCHES)</option>   
                  <option value="3-4 years (40,9 INCHES)">3-4 years (40,9 INCHES)</option>   
                  <option value="SMALL">SMALL</option>   
                  <option value="MEDIUM">MEDIUM</option>   
                  <option value="LARGE">LARGE</option>   
                  <option value="NO SIZE">NO SIZE</option>   
                  </FormControl>
              </FormGroup>
           
              <FormGroup controlId="formControlsSelect">
                <FormControl onChange={this.handleKidsClothesChange}
                  componentClass="select" placeholder="Select">
                  <option value="Kids">Kids</option>
                  <option value="5 years (43, 3 INCHES)">5 years (43, 3 INCHES)</option> 
                  <option value="6 years (45, 7 INCHES)">6 years (45, 7 INCHES)</option> 
                  <option value="7 years (48,0 INCHES)">7 years (48,0 INCHES)</option> 
                  <option value="8 years (50,4 INCHES)">8 years (50,4 INCHES)</option> 
                  <option value="9 years (55,1 INCHES)">9 years (55,1 INCHES)</option> 
                  <option value="10 years (55,1 INCHES)">10 years (55,1 INCHES)</option> 
                  <option value="11-12 years (59, 8 INCHES)">11-12 years (59, 8 INCHES)</option> 
                  <option value="13-14 years (64,6 INCHES)">13-14 years (64,6 INCHES)</option> 
                  <option value="SMALL">SMALL</option> 
                  <option value="MEDIUM">MEDIUM</option> 
                  <option value="LARGE<">LARGE</option> 
                  <option value="NO SIZE">>NO SIZE</option> 
                  </FormControl>
              </FormGroup>
         
              <hr />
              <h4>Shoes: </h4>
              
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select:</ControlLabel>
                <FormControl onChange={this.handleInfantShoeChange}
                  componentClass="select" placeholder="Select">
                  <option value="Infant">Infant</option>
                  <option value="0 (0-3 months)">0 (0-3 months)</option>
                  <option value="0.5 (3-6 months)">0.5 (3-6 months)</option>
                  <option value="1-2 (6-9 months)">1-2 (6-9 months)</option>
                </FormControl>
              </FormGroup>
             
              <FormGroup controlId="formControlsSelect">
                <FormControl onChange={this.handleBabyShoeChange}
                  componentClass="select" placeholder="Select">
                  <option value="Baby">Baby</option>
                  <option value="2 (6-9 months)">2 (6-9 months)</option>
                  <option value="3 (9-12 months)">3 (9-12 months)</option>
                  <option value="4 ( 1 year)">4 ( 1 year)</option>
                  <option value="5(1 year)">5(1 year)</option>
                  <option value="6 (2 years)">6 (2 years)</option>
                  <option value="6.5 (2 years)">6.5 (2 years)</option>
                  <option value="7.5 (3 years)">7.5 (3 years)</option>
                  <option value="8 (3 years)">8 (3 years)</option>
                  <option value="9 (4 years)">9 (4 years)</option>
                  <option value="9.5 (4 years)">9.5 (4 years)</option>
                </FormControl>
              </FormGroup>

                <FormGroup controlId="formControlsSelect">
                <FormControl onChange={this.handleKidsShoeChange}
                  componentClass="select" placeholder="Select">
                   <option value="Kids">Kids</option>                     
                    <option value="10.5 (5 years)">10.5 (5 years)</option>
                    <option value="11.5 (5 years)">11.5 (5 years)</option>
                    <option value="12 (6 years)">12 (6 years)</option>
                    <option value="13.5 (7 years)">13.5 (7 years)</option>
                    <option value="1.5 (8 years)">1.5 (8 years)</option>
                    <option value="2 (9 years)">2 (9 years)</option>
                    <option value="3 (10 years)">3 (10 years)</option>
                    <option value="4 (11 years)">4 (11 years)</option>
                    <option value="4.5 (12 years)">4.5 (12 years)</option>
                    <option value="5.5 (13 years)">5.5 (13 years)</option>
                    <option value="6 (14 years)">6 (14 years)</option>
                    <option value="7 (14 years)">7 (14 years)</option>
                    <option value="7.5 (14 years)">7.5 (14 years)</option>
                    </FormControl>
                </FormGroup>

                 <hr />
                 <Modal.Title>2. Choose a category:  </Modal.Title>
                 <hr />
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select:</ControlLabel>
                <FormControl onChange={this.handleChange}
                  componentClass="select" placeholder="Select">
                  <option value="clothes">Clothes</option>
                  <option value="home">Home</option>
                  <option value="travel">Travel</option>
                  <option value="education">Education</option>
                  <option value="play">Play</option>
                </FormControl>
              </FormGroup>

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

