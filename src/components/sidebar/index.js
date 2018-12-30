/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { FaInfoCircle, FaLinkedin, FaGithub, FaMedium, FaInstagram, FaCode } from 'react-icons/fa';
import { IoMdMail, IoIosBriefcase, IoMdColorWand } from 'react-icons/io';
import './index.scss';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToAboutSection = this.scrollTo.bind(this, 'about');
    this.scrollToWorkSection = this.scrollTo.bind(this, 'work');
    this.scrollToSkillsSection = this.scrollTo.bind(this, 'skills');
    this.scrollToProjectsSection = this.scrollTo.bind(this, 'projects');
  }

  scrollTo = (id) => {
    const element = document.getElementById(id);
    window.scroll({
      left: element.offsetLeft,
      top: element.offsetTop,
      behavior: 'smooth',
    });
  };

  render() {
    return (
      <aside className="sidebar">
        <div className="sidebar-links">
          <span className="link-title" onClick={this.scrollToAboutSection}>About this geek.</span>
          <span className="link-title" onClick={this.scrollToWorkSection}>What do I do? Hmm..</span>
          <span className="link-title" onClick={this.scrollToSkillsSection}>Skills, you asked?</span>
          <span className="link-title" onClick={this.scrollToProjectsSection}>Have a look at some projects!</span>
        </div>
        <div className="footer">
          <FaInfoCircle className="sidebar-icon" onClick={this.scrollToAboutSection} />
          <IoIosBriefcase className="sidebar-icon" onClick={this.scrollToWorkSection} />
          <IoMdColorWand className="sidebar-icon" onClick={this.scrollToSkillsSection} />
          <FaCode className="sidebar-icon" onClick={this.scrollToProjectsSection} />
          <hr />
          <a href="https://www.linkedin.com/in/rkrishi"><FaLinkedin /></a>
          <a href="https://github.com/rishichawda"><FaGithub /></a>
          <a href="https://medium.com/@rishii.kumar.chawda"><FaMedium /></a>
          <a href="https://www.instagram.com/rishi.py"><FaInstagram /></a>
          <a href="/"><IoMdMail /></a>
        </div>
      </aside>
    );
  }
}

export default Navbar;
