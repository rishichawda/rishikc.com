const { screens, colors } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        ...screens,
      },
      colors: {
        'brand': '#3e4e88',
        ...colors,
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
