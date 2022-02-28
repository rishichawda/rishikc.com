import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import "./index.css"
import DevIcon from 'assets/awesome-dev.svg'
import DribbbleIcon from 'assets/icon-dribbble.svg'
import GitHubIcon from 'assets/icon-github.svg'
import LinkedInIcon from 'assets/icon-linkedin.svg'
import MediumIcon from 'assets/icon-medium.svg'
import TwitterIcon from 'assets/icon-twitter.svg'
import SOIcon from 'assets/icon-stack-overflow.svg'
import ThemeToggleButton from "./toggle"

type HeaderProps = {
  siteTitle: string
}

const Header = ({ siteTitle }: HeaderProps) => (
  <header className="flex flex-row items-center justify-between bg-transparent h-20 max-w-7xl w-full mx-auto px-7">
    <div className="p-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="120" height="82" viewBox="0 0 120 82">
        <text id="Rishi" transform="translate(0 62)" fill="#fdfdfd" font-size="65" font-family="Caveat-SemiBold, Caveat" font-weight="600"><tspan x="0" y="0">Rishi</tspan></text>
      </svg>
    </div>
    <div className="flex flex-row items-center justify-between">
      <LinkedInIcon className="w-full h-7 ml-5" />
      <GitHubIcon className="w-full h-7 ml-5" />
      <TwitterIcon className="w-full h-7 ml-5" />
      <DevIcon className="w-full h-7 ml-5" />
      <DribbbleIcon className="w-full h-7 ml-5" />
      <SOIcon className="w-full h-7 ml-5" />
      <MediumIcon className="w-full h-7 ml-5" />
      <ThemeToggleButton />
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
