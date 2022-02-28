const { colors: defaultColors } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...defaultColors,
      blue: "#88c1df",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
