import React from 'react'
import Layout from 'components/layouts'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import Header from 'elements/Header'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import node from 'static/server.svg'
import react from 'static/react.svg'
import lighthouse from 'static/lighthouse.svg'
import weather from 'static/weather.svg'
import weatherExt from 'static/weather_ext.svg'
import calendar from 'static/calendar.svg'
import bgGen from 'static/bg_gen.svg'
import typewriter from 'static/typewriter.svg'
import ui from 'static/ui.svg'

const data = [
  {
    title: 'Simple typeracer',
    description:
      'A Simple typeracer implementation in javascript (ReactJS and Node). It generates random texts with the help of Sentencer and has a clean and minimalistic UI.',
    gitLink: 'https://github.com/rishichawda/simple-typeracer',
    image: typewriter,
  },
  {
    title: 'Markdown Magic build badge',
    description:
      '🎊 A plugin to update branch badges to point to the correct branch status. You can use it in a script, as a git hook or directly from the command line itself!',
    gitLink: 'https://github.com/rishichawda/markdown-magic-build-badge',
    image:
      'https://raw.githubusercontent.com/rishichawda/markdown-magic-build-badge/master/example/demo.gif',
  },
  {
    title: 'Background generator',
    description:
      '🎨 Create background images with particles or paint tool and download them to your local device. 💻 📱 ✨',
    gitLink: 'https://github.com/rishichawda/bgcreate',
    image: bgGen,
  },
  {
    title: 'Calendar widget',
    description:
      'A cross-platform reminder and notes application for Mac, Linux, and Windows. Work in progress. 🚧 Made with ElectronJS and developed on random days of boredom.',
    gitLink: 'https://github.com/rishichawda/calendar-app',
    image: calendar,
  },
  {
    title: 'React Lite UI',
    description:
      'A set of theme-able, customizable, and light-weight react components aimed at small bundle size and flexibility.',
    gitLink: 'https://github.com/Codebrahma/react-lite-ui',
    image: ui,
  },
  {
    title: 'Weather App',
    description: 'Simple weather app using Google Maps API and Openweather.org weather API.',
    gitLink: 'https://github.com/rishichawda/weatherapp',
    image: weather,
  },
  {
    title: 'Tic Tac Toe - Android',
    description: 'A simple tic-tac-toe game to play on your Android device.',
    gitLink: 'https://github.com/rishichawda/Tic-Tac-Toe-Android',
    color: '#b07219',
    image: 'https://image.flaticon.com/icons/png/512/518/518215.png',
  },
  {
    title: 'Weather App chrome extension',
    description: 'Weather app integration into a chrome extension.',
    gitLink: 'https://github.com/rishichawda/weatherapp-chrome-extension',
    image: weatherExt,
  },
]

const dataPlates = [
  {
    title: 'React boilerplate',
    description:
      'Minimal react boilerplate with all the necessary things - lint hooks, module resolution, snapshot, and dom testing, continuous integration, etc.',
    gitLink: 'https://github.com/rishichawda/minimal-react-boilerplate',
    image: react,
  },
  {
    title: 'Node backend boilerplate',
    description:
      'Minimal NodeJS boilerplate with authentication setup using Passport, JWT, and bcrypt.',
    gitLink: 'https://github.com/rishichawda/minimal-server-boilerplate',
    image: node,
  },
  {
    title: 'Lighthouse Mocha template',
    description: 'Example template for automating lighthouse tests with Mocha.',
    gitLink: 'https://github.com/rishichawda/lighthouse-mocha-example',
    image: lighthouse,
  },
]

// eslint-disable-next-line react/prop-types
const CardItem = ({ data: { title, description, gitLink, color, image } }) => (
  <div className="card">
    <img src={image} alt="project" />
    <div className="content">
      <div className="header">
        <div className="repo-title">
          <h4>{title}</h4>
        </div>
        <OutboundLink className="link" href={gitLink} target="_newtab">
          <FaGithub />
        </OutboundLink>
      </div>
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
  <Layout withFooter disableNavbarHide keywords={pageMeta.keywords}>
    <Header small title="Projects" />
    <div className="main">
      <div className="container">
        {data.map(item => (
          <CardItem key={item.title} data={item} />
        ))}
      </div>
      <div className="container">
        {dataPlates.map(item => (
          <CardItem key={item.title} data={item} />
        ))}
      </div>
    </div>
  </Layout>
)

export default App
