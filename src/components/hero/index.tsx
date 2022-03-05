import Header from 'components/header'
import getSiteMetadata from 'query/getSiteMetadata'
import * as React from 'react'
import HeroSVG from './art'
import "./index.css"

const HeroAnimation = () => {
    return <div className="bg-sky-400 dark:bg-slate-900 flex flex-col items-center w-full h-screen">
        <HeroSVG />
    </div>
}

export default HeroAnimation
