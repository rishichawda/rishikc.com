import React from "react";
import Img from "gatsby-image";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import { FaLinkedin, FaGithub, FaMedium, FaInstagram } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import "./index.scss";

const links = {
  LinkedIn: {
    url: "https://www.linkedin.com/in/rkrishi",
    icon: FaLinkedin
  },
  Github: {
    url: "https://github.com/rishichawda",
    icon: FaGithub
  },
  "Medium Blogs": {
    url: "https://medium.com/@rishii.kumar.chawda",
    icon: FaMedium
  },
  Instagram: {
    url: "https://www.instagram.com/rishi.py",
    icon: FaInstagram
  },
  Mail: {
    url: "",
    icon: IoMdMail
  }
};

const onClickProfileUrl = url => {
  if (typeof window !== "undefined" && url) {
    window.gtag("event", url, { url });
    window.location.href = url;
  }
};

const renderOption = (item, label) => (
  <li onClick={() => onClickProfileUrl(item.url)}>
    <item.icon />
    <span>{label}</span>
  </li>
);

export default ({ heroImage }) => (
  <section className="hero-section">
    <div className="container intro-card hidden">
      <div className="hero-image">
        <Img sizes={heroImage.fluid} alt="hero-img" />
      </div>
      <div role="main" aria-labelledby="Intro" className="hero-intro">
        <h1>Hello, I am</h1>
        <h2 id="Intro">Rishi Kumar Chawda</h2>
        <h3>Web and Mobile App developer</h3>
        <p>
          A programmer with a passion for product design and development who
          loves working on freelancing and open source projects.
        </p>
        <ul>
          {Object.keys(links).map(item => renderOption(links[item], item))}
        </ul>
      </div>
    </div>
  </section>
);
