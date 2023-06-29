/** @type {import('tailwindcss').Config} */

const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          950: '#4C5781',
          900: '#576cbc',
          800: '#687bc3',
          700: '#7989c9',
          600: '#8998d0',
          500: '#9aa7d7',
          400: '#abb6de',
          300: '#bcc4e4',
          200: '#cdd3eb',
          100: '#dde2f2',
        },
        ...colors,
      }
    },
  },
  plugins: [],
  darkMode: "class",
}

