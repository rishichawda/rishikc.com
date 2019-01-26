import React from 'react'
import './index.scss';
import developerAtDesk from '../../images/about-right.png';

export default () => (
  <section className="container about-section">
    <div className="about-section-inner">
      <div className="about-content">
        <h4>About me</h4>
        <p>{'I\'m a web and native apps developer from Bangalore, India.'}</p>
        <p>I design and develop websites, progressive web applications and native mobile applications for Android and iOS.</p>
        <p>Apart from good food, traveling, music and art - I am interested in search engine optimisation, analytics, online marketing and data science.</p>
      </div>
      <div className="about-image">
        <img src={developerAtDesk} alt="about-right" />
      </div>
      <h4 className="max-width820">About me</h4>
    </div>
  </section>
    )
