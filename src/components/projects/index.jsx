import React from "react";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import "./index.scss";

export default () => (
  <section className="container project-section hidden">
    <h2>open source projects</h2>
    <p>
      Some of my recent open source projects.
      </p>
      <p>You can check out all other{" "}
      <a
        aria-label="Link to Github Profile"
        href="https://www.github.com/rishichawda"
      >
        github repositories
      </a>
      {" "}on my profile.
    </p>
    <div className="inner-container">
      <OutboundLink
        aria-label="Github repository link for markdown-magic-build-badge plugin"
        href="https://github.com/rishichawda/markdown-magic-build-badge"
      >
        <article className="card lang-js hidden">
          <div className="repo-title">
            <h3>markdown-magic-build-badge</h3>
          </div>
          <div className="badges">
            <img
              alt="version-badge"
              src="https://img.shields.io/npm/v/markdown-magic-branch-badge/latest.svg?style=flat-square"
            />
          </div>
          <div className="repo-description">
            <p>
              🎊 A plugin to update your branch badges to point to correct
              branch status. Can be used in a script, as a git hook or directly
              from the command line itself!
            </p>
          </div>
        </article>
      </OutboundLink>
      <OutboundLink
        aria-label="Github repository link for react-lite-components"
        href="https://github.com/rishichawda/react-lite-components"
      >
        <article className="card lang-js hidden">
          <div className="repo-title">
            <h3>react-lite-components</h3>
          </div>
          <div className="badges">
            <img
              alt="version-badge"
              src="https://img.shields.io/npm/v/react-lite-components/latest.svg?style=flat-square"
            />
          </div>
          <div className="repo-description">
            <p>
              A React UI library focused on minimum bundle size, simplicity,
              consistency and responsive design. ✨
            </p>
          </div>
        </article>
      </OutboundLink>
      <OutboundLink
        aria-label="Github repository link for bg-create"
        href="https://github.com/rishichawda/bgcreate"
      >
        <article className="card lang-js hidden">
          <div className="repo-title">
            <h3>bgcreate</h3>
          </div>
          <div className="badges">
            <OutboundLink
              aria-label="link to bg-create webpage"
              href="https://bgcreate.netlify.com"
            >
              <img
                alt="version-badge"
                src="https://img.shields.io/website-up-down-green-red/https/shields.io.svg?label=click here to visit&style=flat-square"
              />
            </OutboundLink>
          </div>
          <div className="repo-description">
            <p>
              Create background images and download files to your device.
              <br /> ( Currently under maintenance )
            </p>
          </div>
        </article>
      </OutboundLink>
      <OutboundLink
        aria-label="Github repository link for simple-typeracer"
        href="https://github.com/rishichawda/simple-typeracer"
      >
        <article className="card lang-js hidden">
          <div className="repo-title">
            <h3>Typeracer</h3>
          </div>
          <div className="badges">
            <OutboundLink
              aria-label="link to simple-typeracer webpage"
              href="https://typerace.now.sh"
            >
              <img
                alt="version-badge"
                src="https://img.shields.io/website-up-down-green-red/https/shields.io.svg?label=click here to visit&style=flat-square"
              />
            </OutboundLink>
          </div>
          <div className="repo-description">
            <p>
              Simple typeracer app with less distractions and funny auto
              generated texts. A simple two-hour programming gig done on a lazy
              weekend. Don't expect much!! :)
            </p>
          </div>
        </article>
      </OutboundLink>
      <OutboundLink
        aria-label="Github repository link to calendar electron app"
        href="https://github.com/rishichawda/calendar-app"
      >
        <article className="card lang-js hidden">
          <div className="repo-title">
            <h3>Minimal Cal</h3>
          </div>
          <div className="badges">
            <OutboundLink href="">
              <img
                alt="version-badge"
                src="https://img.shields.io/static/v1.svg?label=click here to visit&message=repository&color=9cf&style=flat-square"
              />
            </OutboundLink>
          </div>
          <div className="repo-description">
            <p>
              Cross platform reminders and notes application for Mac, Linux and
              Windows. Built with ElectronJS and boredom. <br />
              <br />
              🚧 Work in progress.
            </p>
          </div>
        </article>
      </OutboundLink>
    </div>
  </section>
);
