import React from 'react'
import niceImage from 'assets/1456505540091.png'
import nicelyCompressedImage from 'assets/1456505540091.webp'
import { Link } from 'gatsby'
import Typist from 'react-typist'

const onClickProfileUrl = url => {
  if (typeof window !== 'undefined' && url) {
    if (window.gtag) {
      window.gtag('event', url, { url })
    }
    window.open(url, '_newtab')
  }
}

export default function Hero() {
  return (
    <section className="container flex flex-col mx-auto h-full items-center p-2">
      <div className="px-4 py-2 mt-32">
        <picture className="rounded-full w-56 h-56">
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
        <Typist
          avgTypingDelay={79}
          stdTypingDelay={38}
          cursor={{ hideWhenDone: true }}
          className="text-gray-700 text-center text-2xl px-4 py-2 mt-5 mb-40 font-light font-sans"
        >
          <span>Full Stack Web Developer</span>
          <Typist.Backspace count={9} delay={500} />
          <span>and Mobile Applications Developer</span>
        </Typist>
        <Link
          className="mt-20 text-lg text-gray-400 hover:text-gray-700 hover:opacity-75 font-light"
          to="/about"
        >
          Know more
        </Link>
      </div>
    </section>
  )
}
