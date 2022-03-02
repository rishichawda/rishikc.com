const { colors: defaultColors, colors } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sky: {
          400: "#38bdf8",
        },
        slate: {
          900: "#0f172a"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
