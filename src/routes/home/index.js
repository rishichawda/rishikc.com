/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable quotes */
import React, { Component } from 'react';
import Navbar from '../../navbar/index.js';
import './index.scss';
import '../../assets/animate.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homepage: null,
    };
  }

  render() {
    const { homepage } = this.state;
    return (
      <div id="home" ref={(ref) => { ref !== homepage ? this.setState({ homepage: ref }) : {}; }} className="animated w-100">
        <Navbar homeref={homepage} />
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
