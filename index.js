/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import './src/index.scss';
import Navbar from './src/components/navbar/index.js';

const Home = Loadable({
  loader: () => import('./src/routes/home/index.js'),
  loading: () => null,
});

const About = Loadable({
  loader: () => import('./src/components/about/index.js'),
  loading: () => null,
});

const Skills = Loadable({
  loader: () => import('./src/components/skills/index.js'),
  loading: () => null,
});

const Work = Loadable({
  loader: () => import('./src/components/work/index.js'),
  loading: () => null,
});

const Projects = Loadable({
  loader: () => import('./src/components/projects/index.js'),
  loading: () => null,
});

const App = () => (
  <React.Fragment>
    <Navbar />
    <Home />
    <About />
    <Work />
    <Skills />
    <Projects />
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
