/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable quotes */
import React from "react";
import "./index.scss";
import "../../assets/animate.css";
import {
  FaInfoCircle, FaLinkedin, FaGithub, FaMedium, FaInstagram, FaCode,
} from 'react-icons/fa';
import { IoMdMail, IoIosBriefcase, IoMdColorWand } from 'react-icons/io';
import geekImage from '../../assets/bg_main.jpg';
import Navbar from "../../components/navbar";

class HomePage extends React.Component {
  render() {
    return (
      <div role="main" className="container hero-section">
        <div className="intro">
          <div className="image">
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img src={geekImage} alt="geek-image" />
          </div>
          <div>
            <h2>{'Hi, I\'m Rishi.'}</h2>
            <p>{'Programmer. Developer. Tech Enthusiast.'}</p>
            <div className="footer">
              <a href="https://www.linkedin.com/in/rkrishi"><FaLinkedin /></a>
              <a href="https://github.com/rishichawda"><FaGithub /></a>
              <a href="https://medium.com/@rishii.kumar.chawda"><FaMedium /></a>
              <a href="https://www.instagram.com/rishi.py"><FaInstagram /></a>
              <a href="/"><IoMdMail /></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
