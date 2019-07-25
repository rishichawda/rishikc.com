import React from 'react'
import { Link } from 'gatsby'

import './404.scss'

const Page404 = () => (
  <div className="html404 body404">
    <div className="bubble" />
    <div className="bubble" />
    <div className="bubble" />
    <div className="bubble" />
    <div className="bubble" />
    <div className="main-404">
      <h1>404</h1>
      <p>Oops! Looks like you're lost..</p>
      <br />
      <p>Need help?</p>
      <Link to="/">
        <button type="button">go to home page</button>
      </Link>
    </div>
  </div>
)

export default Page404
