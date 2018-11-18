/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router-dom';
import backbutton from '../../assets/outline_arrow_back_ios_white_18dp.png';

const getNode = findDOMNode;

class ShowCase extends Component {
  constructor(props) {
    super(props);
    this.mainRef = null;
  }

  componentDidMount() {
    const showcase = getNode(this.mainRef);
    const classes = showcase.classList;
    if (
      classes.value.indexOf('slideInRight') !== -1
    ) {
      showcase.classList = classes[classes.length - 2];
    }
    showcase.classList += ' slideInRight';
  }

  render() {
    return (
      <div
        id="showcase"
        ref={(ref) => {
          this.mainRef = ref;
        }}
        className="animated pb-5"
      >
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
