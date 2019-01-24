/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import './src/index.scss';

// const Home = Loadable({
//   loader: () => import('./src/routes/home/index.js'),
//   loading: () => null,
// });

// const About = Loadable({
//   loader: () => import('./src/components/about/index.js'),
//   loading: () => null,
// });



const App = () => (
  <div>clean start</div>
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
