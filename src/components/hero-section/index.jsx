import React from 'react'
import { FaLinkedin, FaDev, FaGithub, FaMedium, FaTwitter } from 'react-icons/fa'
import Typist from 'react-typist'
import './index.scss'
import { Link } from 'gatsby'
import Spinner from 'react-spinkit'

const niceImage = require('assets/1456505540091.png')
const nicelyCompressedImage = require('assets/1456505540091.webp')
const Bounce = require('react-reveal/Bounce')
const Fade = require('react-reveal/Fade')

const links = {
  LinkedIn: {
    url: 'https://www.linkedin.com/in/rkrishi',
    icon: FaLinkedin,
  },
  Github: {
    url: 'https://github.com/rishichawda',
    icon: FaGithub,
  },
  Dev: {
    url: 'https://dev.to/rishikc',
    icon: FaDev,
  },
  Twitter: {
    url: 'https://www.twitter.com/rishiikc',
    icon: FaTwitter,
  },
  'Medium Blogs': {
    url: 'https://medium.com/@rishii.kumar.chawda',
    icon: FaMedium,
  },
}

const onClickProfileUrl = url => {
  if (typeof window !== 'undefined' && url) {
    if (window.gtag) {
      window.gtag('event', url, { url })
    }
    window.open(url, '_newtab')
  }
}

const renderOption = (item, key) => (
  <li
    role="menuitem"
    key={key}
    className="flex-1"
    onKeyPress={() => onClickProfileUrl(item.url)}
    onClick={() => onClickProfileUrl(item.url)}
  >
    <item.icon className="text-3xl mx-3 text-gray-600 hover:text-gray-700 cursor-pointer" />
  </li>
)

const Hero = () => {
  const [isAnimationDone, setAnimationDone] = React.useState(false)
  const [shouldShowLink, setLinkVisibilityState] = React.useState(false)
  const [isLoadComplete, setLoadComplete] = React.useState(false)

  const initiateTyping = () => {
    setTimeout(() => {
      setAnimationDone(true)
    }, 1500)
  }

  const onImageLoadComplete = () => {
    setLoadComplete(true)
  }

  const showMoreLink = () => {
    setLinkVisibilityState(true)
  }

  return (
    <section className="container flex flex-col mx-auto h-full items-center p-2">
      {!isLoadComplete ? (
        <div className="w-full h-screen absolute z-50 inset-0 flex items-center justify-center">
          <Spinner name="ball-clip-rotate-multiple" />
        </div>
      ) : null}
      <Fade when={isLoadComplete} delay={200} bottom onReveal={initiateTyping}>
        <div className="px-4 py-2 mt-32">
          <picture onLoad={onImageLoadComplete} className="rounded-full w-56 h-56">
            <source srcSet={nicelyCompressedImage} type="image/webp" />
            <source srcSet={niceImage} type="image/png" />
            <img
              className="shadow-xl rounded-full w-56 h-56"
              alt="rishi_kumar_chawda"
              src={niceImage}
            />
          </picture>
        </div>
        <div className="flex flex-col items-center">
          {isAnimationDone ? (
            <>
              <Typist
                avgTypingDelay={79}
                stdTypingDelay={38}
                cursor={{ hideWhenDone: true }}
                className="text-gray-700 text-center text-2xl px-4 py-2 mt-5 font-light font-sans"
                onTypingDone={showMoreLink}
              >
                <span>Full Stack Web Developer</span>
                <Typist.Backspace count={9} delay={500} />
                <span>and Mobile Applications Developer</span>
              </Typist>
              <Bounce cascade delay={1200} when={shouldShowLink}>
                <ul className="flex fit-content mb-32 mt-8">
                  {Object.keys(links).map(item => renderOption(links[item], item))}
                </ul>
              </Bounce>
            </>
          ) : null}
          <Link
            className="mt-20 text-xl text-gray-500 hover:text-gray-700 hover:opacity-75 font-light"
            to="/about"
          >
            <Bounce cascade delay={2000} when={shouldShowLink}>
              Know more
            </Bounce>
          </Link>
        </div>
      </Fade>
    </section>
  )
}

export default Hero
