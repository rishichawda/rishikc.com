import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { asyncComponent } from 'react-async-component';
import Navbar from './src/navbar';

const Home = asyncComponent({
  resolve: () => import('./src/Home'),
});

const NotFound404 = asyncComponent({
  resolve: () => import('./src/notfound'),
});

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/404" exact component={NotFound404} />
          <Redirect from="*" to="/404" />
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
