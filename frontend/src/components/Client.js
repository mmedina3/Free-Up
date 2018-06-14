// const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
// const POSTMAN_KEY = process.env.REACT_APP_POSTMAN;

// //FOOD SEARCH EXAMPLE
// /* eslint-disable no-undef */
// function search(city, cb) {
//     state = {
//         city: "",
//         error: undefined
//       }
    
//       getCity = async (e) => {
//         e.preventDefault();
//         try {
//           const city = e.target.elements.city.value;
//           console.log(city);
    
//           let cors_url = 'https://cors-anywhere.herokuapp.com/';
//           let google_url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&key=${API_KEY}`;
    
//           var settings = {
//             "async": true,
//             "crossDomain": true,
//             "url": cors_url + google_url,
//             "method": "GET",
//             "headers": {
//               "Cache-Control": "no-cache",
//               "Postman-Token": `${POSTMAN_KEY}`
//             }
//           }
    
//           $.ajax(settings).done(function (response) {
//             console.log(response);
//           });
    
//         }
//         catch (e) {
//           console.log('Error!', e);
//         }
//       }
//     return fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&key=${API_KEY}`, {
//       accept: 'application/json',
//     }).then(checkStatus)
//       .then(parseJSON)
//       .then(cb)
//       .catch((error) => console.log(error.message));
//   }
  
//   function checkStatus(response) {
//     if (response.status >= 200 && response.status < 300) {
//       return response;
//     } else {
//       const error = new Error(`HTTP Error ${response.statusText}`);
//       error.status = response.statusText;
//       error.response = response;
//       console.log(error); // eslint-disable-line no-console
//       throw error;
//     }
//   }
  
//   function parseJSON(response) {
//     return response.json();
//   }
  
//   const Client = { search };
//   export default Client;