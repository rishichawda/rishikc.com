import React from 'react';
import './index.scss';

const Navbar = () => (
  <div className="navbar">
    <div className="navbar-links">
      <a href="#about"><span>About</span></a>
      <a href="#skills"><span>Skills</span></a>
      <a href="#work"><span>Works</span></a>
    </div>
    <div className="navbar-links right">
      <a href="#"><i className="fab fa-linkedin" /></a>
      <a href="#"><i className="fab fa-github" /></a>
      <a href="#"><i className="fab fa-instagram" /></a>
      <a href="#"><i className="fas fa-envelope" /></a>
    </div>
  </div>
);

export default Navbar;
