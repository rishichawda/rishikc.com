/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  FaInfoCircle, FaLinkedin, FaGithub, FaMedium, FaInstagram, FaCode,
} from 'react-icons/fa';
import { IoMdMail, IoIosBriefcase, IoMdColorWand } from 'react-icons/io';
import './index.scss';
import ScrollTop from '../scrollbutton';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToAboutSection = this.scrollTo.bind(this, 'about');
    this.scrollToWorkSection = this.scrollTo.bind(this, 'work');
    this.scrollToSkillsSection = this.scrollTo.bind(this, 'skills');
    this.scrollToProjectsSection = this.scrollTo.bind(this, 'projects');
    this.setInitialState = () => this.setState({ currentView: 'home' });
    this.state = {
      currentView: 'home',
    };
  }

  scrollTo = (id) => {
    const element = document.getElementById(id);
    window.scroll({
      left: element.offsetLeft,
      top: element.offsetTop,
      behavior: 'smooth',
    });
    this.setState({
      currentView: id,
    });
  };

  render() {
    const { currentView } = this.state;
    return (
      <div className="navbar">
        <div className="sidebar-links">
          <span className={`link-title${currentView === 'about' ? ' current-active' : ''}`} onClick={this.scrollToAboutSection}>About</span>
          <span className={`link-title${currentView === 'work' ? ' current-active' : ''}`} onClick={this.scrollToWorkSection}>work</span>
          <span className={`link-title${currentView === 'skills' ? ' current-active' : ''}`} onClick={this.scrollToSkillsSection}>skills</span>
          <span className={`link-title${currentView === 'projects' ? ' current-active' : ''}`} onClick={this.scrollToProjectsSection}>projects</span>
        </div>
        <ScrollTop onClickButton={this.setInitialState} />
      </div>
    );
  }
}

export default Navbar;
