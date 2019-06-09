import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Headroom from 'react-headroom'

import icon from 'assets/navbar-logo.png'

import { colors } from '../../../tailwind'
import './index.scss'

const Styled = styled(Headroom)`
  background-color: ${props => props.bg || colors.bg};
  .headroom {
    top: 0;
    left: 0;
    right: 0;
    zindex: 1;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: row;
    height: 4em;
    position: absolute;
    box-sizing: border-box;
    min-height: fit-content;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 2;
    padding: 0 10px;
    background-color: ${props => props.bg || colors.bg};
  }

  .headroom--unfixed {
    position: relative;
    transform: translateY(0);
    transition: transform 200ms ease-in-out;
  }

  .headroom--scrolled {
    transition: transform 200ms ease-in-out;
    background-color: ${props => props.bg || colors.bg};
  }

  .headroom--unpinned {
    position: fixed;
    transform: translateY(-100%);
    transition: transform 200ms ease-in-out;
  }

  .headroom--pinned {
    position: fixed;
    transform: translateY(0%);
    transition: transform 200ms ease-in-out;
    background-color: ${props => props.bg || colors.bg};
  }

  .logo {
    height: 80%;

    img {
      height: 100%;
    }
  }

  .navbar-links {
    display: flex;
    height: 100%;
    flex-direction: row;
    align-items: center;
    background-color: ${props => props.bg || colors.bg};

    a {
      padding: 1em;
      text-decoration: none;
      color: ${props => props.color || '#fff'};
      margin-right: 5px;
      font-size: 1.24em;
      line-height: 1.4;
      font-family: gudea;
    }
  }
`

function Navbar({ bg, color, disableNavbarHide }) {
  const resolveParent = () => {
    const parent = document.getElementById('homepage-parallax')
    if (parent) {
      return parent
    }
    return window
  }

  return (
    <Styled
      disable={disableNavbarHide}
      color={color}
      bg={bg}
      parent={resolveParent}
      disableInlineStyles
      calcHeightOnResize
    >
      <Link to="/" className="logo">
        <img alt="navbar-logo" src={icon} />
      </Link>
      <div className="navbar-links">
        <Link to="/">
          <div className="navlink">Home</div>
        </Link>
        <Link to="/articles">
          <div className="navlink">Blogs</div>
        </Link>
        <Link to="/reads">
          <div className="navlink">Reads</div>
        </Link>
      </div>
    </Styled>
  )
}

Navbar.propTypes = {
  bg: PropTypes.string,
  color: PropTypes.string,
  disableNavbarHide: PropTypes.bool,
}

Navbar.defaultProps = {
  bg: undefined,
  color: undefined,
  disableNavbarHide: false,
}

export default Navbar
