/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import ContactsCard from '../contacts';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-light">
        <div className="navbar w-100" id="navbarNavAltMarkup">
          <div className="navbar-nav m-auto">
            <Link
              to="/works"
              className="nav-item nav-link mx-auto"
            >
              Work
            </Link>
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

export default Navbar;
