/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import backbutton from '../assets/outline_arrow_back_ios_white_18dp.png';

class ShowCase extends Component {
  componentDidMount() {
    this.slideIn();
  }

  showHome = () => {
    $('body').addClass('geek-background');
    $('#showcase')
      .addClass('slideOutRight')
      .one(
        'webkitAnimationEnd oAnimationEnd msAnimationEnd animationEnd',
        (event) => {
          $('#home').addClass('zoomIn');
          $('.fadeIn').removeClass('fadeIn');
          $('#showcase').removeClass('slideOutRight');
          $('#greeter_message').removeClass('jackInTheBox');
          $('#home')
            .show()
            .one(
              'webkitAnimationEnd oAnimationEnd msAnimationEnd animationEnd',
              (event) => {
                $('body').removeClass('geek-background');
                $('#home').removeClass('zoomIn');
              },
            );
          $('#showcase').hide();
        },
      );
  };

  slideIn = () => {
    $('body').addClass('geek-background');
    $('#home')
      .addClass('zoomOut')
      .one(
        'webkitAnimationEnd oAnimationEnd msAnimationEnd animationEnd',
        (event) => {
          $('#showcase').addClass('slideInRight');
          $('#home').removeClass('zoomOut');
          $('#showcase')
            .show()
            .one(
              'webkitAnimationEnd oAnimationEnd msAnimationEnd animationEnd',
              (event) => {
                $('body').removeClass('geek-background');
                $('#showcase').removeClass('slideInRight');
              },
            );
          $('#home').hide();
        },
      );
  };

  render() {
    return (
      <div id="showcase" className="animated pb-5">
        <nav className="navbar navbar-expand navbar-dark">
          <div className="navbar-brand" onClick={this.showHome}>
            <img
              src={backbutton}
              width="30"
              height="30"
              alt=""
            />
          </div>
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
