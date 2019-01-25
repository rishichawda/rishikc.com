import React, { Component } from 'react'
import {
  FaLinkedin, FaGithub, FaMedium, FaInstagram,
} from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import heroImage from '../assets/1456505540091_2.jpg'
import './index.scss'

export default class HeroSection extends Component {
  render() {
    return (
      <div className="hero-section">
        <div className="container intro-card">
          <img src={heroImage} alt="hero-image" className="hero-image" />
          <div className="hero-intro">
            <h5>Hello, I am</h5>
            <h2>Rishi Kumar Chawda</h2>
            <h4>Web and Mobile App developer.</h4>
            <p>A programmer with a passion for product design and development who loves working on freelancing and open source projects.</p>
            <ul>
              <a href="https://www.linkedin.com/in/rkrishi">
                <li>
                  <FaLinkedin />
                  LinkedIn
                </li>
              </a>
              <a href="https://github.com/rishichawda">
                <li>
                  <FaGithub />
                  Github
                </li>
              </a>
              <a href="https://medium.com/@rishii.kumar.chawda">
                <li>
                  <FaMedium />
                  Medium Blogs
                </li>
              </a>
              <a href="https://www.instagram.com/rishi.py">
                <li>
                  <FaInstagram />
                  Instagram
                </li>
              </a>
              <a href="/">
                <li>
                  <IoMdMail />
                  Mail
                </li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
