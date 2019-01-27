import React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import './index.scss';

export default () => (
  <section className="container project-section">
    <h2>open source projects</h2>
    <p>Some of my recent open source projects. You can take a look at all of them <a href="https://www.github.com/rishichawda">here</a>.</p>
    <div className="inner-container">
      <OutboundLink href="https://github.com/rishichawda/markdown-magic-build-badge">
        <article className="card lang-js">
          <div className="repo-title">
            <OutboundLink href="https://github.com/rishichawda/markdown-magic-build-badge">
              <h4>markdown-magic-build-badge</h4>
            </OutboundLink>
          </div>
          <div className="badges">
            <OutboundLink href="https://www.npmjs.com/package/markdown-magic-branch-badge">
              <img alt="version-badge" src="https://img.shields.io/npm/v/markdown-magic-branch-badge/latest.svg?style=flat-square" />
            </OutboundLink>
          </div>
          <div className="repo-description">
            <p>
              🎊 A plugin to update your branch badges to point to correct branch status.
          </p>
          </div>
        </article>
      </OutboundLink>
      <OutboundLink href="https://github.com/rishichawda/react-lite-components">
        <article className="card lang-js">
          <div className="repo-title">
            <OutboundLink href="https://www.npmjs.com/package/react-lite-components">
              <h4>react-lite-components</h4>
            </OutboundLink>
          </div>
          <div className="badges">
            <OutboundLink href="https://www.npmjs.com/package/react-lite-components">
              <img alt="version-badge" src="https://img.shields.io/npm/v/react-lite-components/latest.svg?style=flat-square" />
            </OutboundLink>
          </div>
          <div className="repo-description">
            <p>
              A React UI library focused on minimum bundle size, simplicity, consistency and responsive design. ✨
          </p>
          </div>
        </article>
      </OutboundLink>
      <OutboundLink href="https://github.com/rishichawda/bgcreate">
        <article className="card lang-js">
          <div className="repo-title">
            <OutboundLink href="https://github.com/rishichawda/bgcreate">
              <h4>bgcreate</h4>
            </OutboundLink>
          </div>
          <div className="badges">
            <OutboundLink href="https://bgcreate.netlify.com">
              <img alt="version-badge" src="https://img.shields.io/website-up-down-green-red/https/shields.io.svg?label=click here to visit&style=flat-square" />
            </OutboundLink>
          </div>
          <div className="repo-description">
            <p>
              Create background images and download files to your device.<br /> ( Currently under maintenance )
          </p>
          </div>
        </article>
      </OutboundLink>
    </div>
  </section>
)