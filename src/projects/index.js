/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backbutton from '../assets/outline_arrow_back_ios_white_18dp.png';

class ShowCase extends Component {
  render() {
    return (
      <div className="animated pb-5">
        <nav className="navbar navbar-expand navbar-dark">
          <Link to="/">
            <div className="navbar-brand">
              <img src={backbutton} width="30" height="30" alt="" />
            </div>
          </Link>
        </nav>
        <div className="container text-center lead">
          <p>Developer is feeling lazy..</p>
          This page will be updated soon..
        </div>
      </div>
    );
  }
}

export default ShowCase;
