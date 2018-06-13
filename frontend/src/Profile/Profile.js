import React, { Component } from 'react';
import Navbars from '../components/Navbars';
//import App from './App.js';
import './Profile.css';

class Profile extends Component {
  state = {
    profile: {}
  }

  componentWillMount() {
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
        this.saveUser(profile);
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  saveUser = (profile) => {
    //fetch to db
    fetch('/profile', {
      method: 'POST',
      body: JSON.stringify({
        first_name: profile.given_name,
        last_name: profile.family_name,
        email: profile.email,
        date: profile.updated_at
      }),
      headers: {
        'content-type': 'application/json'
      },
    }).then(res => res.json())
      .then(res => console.log(res))
     .catch(err => console.log(err))
  }


  render() {
  

    const { profile } = this.state;
    console.log(this.props.location.state);
    return (
 
      <div>
          <Navbars auth={this.props.auth} history={this.props.history}/>
        <div className="profile-area">
          <h1>Hello, {profile.given_name}!</h1>
          <div className='info-container'>
            <div className='user-pic'>
              <img src={profile.picture} alt="profile" />
            </div>
            <div className='user-info'>
              <h5><strong>Name</strong>:</h5>
              <p>{profile.given_name} {' '}
                {profile.family_name}</p>
              <hr />
              <h5><strong>Email</strong>:</h5>
              <p>{profile.email}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
