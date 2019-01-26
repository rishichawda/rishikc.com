import React from 'react'
import { Link } from 'gatsby'
import './index.scss';

export default () => (
  <section className="container project-section">
    <h2>open source projects</h2>
    <p>Some of my recent open source projects. You can take a look at all of them <a href="https://www.github.com/rishichawda">here</a>.</p>
    <div className="inner-container">
      <a href="https://github.com/rishichawda/markdown-magic-build-badge">
        <article className="card lang-js">
          <div className="repo-title">
            <a>
              <h4>markdown-magic-build-badge</h4>
            </a>
          </div>
          <div className="repo-description">
          <p>
          🎊 A plugin to update your branch badges to point to correct branch status.
          </p>
          </div>
        </article>
      </a>
      <a href="https://github.com/rishichawda/react-lite-components">
        <article className="card lang-js">
          <div className="repo-title">
            <a>
              <h4>react-lite-components</h4>
            </a>
          </div>
          <div className="repo-description">
          <p>
          A React UI library focused on minimum bundle size, simplicity, consistency and responsive design. ✨
          </p>
          </div>
        </article>
      </a>
      <a href="https://github.com/rishichawda/bgcreate">
        <article className="card lang-js">
          <div className="repo-title">
            <a>
              <h4>bgcreate</h4>
            </a>
          </div>
          <div className="repo-description">
          <p>
          Create background images and download files to your device.<br/> ( Currently under maintenance )
          </p>
          </div>
        </article>
      </a>
    </div>
  </section>
)
