require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Rishi`,
    description: `Personal Website / Portfolio`,
    author: `Rishi Chawda`,
  },
  plugins: [
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `content`,
        remote: process.env.CONTENT_URI,
        branch: `main`
      }
    },
    'gatsby-plugin-dark-mode',
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/assets`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-mdx`,
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#88c1df`,
        theme_color: `#88c1df`,
        display: `minimal-ui`,
        icon: `assets/handsome-guy.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/
        }
      }
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
