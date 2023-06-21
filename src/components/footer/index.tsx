import "./index.scss";

import { Link } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-gtag";
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
          <OutboundLink
            href="https://www.linkedin.com/in/rkrishi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>LinkedIn</span>
            <LinkedinIcon />
          </OutboundLink>
          <OutboundLink
            href="https://github.com/rishichawda"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>GitHub</span>
            <GitHubIcon />
          </OutboundLink>
          <OutboundLink
            href="https://www.instagram.com/rishiikc/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Instagram</span>
            <InstagramIcon />
          </OutboundLink>
          <OutboundLink
            href="https://twitter.com/rishiikc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Twitter</span>
            <TwitterIcon />
          </OutboundLink>

          <OutboundLink
            href="https://dribbble.com/rishikc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Dribbble</span>
            <DribbbleIcon />
          </OutboundLink>
        </div>
        <p>
          © {new Date().getFullYear()} Rishi Kumar Chawda. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
