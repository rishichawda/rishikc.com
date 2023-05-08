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
    <footer className="dark:text-gray-200">
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
          <div className="px-5 py-2">
            <a
              href="#about"
              className="text-base leading-6 hover:text-brand-800"
            >
              About
            </a>
          </div>
          <div className="px-5 py-2">
            <Link
              to="/articles"
              className="text-base leading-6 hover:text-brand-800"
            >
              Blog
            </Link>
          </div>
          <div className="px-5 py-2">
            <a
              href="#articles-preview"
              className="text-base leading-6 hover:text-brand-800"
            >
              Projects
            </a>
          </div>
          <div className="px-5 py-2">
            <Link
              to="/contact"
              className="text-base leading-6 hover:text-brand-800"
            >
              Contact
            </Link>
          </div>
        </nav>
        <div className="flex justify-center mt-8 space-x-6">
          <OutboundLink
            className="text-gray-400 hover:text-gray-500"
            href="https://www.linkedin.com/in/rkrishi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">LinkedIn</span>
            <LinkedinIcon />
          </OutboundLink>
          <OutboundLink
            className="text-gray-400 hover:text-gray-500"
            href="https://github.com/rishichawda"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">GitHub</span>
            <GitHubIcon />
          </OutboundLink>
          <OutboundLink
            className="text-gray-400 hover:text-gray-500"
            href="https://www.instagram.com/rishiikc/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">Instagram</span>
            <InstagramIcon />
          </OutboundLink>
          <OutboundLink
            className="text-gray-400 hover:text-gray-500"
            href="https://twitter.com/rishiikc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">Twitter</span>
            <TwitterIcon />
          </OutboundLink>

          <OutboundLink
            className="text-gray-400 hover:text-gray-500"
            href="https://dribbble.com/rishikc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">Dribbble</span>
            <DribbbleIcon />
          </OutboundLink>
        </div>
        <p className="mt-8 text-center text-gray-400">
          © {new Date().getFullYear()} Rishi Kumar Chawda. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
