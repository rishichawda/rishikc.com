/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import './src/index.scss';

const Navbar = Loadable({
  loader: () => import('./src/components/navbar/index.js'),
  loading: () => <div>Loading..</div>,
});

const Home = Loadable({
  loader: () => import('./src/routes/home/index.js'),
  loading: () => <div>Loading..</div>,
});

const About = Loadable({
  loader: () => import('./src/components/about/index.js'),
  loading: () => <div>Loading..</div>,
});

const Skills = Loadable({
  loader: () => import('./src/components/skills/index.js'),
  loading: () => <div>Loading..</div>,
});

const Work = Loadable({
  loader: () => import('./src/components/work/index.js'),
  loading: () => <div>Loading..</div>,
});

const Footer = Loadable({
  loader: () => import('./src/components/footer/index.js'),
  loading: () => <div>Loading..</div>,
});

const App = () => (
  <React.Fragment>
    <Navbar />
    <Home />
    <About />
    <Skills />
    <Work />
    <Footer />
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
