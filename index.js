/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from './src/routes/home/index.js';
import './src/index.scss';
import Navbar from './src/components/navbar/index.js';
import About from './src/components/about/index.js';

const App = () => (
  <React.Fragment>
    <Navbar />
    <Home />
    <About />
  </React.Fragment>
);

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

render(App);

// Webpack Hot Module Replacement API
if (process.env.MODE === 'development') {
  if (module.hot) {
    module.hot.accept('./App', () => {
      render(App);
    });
  }
}
