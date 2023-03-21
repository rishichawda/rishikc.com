import Header from 'components/header'
import getSiteMetadata from 'query/getSiteMetadata'
import * as React from 'react'
import HeroSVG from './art'
import "./index.css"

const HeroAnimation = () => {
  return <div className="bg-brand dark:bg-slate-900 flex flex-col justify-center items-center w-full px-4 hero-main-height md:h-screen">
      <HeroSVG />
    </div>
}

export default HeroAnimation
