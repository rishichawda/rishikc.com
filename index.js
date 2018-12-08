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

const App = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route path="/" exact component={Home} />
      <Redirect from="*" to="/404" />
    </Switch>
  </Router>
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
