import React from 'react'
import { FaLinkedin, FaGithub, FaMedium, FaInstagram } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import './index.scss'
import downArrow from 'assets/down-arrow.svg'

const links = {
  LinkedIn: {
    url: 'https://www.linkedin.com/in/rkrishi',
    icon: FaLinkedin,
  },
  Github: {
    url: 'https://github.com/rishichawda',
    icon: FaGithub,
  },
  'Medium Blogs': {
    url: 'https://medium.com/@rishii.kumar.chawda',
    icon: FaMedium,
  },
  Instagram: {
    url: 'https://www.instagram.com/rishi.py',
    icon: FaInstagram,
  },
  Mail: {
    url: '',
    icon: IoMdMail,
  },
}

const onClickProfileUrl = url => {
  if (typeof window !== 'undefined' && url) {
    window.gtag('event', url, { url })
    window.location.href = url
  }
}

const renderOption = item => (
  <li onClick={() => onClickProfileUrl(item.url)}>
    <item.icon />
  </li>
)

export default function Hero() {
  return (
    <section className="hero-section">
      <div role="main" aria-labelledby="Intro" className="hero-intro">
        <h1>Hello,</h1>
        <h2 id="Intro">I'm, Rishi</h2>
        <h3>Web and Mobile App developer</h3>
        <p>
          A programmer with a passion for product design and development who loves working on freelancing and open
          source projects.
        </p>
        <ul>{Object.keys(links).map(item => renderOption(links[item]))}</ul>
      </div>
      <img alt="scroll-button" className="bounce" src={downArrow} width="30px" height="auto" />
    </section>
  )
}
