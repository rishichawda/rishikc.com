module.exports = {
  plugins: {
    "@tailwindcss/postcss": {
      config: {
            path: './tailwind.config.mjs',
            applyBaseStyles: true,
          },
    },
    autoprefixer: {},
  },
};