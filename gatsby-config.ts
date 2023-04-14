import siteMetadata from './static/metadata';

import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config: GatsbyConfig = {
  siteMetadata: siteMetadata,
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `content`,
        remote: process.env.CONTENT_URI,
        branch: `main`
      }
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'GitHub',
        fieldName: 'github',
        url: 'https://api.github.com/graphql',
        headers: {
          Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        }
      },
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: process.env.INSTAGRAM_USER_ID,
      },
    },
    `gatsby-plugin-dark-mode`,
    "gatsby-plugin-sass",
    'gatsby-plugin-postcss',
    "gatsby-plugin-google-gtag",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "static/assets/handsome-guy.webp"
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "static/assets"
      },
      __key: "images"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "src/pages"
      },
      __key: "pages"
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'InstaNode',
        imagePath: 'original',
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID,
          process.env.GATSBY_GOOGLE_AD_CLIENT
        ],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          respectDNT: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-source-filesystem',
            options: {
              "name": "pages",
              "path": "src/pages"
            },
          },
          {
            resolve: "gatsby-remark-embed-gist",
            options: {
              username: "rishichawda",
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1280,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-smartypants`,
            options: {
              dashes: "oldschool",
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: "autolink-header-icon"
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              noInlineHighlight: true,
            }
          },
          {
            resolve: `gatsby-plugin-canonical-urls`,
            options: {
              siteUrl: siteMetadata.siteUrl,
            },
          },
        ],
      }
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'articles',
        engine: 'flexsearch',
        query: `
          {
            allMdx {
              edges {
                node {
                  id
                  excerpt(pruneLength: 520)
                  frontmatter {
                    title
                    subtitle
                    banner
                    date(formatString: "MMMM D, YYYY")
                    tags
                  }
                  fields {
                    slug
                    timeToRead {
                      text
                    }
                  }
                }
              }
            }
          }
        `,
        ref: 'id',
        index: ['title', 'excerpt', 'tags'],
        store: ['id', 'excerpt', 'title', 'subtitle', 'banner', 'date', 'tags', 'slug', 'timeToRead'],
        normalizer: ({ data }: { data: { allMdx: Queries.MdxConnection } }) =>
          data.allMdx.edges.map((edge: Queries.MdxEdge) => ({
            id: edge.node.id,
            excerpt: edge.node.excerpt,
            title: edge.node.frontmatter?.title,
            subtitle: edge.node.frontmatter?.subtitle,
            banner: edge.node.frontmatter?.banner,
            date: edge.node.frontmatter?.date,
            tags: edge.node.frontmatter?.tags,
            slug: edge.node.fields?.slug,
            timeToRead: edge.node.fields?.timeToRead?.text,
          })),
      },
    },
  ]
};

export default config;
