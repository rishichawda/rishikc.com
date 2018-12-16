/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';

class ScrollTop extends Component {
  scrollToTop = () => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  }

  render() {
    return (
      <div className="scroll-button" onClick={this.scrollToTop}>
        <i className="fas fa-arrow-up" />
      </div>
    );
  }
}

export default ScrollTop;
