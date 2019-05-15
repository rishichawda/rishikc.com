import React from 'react'
import Img from "gatsby-image";
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import {
  FaLinkedin, FaGithub, FaMedium, FaInstagram,
} from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import './index.scss'

export default ({ heroImage }) => (
  <section className="hero-section">
    <div className="container intro-card hidden">
      <div className="hero-image">
        <Img
          sizes={heroImage.fluid}
          alt="hero-img" />
      </div>
      <div role="main" aria-labelledby="introduction" className="hero-intro">
        <h1>Hello, I am</h1>
        <h2>Rishi Kumar Chawda</h2>
        <h3>Web and Mobile App developer</h3>
        <p>A programmer with a passion for product design and development who loves working on freelancing and open source projects.</p>
        <ul>
          <OutboundLink href="https://www.linkedin.com/in/rkrishi">
            <li>
              <FaLinkedin />
              <span>LinkedIn</span>
            </li>
          </OutboundLink>
          <OutboundLink href="https://github.com/rishichawda">
            <li>
              <FaGithub />
              <span>Github</span>
            </li>
          </OutboundLink>
          <OutboundLink href="https://medium.com/@rishiikc">
            <li>
              <FaMedium />
              <span>Medium Blogs</span>
            </li>
          </OutboundLink>
          <OutboundLink href="https://www.instagram.com/rishi.py">
            <li>
              <FaInstagram />
              <span>Instagram</span>
            </li>
          </OutboundLink>
          <OutboundLink href="/">
            <li>
              <IoMdMail />
              <span>Mail</span>
            </li>
          </OutboundLink>
        </ul>
      </div>
    </div>
  </section>
)