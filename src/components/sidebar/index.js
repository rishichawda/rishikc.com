import React from 'react';
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
          <span onClick={this.scrollToAboutSection}>About this geek.</span>
          <span onClick={this.scrollToWorkSection}>What do I do? Hmm..</span>
          <span onClick={this.scrollToSkillsSection}>Skills, you asked?</span>
          <span onClick={this.scrollToProjectsSection}>Have a look at some projects!</span>
        </div>
        <div className="footer">
          <a href="#"><i className="fab fa-linkedin" /></a>
          <a href="#"><i className="fab fa-github" /></a>
          <a href="#"><i className="fab fa-instagram" /></a>
          <a href="#"><i className="fas fa-envelope" /></a>
        </div>
      </aside>
    );
  }
}

export default Navbar;
