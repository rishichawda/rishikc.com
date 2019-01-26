import React from 'react'
import { Link } from 'gatsby'
import { FaArrowRight } from 'react-icons/fa'
import './index.scss';

export default () => (
  <section className="container blog-section">
    <h2>blogs</h2>
    <div className="inner-container">
      <Link to="/blogs">
        <div className="card">

        </div>
      </Link>
      <Link to="/blogs">
        <div className="card">

        </div>
      </Link>
      <Link to="/blogs">
        <div className="card">
          <span style={{ fontSize: 20 }}>View All</span>
          <FaArrowRight style={{ marginLeft: 20, fontSize: 20 }} />
        </div>
      </Link>
    </div>
  </section>
)
