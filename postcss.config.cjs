module.exports = {
  plugins: {
    "@tailwindcss/postcss": {
      config: {
            path: './tailwind.config.mjs',
            applyBaseStyles: false,
          },
    },
    autoprefixer: {},
  },
};