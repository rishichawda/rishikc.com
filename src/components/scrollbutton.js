/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { FaArrowUp } from 'react-icons/fa';

class ScrollTop extends Component {
  scrollToTop = () => {
    const { onClickButton } = this.props;
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
    onClickButton('home');
  }

  render() {
    return (
      <div className="scroll-button" onClick={this.scrollToTop}>
        <FaArrowUp />
      </div>
    );
  }
}

export default ScrollTop;
