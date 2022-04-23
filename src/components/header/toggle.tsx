import React from "react"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

import "./index.css"

const ThemeToggleButton = ({ onChange, theme }) => {
  const onButtonClick = () => {
    let nextTheme = theme === "light" ? "dark" : "light"
    onChange(nextTheme)
  }
  return (
    <div className="ml-5">
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="69.667" height="44" viewBox="0 0 69.667 44">
        <defs>
          <filter id="moon" x="28.5" y="2.833" width="36.333" height="36.333" filterUnits="userSpaceOnUse">
            <feOffset input="SourceAlpha" />
            <feGaussianBlur stdDeviation="1" result="blur-2" />
            <feFlood flood-opacity="0.161" />
            <feComposite operator="in" in2="blur-2" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter id="container" x="0" y="0" width="69.667" height="44" filterUnits="userSpaceOnUse">
            <feOffset dx="1" dy="1" input="SourceAlpha" />
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feFlood flood-opacity="0.102" />
            <feComposite operator="in" in2="blur" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter id="sun-outer" x="2.833" y="2.833" width="36.333" height="36.333" filterUnits="userSpaceOnUse">
            <feOffset input="SourceAlpha" />
            <feGaussianBlur stdDeviation="1" result="blur-2" />
            <feFlood flood-opacity="0.161" />
            <feComposite operator="in" in2="blur-2" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter id="sun" x="1.833" y="1.833" width="38.333" height="38.333" filterUnits="userSpaceOnUse">
            <feOffset input="SourceAlpha" />
            <feGaussianBlur stdDeviation="2.5" result="blur-3" />
            <feFlood flood-color="#ffeb00" />
            <feComposite operator="in" in2="blur-3" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter id="cloud" x="42.365" y="7.833" width="20.232" height="13.09" filterUnits="userSpaceOnUse">
            <feOffset input="SourceAlpha" />
            <feGaussianBlur stdDeviation="0.5" result="blur-4" />
            <feFlood flood-opacity="0.251" />
            <feComposite operator="in" in2="blur-4" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>
        <g className={theme} id="Component_15_1" data-name="Component 15 – 1" transform="translate(3.5 3.5)">
          {/* Toggle background */}
          <g transform="matrix(1, 0, 0, 1, -3.5, -3.5)" filter="url(#container)">
            <rect id="container" data-name="container" width="60.667" height="35" rx="17.5" transform="translate(3.5 3.5)" fill="#83cbd8" />
          </g>
          {/* button */}
          <g id="button" onClick={onButtonClick} transform="translate(2.333 2.333)">
            <g id="sun" data-name="sun">
              <g transform="matrix(1, 0, 0, 1, -5.83, -5.83)" filter="url(#sun-outer)">
                <circle id="sun-outer-2" data-name="sun-outer" cx="15.167" cy="15.167" r="15.167" transform="translate(5.83 5.83)" fill="#f8e664" />
              </g>
              <g transform="matrix(1, 0, 0, 1, -5.83, -5.83)" filter="url(#sun)">
                <path id="sun-3" data-name="sun" d="M11.667,0A11.667,11.667,0,1,1,0,11.667,11.667,11.667,0,0,1,11.667,0Z" transform="translate(9.33 9.33)" fill="rgba(246,254,247,0.29)" />
              </g>
              <circle id="sun-inner" cx="7" cy="7" r="7" transform="translate(8.167 8.167)" fill="#fcf4b9" />
            </g>
            <g id="moon" data-name="moon">
              <g transform="matrix(1, 0, 0, 1, -31.5, -5.83)" filter="url(#moon)">
                <circle id="moon-3" data-name="moon" cx="15.167" cy="15.167" r="15.167" transform="translate(31.5 5.83)" fill="#cce6ee" />
              </g>
              <g id="patches" transform="translate(-24.415 -1.009)">
                <circle className="patch" cx="2" cy="2" r="2" transform="translate(43.009 4.496)" />
                <circle className="patch" data-name="patch" cx="2" cy="2" r="2" transform="translate(39.366 17.952)" />
                <circle className="patch" data-name="patch" cx="1" cy="1" r="1" transform="translate(33.016 8.044)" />
                <circle className="patch" data-name="patch" cx="1" cy="1" r="1" transform="translate(51.081 18.888)" />
                <circle className="patch" data-name="patch" cx="1" cy="1" r="1" transform="translate(33.016 22.503)" />
                <circle className="patch" data-name="patch" cx="1.5" cy="1.5" r="1.5" transform="translate(50.081 10.53)" />
              </g>
            </g>
          </g>
          {/* background art (clouds and stars) */}
          <g transform="matrix(1, 0, 0, 1, -3.5, -3.5)" filter="url(#cloud)">
            <path id="cloud" data-name="cloud" d="M3512.81,173.815a4.463,4.463,0,0,1,2.243.62.95.95,0,0,1,.72-1.281,4.852,4.852,0,0,1,2.623.519c.034.02-.5-1.968.281-2.716a2.117,2.117,0,0,1,2.829-.274,1.821,1.821,0,0,1,.854,1.858c.063.037,2.594-.049,3.285,1.273s-.865,2.544-.807,2.626a12.192,12.192,0,0,1,2.278.892c.553.448,1.106,1.992-1.62,2.927a7.742,7.742,0,0,1-3.762-.3c-1.28-.49-1.181-2.65-1.137-2.624s-1.417,2.2-2.623,2.2a4.172,4.172,0,0,1-2.394-1.206,3.825,3.825,0,0,1-2.771.774c-3.429-.46-2.333-3.267-2.2-3.55A3.721,3.721,0,0,1,3512.81,173.815Z" transform="translate(-3466.47 -160.94)" fill="#fff" />
          </g>
          <g id="stars" transform="translate(3.585 1.325)">
            <path className="star" d="M.774,0,.566.559,0,.539.458.933.25,1.492l.485-.361.458.394L1.024.953,1.509.592.943.572Z" transform="matrix(-1, 0.017, -0.017, -1, 24.231, 3.055)" />
            <path className="star" data-name="star" d="M1.341.529.836.472.736,0,.505.46,0,.4.4.729l-.231.46L.605.932l.4.326L.9.786Z" transform="matrix(-0.777, 0.629, -0.629, -0.777, 23.185, 12.358)" />
            <path className="star" data-name="star" d="M.015,1.065.475.9l.285.365L.766.772l.46-.164L.745.494.751,0,.481.407,0,.293.285.658Z" transform="matrix(0.438, 0.899, -0.899, 0.438, 23.177, 29.735)" />
            <path className="star" data-name="star" d="M1.161,1.6,1.059,1,1.574.722.962.607.86,0,.613.572,0,.457.446.881.2,1.454l.516-.274Z" transform="translate(12.677 0.388) rotate(104)" />
            <path className="star" data-name="star" d="M.873,1.648l.114-.62L1.579.945,1.03.62,1.144,0,.706.464.157.139.438.7,0,1.167l.592-.083Z" transform="matrix(-0.07, 0.998, -0.998, -0.07, 11.066, 15.457)" />
            <path className="star" data-name="star" d="M.593,0,.638.724,0,.982l.7.211.045.724.36-.64.7.211L1.342.935,1.7.294,1.063.552Z" transform="translate(8.326 28.061) rotate(11)" />
            <path className="star" data-name="star" d="M.816,0,.5.455,0,.311.323.767l-.312.455.516-.215.323.456L.827.911,1.343.7.839.552Z" transform="translate(5.012 5.962) rotate(172)" />
            <path className="star" data-name="star" d="M1.261,0,.774.571.114.3.487.967,0,1.538.728,1.32l.372.662.047-.749.728-.218L1.215.749Z" transform="translate(2.218 14.616) rotate(169)" />
          </g>
        </g>
      </svg>
    </div>
  )
}

const ThemeToggle = () => {
  return <ThemeToggler>
    {
      ({ theme, toggleTheme }) => {
        // Don't render anything at compile time. Deferring rendering until we
        // know which theme to use on the client avoids incorrect initial
        // state being displayed.
        if (theme == null) {
          return null
        }
        return <ThemeToggleButton onChange={toggleTheme} theme={theme} />
      }
    }
  </ThemeToggler>
}

export default ThemeToggle
