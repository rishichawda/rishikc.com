import React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import {
  FaLinkedin, FaGithub, FaMedium, FaInstagram,
} from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import heroImage from '../../images/1456505540091_2.png'
import './index.scss'

export default () => (
  <section className="hero-section">
    <div className="container intro-card">
    <div className="hero-image">
      <img src={heroImage} alt="hero-img" />
    </div>
      <div className="hero-intro">
        <h5>Hello, I am</h5>
        <h2>Rishi Kumar Chawda</h2>
        <h4>Web and Mobile App developer.</h4>
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
          <OutboundLink href="https://medium.com/@rishii.kumar.chawda">
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