/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { withRouter } from 'react-router-dom';
import './index.scss';
import ContactsCard from '../contacts';

const getNode = findDOMNode;

class Navbar extends Component {
  oneFunction = () => {
    const { homeref, history } = this.props;
    const classes = getNode(homeref).classList;
    getNode(homeref).classList = classes[classes.length - 2];
    getNode(homeref).style.display = 'hidden';
    history.push('/works');
  };

  slideIn = () => {
    const { homeref } = this.props;
    getNode(homeref).classList += ' zoomOut';
    setTimeout(() => {
      this.oneFunction();
    }, 1000);
  };

  render() {
    return (
      <nav className="navbar navbar-expand navbar-light">
        <div className="navbar w-100" id="navbarNavAltMarkup">
          <div className="navbar-nav m-auto">
            <div onClick={this.slideIn} className="nav-item nav-link mx-auto">
              Work
            </div>
            <div
              className="nav-item nav-link mx-auto"
              data-toggle="modal"
              data-target="#contactcard"
            >
              Contact
            </div>
            <ContactsCard />
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
