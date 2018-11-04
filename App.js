import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { asyncComponent } from 'react-async-component';

const Home = asyncComponent({
  resolve: () => import('./src/home/index.js'),
});

const ShowCase = asyncComponent({
  resolve: () => import('./src/projects/index.js'),
});

const NotFound404 = asyncComponent({
  resolve: () => import('./src/notfound/index.js'),
});

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/works" exact component={ShowCase} />
      <Route path="/404" exact component={NotFound404} />
      <Redirect from="*" to="/404" />
    </Switch>
  </Router>
);

export default App;
