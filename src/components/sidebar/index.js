import React from 'react';
import './index.scss';

const Navbar = () => (
  <aside className="sidebar">
    <div className="sidebar-links">
      <a href="#about"><span>About this geek.</span></a>
      <a href="#work"><span>What do I do? Hmm..</span></a>
      <a href="#skills"><span>Skills, you asked?</span></a>
      <a href="#projects"><span>Have a look at some projects!</span></a>
    </div>
    <div className="footer">
      {/* <a href="#"><i className="fab fa-linkedin" /></a>
      <a href="#"><i className="fab fa-github" /></a>
      <a href="#"><i className="fab fa-instagram" /></a>
      <a href="#"><i className="fas fa-envelope" /></a> */}
    </div>
  </aside>
);

export default Navbar;
