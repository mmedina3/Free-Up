//import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import './index.css';
import { makeMainRoutes } from './routes';


const routes = makeMainRoutes();

ReactDOM.render(
    routes,
    document.getElementById('root')
  );

//ReactDOM.render(<App />, document.getElementById('root'));

