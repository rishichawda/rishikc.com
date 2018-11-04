/* eslint-disable import/extensions */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable quotes */
import React, { Component } from 'react';
import Navbar from '../navbar/index.js';
import './index.scss';

class HomePage extends Component {
  render() {
    return (
      <div id="home" className="animated w-100">
        <Navbar />
        <div className="container-fluid">
          <div className="row p-5 mt-5">
            <h2
              className="lead m-auto display-3 animated jackInTheBox"
              id="greeter_message"
            >
              {"Hi, I'm Rishi."}
            </h2>
          </div>
          <div className="row p-5 text-white">
            <div className="col-sm-11 mx-auto">
              <p className="text-center">
                <span className="animated fadeIn">{"Web Developer? "}</span>
                <span className="animated fadeIn">{"Designer? "}</span>
                <span className="animated fadeIn">{"Frontend? "}</span>
                <span className="animated fadeIn">{"Backend? "}</span>
                <span className="animated fadeIn">{"Full stack? "}</span>
                <span className="animated fadeIn">
                  {"Data Science enthusiast? "}
                </span>
              </p>
              <p className="text-center">
                <span className="animated fadeIn">Preferred title -</span>
                <span
                  className="lead animated fadeIn"
                  style={{ fontSize: '1.6em' }}
                >
                  {" Coder"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
