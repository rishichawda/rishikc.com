/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import './src/index.scss';

const Hero = Loadable({
  loader: () => import('./src/hero-section/index.jsx'),
  loading: () => null,
});

const About = Loadable({
  loader: () => import('./src/about/index.js'),
  loading: () => null,
});



const App = () => (
  <>
    <Hero />
    <About />
  </>
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
