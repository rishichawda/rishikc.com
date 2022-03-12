const { screens } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        ...screens,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
