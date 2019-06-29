import React from 'react'
import Layout from 'components/layouts'
import styled from 'styled-components'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import Header from 'elements/Header'
import './index.scss'
import { colors } from '../../../tailwind'

const data = [
  {
    title: 'Markdown Magic build badge',
    description:
      '🎊 A plugin to update your branch badges to point to correct branch status. You can use it in a script, as a git hook or directly from the command line itself!',
    gitLink: 'https://github.com/rishichawda/markdown-magic-build-badge',
    image: 'https://raw.githubusercontent.com/rishichawda/markdown-magic-build-badge/master/example/demo.gif',
  },
  {
    title: 'Simple typeracer',
    description:
      'Simple typeracer implementation in javascript (ReactJS and Node). Generates random texts with the help of Sentencer. Made with a clean and minimalistic ui.',
    gitLink: 'https://github.com/rishichawda/simple-typeracer',
    image: 'https://raw.githubusercontent.com/rishichawda/simple-typeracer/master/.github/screenshot.png',
  },
  {
    title: 'Background generator',
    description:
      '🎨 Create background images with particles or paint tool and download them to your local device. 💻 📱 ✨',
    gitLink: 'https://github.com/rishichawda/bgcreate',
    image: 'https://raw.githubusercontent.com/rishichawda/bgcreate/master/examples/demo.gif',
  },
  {
    title: 'Calendar widget',
    description:
      'A cross platform reminder and notes application for Mac, Linux and Windows. Work in progress. 🚧  Made with ElectronJS and developed on random days of boredom.',
    gitLink: 'https://github.com/rishichawda/calendar-app',
    image: 'https://raw.githubusercontent.com/rishichawda/calendar-app/master/.github/screenshot.png',
  },
  {
    title: 'React Lite UI',
    description:
      'A set of themable, customizable and light-weight react components aimed at small bundle size and flexibility.',
    gitLink: 'https://github.com/Codebrahma/react-lite-ui',
    image: 'https://raw.githubusercontent.com/Codebrahma/react-lite-ui/development/.github/images/logo.png',
  },
  {
    title: 'Tic Tac Toe - Android',
    description: 'A simple tic-tac-toe game to play on your Android device.',
    gitLink: 'https://github.com/rishichawda/Tic-Tac-Toe-Android',
    color: '#b07219',
    image: 'https://image.flaticon.com/icons/png/512/518/518215.png',
  },
  {
    title: 'Weather App',
    description: 'Simple weather app using Google Maps API and Openweather.org weather API.',
    gitLink: 'https://github.com/rishichawda/weatherapp',
    image: 'https://i.ya-webdesign.com/images/weather-icon-png-1.png',
  },
  {
    title: 'Weather App chrome extension',
    description: 'Weather app integration into chrome extension.',
    gitLink: 'https://github.com/rishichawda/weatherapp-chrome-extension',
    image: 'https://i.ya-webdesign.com/images/weather-icon-png-1.png',
  },
]

const dataPlates = [
  {
    title: 'React boilerplate',
    description:
      'Minimal react boilerplate with all the necessary things - lint hooks, module resolution, snapshot and dom testing, continuous integration, etc.',
    gitLink: 'https://github.com/rishichawda/minimal-react-boilerplate',
    image: 'https://cdn0.iconfinder.com/data/icons/social-media-2127/48/social_media_social_media_logo_atom-256.png',
  },
  {
    title: 'Node backend boilerplate',
    description: 'Minimal NodeJS boilerplate with authentication setup using Passport, JWT and bcrypt.',
    gitLink: 'https://github.com/rishichawda/minimal-server-boilerplate',
    image: 'https://cdn.iconscout.com/icon/free/png-256/node-js-3-1174937.png',
  },
  {
    title: 'Lighthouse Mocha template',
    description: 'Example template for automating lighthouse tests with Mocha.',
    gitLink: 'https://github.com/rishichawda/lighthouse-mocha-example',
    image: 'https://lighthouse-ci.appspot.com/logo-nolight.png',
  },
]

const SectionHeader = styled.h1`
  font-size: 1.15rem;
  line-height: 2rem;
  font-weight: 400;
`

// eslint-disable-next-line react/prop-types
const CardItem = ({ data: { title, description, gitLink, color, image } }) => (
  <div className="card" langColor={color}>
    <img src={image} alt="project" />
    <div className="content">
      <div className="repo-title">
        <h4>{title}</h4>
      </div>
      <OutboundLink className="link" href={gitLink} target="_newtab">
        View in GitHub
        <svg
          className="icon icon-link"
          version="1.1"
          width="11.5"
          height="11.5"
          viewBox="0 0 512 512"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path>
        </svg>
      </OutboundLink>
      <div className="repo-description">
        <p>{description}</p>
      </div>
    </div>
  </div>
)

const pageMeta = {
  keywords:
    'web,developer,react,development,app development,websites,design,progressive,web apps,bangalore,bengaluru area india,mobile,application,android,app developer,ios,mobile apps development',
}

const App = () => (
  <Layout withFooter disableNavbarHide bg={colors.bg} keywords={pageMeta.keywords}>
    <Header small title="Projects" />
    <div className="main">
      <div className="container">
        {data.map(item => (
          <CardItem data={item} />
        ))}
      </div>
      <div className="container flex">
        <SectionHeader>Some boilerplates that I have open sourced and use in my projects : </SectionHeader>
      </div>
      <div className="container">
        {dataPlates.map(item => (
          <CardItem data={item} />
        ))}
      </div>
    </div>
  </Layout>
)

export default App
