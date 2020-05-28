import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Headroom from 'react-headroom'
import tw from 'tailwind.macro'

import icon from 'assets/navbar-logo.png'
import compressedIcon from 'assets/navbar-logo.webp'
import darkIcon from 'assets/favicon.png'

import { colors } from '../../../tailwind'

const Nav = styled.nav`
  ${tw`flex flex-row items-center h-full w-full absolute inset-0 justify-between`}
  padding: 0 10px;
`

const Styled = styled(Headroom)`
  background-color: ${props => props.bg || colors.bg};
  .headroom {
    ${tw`flex flex-row items-center h-full w-full fixed inset-0`}
    margin: auto;
    height: 4em;
    box-sizing: border-box;
    min-height: fit-content;
    position: fixed;
    z-index: 2;
    background-color: ${props => props.bg || colors.bg};
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
      font-size: 1.19em;
      line-height: 1.4;
      font-family: PT Sans;
    }
  }
`

function Navbar({ bg, color, disableNavbarHide, light }) {
  return (
    <Styled
      disable={disableNavbarHide}
      color={color}
      bg={light ? 'transparent' : bg}
      disableInlineStyles
      calcHeightOnResize
    >
      <Nav>
        <Link to="/" className="logo">
          <picture>
            <source srcSet={light ? darkIcon : compressedIcon} type="image/webp" />
            <source srcSet={light ? darkIcon : icon} type="image/png" />
            <img alt="logo" src={light ? icon : darkIcon} />
          </picture>
        </Link>
        <div className="navbar-links">
          <Link to="/about">
            <div
              className={
                light ? `text-gray-700 font-light font-sans` : `text-white font-light font-sans`
              }
            >
              About
            </div>
          </Link>
          <Link to="/articles">
            <div
              className={
                light ? `text-gray-700 font-light font-sans` : `text-white font-light font-sans`
              }
            >
              Blogs
            </div>
          </Link>
          <Link to="/projects">
            <div
              className={
                light ? `text-gray-700 font-light font-sans` : `text-white font-light font-sans`
              }
            >
              Projects
            </div>
          </Link>
        </div>
      </Nav>
    </Styled>
  )
}

Navbar.propTypes = {
  bg: PropTypes.string,
  color: PropTypes.string,
  disableNavbarHide: PropTypes.bool,
}

Navbar.defaultProps = {
  bg: colors.bg,
  color: undefined,
  disableNavbarHide: false,
}

export default Navbar
