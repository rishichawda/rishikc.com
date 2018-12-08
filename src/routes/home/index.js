/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable quotes */
import React from "react";
import "./index.scss";
import "../../assets/animate.css";
import geekImage from '../../assets/bg_main.jpg';

const HomePage = () => (
  <div role="main" className="container hero-section">
    <div className="intro">
      <div className="image">
        <img src={geekImage} alt="geek-image" />
      </div>
      <div>
        <h2>{'Hi, I\'m Rishi.'}</h2>
        <p>{'Programmer. Developer. Tech Enthusiast.'}</p>
      </div>
    </div>
  </div>
);

export default HomePage;
