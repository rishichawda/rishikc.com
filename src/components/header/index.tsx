import * as React from "react"
import PropTypes from "prop-types"
import "./index.css"
import DevIcon from 'assets/awesome-dev.svg'
import DribbbleIcon from 'assets/icon-dribbble.svg'
import GitHubIcon from 'assets/icon-github.svg'
import LinkedInIcon from 'assets/icon-linkedin.svg'
import MediumIcon from 'assets/icon-medium.svg'
import TwitterIcon from 'assets/icon-twitter.svg'
import SOIcon from 'assets/icon-stack-overflow.svg'
import ThemeToggleButton from "./toggle"
import GatsbyLink from "gatsby-link"

type HeaderProps = {
  siteTitle: string
}

const Header = ({ siteTitle }: HeaderProps) => (
  <header className="absolute flex bg-sky-400 dark:bg-slate-900 2xl:h-28 h-20 w-full">
    <div className="flex flex-row items-center justify-between xl:max-w-4xl 2xl:max-w-7xl w-full h-full mx-auto px-2">
      <GatsbyLink to="/" className="p-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="82" viewBox="0 0 120 82">
          <text id="Rishi" transform="translate(0 62)" fill="#fdfdfd" font-size="65" font-family="Caveat-SemiBold, Caveat" font-weight="600"><tspan x="0" y="0">Rishi</tspan></text>
        </svg>
      </GatsbyLink>
      <div className="flex flex-row items-center justify-between">
        <div className="hidden md:flex flex-row">
          <LinkedInIcon className="w-full h-5 2xl:h-7 ml-5" />
          <GitHubIcon className="w-full h-5 2xl:h-7 ml-5" />
          <TwitterIcon className="w-full h-5 2xl:h-7 ml-5" />
          <DevIcon className="w-full h-5 2xl:h-7 ml-5" />
          <DribbbleIcon className="w-full h-5 2xl:h-7 ml-5" />
          <SOIcon className="w-full h-5 2xl:h-7 ml-5" />
          <MediumIcon className="w-full h-5 2xl:h-7 ml-5" />
        </div>
        <ThemeToggleButton />
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
