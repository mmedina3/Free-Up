import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
    };

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
      body: data
    }).then((response) => {
       //console.log(response.json())
      response.json().then((body) => {
        console.log(body)
        this.setState({ imageURL: `/${body.file}` });
      });
    });
}


  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" name="imageDatas" />
          <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter a decription" />
          <br />
          <button>Upload</button>
        
       <img src={this.state.imageURL} alt="img" />
      </form>
    );
  }
}

export default Main;

