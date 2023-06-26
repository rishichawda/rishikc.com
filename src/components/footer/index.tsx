import "./index.scss";

import { Link } from "gatsby";
import React from "react";
import TwitterIcon from "../icons/twitter";
import LinkedinIcon from "../icons/linkedin";
import GitHubIcon from "../icons/github";
import InstagramIcon from "../icons/instagram";
import DribbbleIcon from "../icons/dribbble";

const Footer = () => {
  return (
    <footer>
      <div>
        <nav>
          <div>
            <a href="/#about">About</a>
          </div>
          <div>
            <Link to="/articles">Blog</Link>
          </div>
          <div>
            <a href="/#repositories">Projects</a>
          </div>
          <div>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>
        <div>
          <a
            href="https://www.linkedin.com/in/rkrishi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>LinkedIn</span>
            <LinkedinIcon />
          </a>
          <a
            href="https://github.com/rishichawda"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>GitHub</span>
            <GitHubIcon />
          </a>
          <a
            href="https://www.instagram.com/rishiikc/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Instagram</span>
            <InstagramIcon />
          </a>
          <a
            href="https://twitter.com/rishiikc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Twitter</span>
            <TwitterIcon />
          </a>

          <a
            href="https://dribbble.com/rishikc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Dribbble</span>
            <DribbbleIcon />
          </a>
        </div>
        <p>
          © {new Date().getFullYear()} Rishi Kumar Chawda. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
