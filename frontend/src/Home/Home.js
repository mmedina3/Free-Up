// import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';

// class Home extends Component {
//   goTo(route) {
//     this.props.history.replace(`/${route}`)
//   }

//   login() {
//     this.props.auth.login();
//   }
//   render() {
//     const { isAuthenticated } = this.props.auth;
//     return (
//       <div className="container">

//         {
//           isAuthenticated() && (
//             <h4>
//               You are logged in!
//               </h4>
//           )
//         }
//         {
//           isAuthenticated() && (
//             <Button
//               bsStyle="primary"
//               className="btn-margin"
//               onClick={this.goTo.bind(this, 'profile')}
//             >
//               Profile
//                 </Button>
//           )
//         }
//                 {
//           isAuthenticated() && (
//             <Button
//               bsStyle="primary"
//               className="btn-margin"
//               onClick={this.goTo.bind(this, '')}
//             >
//               Home
//                 </Button>
//           )
//         }
//         {
//           !isAuthenticated() && (
//             <h4>
//               You are not logged in! Please{' '}
//               <a
//                 style={{ cursor: 'pointer' }}
//                 onClick={this.login.bind(this)}
//               >
//                 Log In
//                 </a>
//               {' '}to continue.
//               </h4>
//           )
//         }

//       </div>

//     );
//   }
// }

// export default Home;
