import React, { Component } from 'react'
import { Link } from 'gatsby'
import './index.scss'
import styled from 'styled-components'
import Headroom from 'react-headroom'
import icon from '../../images/navbar-logo.png'
import icondark from '../../images/favicon.png'
import { colors } from '../../../tailwind'

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
    background-color: inherit;
    ${props => (props.shadow ? 'box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);' : '')}
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
      font-size: 1.1em;
      line-height: 1.4;
    }
  }
`

export default function Navbar({ bg, color }) {
  const resolveParent = () => {
    const parent = document.getElementById('homepage-parallax')
    if (parent) {
      return parent
    }
    return window
  }

  return (
    <Styled color={color} bg={bg} parent={resolveParent} disableInlineStyles calcHeightOnResize>
      <Link to="/" className="logo">
        <img src={bg === '#fff' ? icondark : icon} />
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
