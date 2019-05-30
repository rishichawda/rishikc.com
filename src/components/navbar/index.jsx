import React, { Component } from "react";
import { Link } from "gatsby";
import "./index.scss";
import icon from "../../images/favicon.png";

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <Link to="/" className="logo">
          <img src={icon} />
        </Link>
        <div className="navbar-links">
          <Link to="/">
            <div className="navlink">Home</div>
          </Link>
          <Link to="/articles">
            <div className="navlink">Blogs</div>
          </Link>
          <Link to="/reads">
            <div className="navlink">Reads</div>
          </Link>
        </div>
      </div>
    );
  }
}
