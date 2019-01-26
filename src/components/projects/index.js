import React from 'react'
import { Link } from 'gatsby'
import './index.scss';

export default () => (
  <section className="container project-section">
    <h2>open source projects</h2>
    <p>Some of my recent open source projects. You can take a look at all of them <a href="https://www.github.com/rishichawda">here</a>.</p>
    <div className="inner-container">
      <Link to="/">
        <article className="card lang-js">

        </article>
      </Link>
      <Link to="/">
        <article className="card lang-js">

        </article>
      </Link>
      <Link to="/">
        <article className="card lang-js">

        </article>
      </Link>
    </div>
  </section>
)
