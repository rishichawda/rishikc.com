/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import './src/index.scss';
import ScrollTop from './src/components/scrollbutton';

const Sidebar = Loadable({
  loader: () => import('./src/components/sidebar/index.js'),
  loading: () => null,
});

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
    <Sidebar />
    <Home />
    <About />
    <Work />
    <Skills />
    <Projects />
    <ScrollTop />
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
