import React from 'react'
import PropTypes from 'prop-types'
import './header.css'
import Fade from 'react-reveal/Fade'

const Header = ({ children, title }) => (
  <div className="container flex items-center justify-center w-screen min-w-full article-list-header-container">
    <Fade bottom cascade>
      <div>
        {title && <h1 className="text-center">{title}</h1>}
        {children && <h2 className="text-center text-xl mt-8">{children}</h2>}
      </div>
    </Fade>
  </div>
)

Header.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
}

Header.defaultProps = {
  children: null,
  title: '',
}

export default Header
