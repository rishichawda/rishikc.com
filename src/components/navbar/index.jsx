import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Headroom from 'react-headroom'

import icon from 'assets/favicon.png'
import compressedIcon from 'assets/navbar-logo.webp'
import GithubSVGIcon from '../icons/GithubIcon'
import DevSVGIcon from '../icons/DevCommunityIcon'

// const Styled = styled(Headroom)`
//   .headroom {
//     margin: auto;
//     height: 4em;
//     box-sizing: border-box;
//     min-height: fit-content;
//     position: fixed;
//     z-index: 2;
//   }

//   .headroom--scrolled {
//     transition: transform 200ms ease-in-out;
//   }

//   .headroom--unpinned {
//     position: fixed;
//     transform: translateY(-100%);
//     transition: transform 200ms ease-in-out;
//   }

//   .headroom--pinned {
//     position: fixed;
//     transform: translateY(0%);
//     transition: transform 200ms ease-in-out;
//   }

//   .logo {
//     height: 80%;

//     img {
//       height: 100%;
//     }
//   }

//   .navbar-links {
//     display: flex;
//     height: 100%;
//     flex-direction: row;
//     align-items: center;

//     a {
//       padding: 1em;
//       text-decoration: none;
//       color: ${props => props.color || '#fff'};
//       margin-right: 5px;
//       font-size: 1.19em;
//       line-height: 1.4;
//       font-family: PT Sans;
//     }
//   }
// `

function Navbar({ bg, color, disableNavbarHide }) {
  return (
    <Headroom
      disable={disableNavbarHide}
      color={color}
      bg={bg}
      disableInlineStyles
      calcHeightOnResize
    >
      <nav className="flex items-center justify-between flex-wrap px-5 py-3">
        <div className="text-sm lg:flex-grow">
          <Link to="/">
            <img className="w-12 h-12" alt="logo" src={icon} />
          </Link>
        </div>
        <ul className="flex items-center mr-6">
          <li className="mr-8">
            <Link className="text-xl text-gray-700 font-light" to="/articles">
              Blogs
            </Link>
          </li>
          <li className="mr-8">
            <Link className="text-gray-700" href="#">
              <GithubSVGIcon className="w-8 h-8 fill-current" />
            </Link>
          </li>
          <li>
            <Link className="text-gray-700" href="#">
              <DevSVGIcon className="w-8 h-8 fill-current" />
            </Link>
          </li>
        </ul>
      </nav>
    </Headroom>
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
