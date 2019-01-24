import React, { Component } from 'react'
import heroImage from '../assets/1456505540091_2.jpg'
import './index.scss'

export default class HeroSection extends Component {
  render() {
    return (
      <div className="hero-section">
        <div className="container intro-card">
        <img src={heroImage} alt="hero-image" className="hero-image"/>
        <div className="hero-intro">
          <h5>Hello, I am</h5>
          <h2>Rishi Kumar Chawda</h2>
          <h4>Web and Mobile Apps developer.</h4>
        </div>
        </div>
      </div>
    )
  }
}
