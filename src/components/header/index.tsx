import * as React from "react"
import PropTypes from "prop-types"
import "./index.css"
import DevIcon from 'assets/awesome-dev.svg'
import DribbbleIcon from 'assets/icon-dribbble.svg'
import GitHubIcon from 'assets/icon-github.svg'
import LinkedInIcon from 'assets/icon-linkedin.svg'
import MediumIcon from 'assets/icon-medium.svg'
import TwitterIcon from 'assets/icon-twitter.svg'
import Logo from 'assets/logo.svg'
import SOIcon from 'assets/icon-stack-overflow.svg'
import ThemeToggleButton from "./toggle"
import GatsbyLink from "gatsby-link"

type HeaderProps = {
  siteTitle: string
}

const Links = [
  { IconComponent: LinkedInIcon, url: 'https://www.linkedin.com/in/rkrishi' },
  { IconComponent: GitHubIcon, url: 'https://www.github.com/rishichawda' },
  { IconComponent: TwitterIcon, url: 'https://twitter.com/rishiikc' },
  { IconComponent: DevIcon, url: 'https://dev.to/rishikc' },
  { IconComponent: DribbbleIcon, url: 'https://www.dribbble.com/rishikc' },
  // { IconComponent: SOIcon, url: 'https://www.linkedin.com/in/rkrishi' },
  { IconComponent: MediumIcon, url: 'https://medium.com/@rishii.kumar.chawda' },
]

const Header = ({ siteTitle }: HeaderProps) => {
  const onClickProfileUrl = url => {
    if (typeof window !== 'undefined' && url) {
      if (window.gtag) {
        window.gtag('event', url, { url })
      }
      window.open(url, '_newtab')
    }
  }
  return (
    <header className="absolute flex bg-sky-400 dark:bg-slate-900 2xl:h-28 h-20 w-full">
      <div className="flex flex-row items-center justify-between xl:max-w-4xl 2xl:max-w-7xl w-full h-full mx-auto px-2">
        <GatsbyLink to="/" className="p-2">
          <Logo className="max-h-full w-auto" />
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="120" height="82" viewBox="0 0 120 82"> */}
            {/* <text id="Rishi" transform="translate(0 62)" fill="#fdfdfd" font-size="65" font-family="Caveat-SemiBold, Caveat" font-weight="600"><tspan x="0" y="0">Rishi</tspan></text> */}
          {/* </svg> */}
        </GatsbyLink>
        <div className="flex flex-row items-center justify-between">
          <div className="hidden md:flex flex-row">
            {Links.map((item) => <item.IconComponent className="w-full h-5 2xl:h-7 ml-5" onClick={() => onClickProfileUrl(item.url)} />)}
          </div>
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
