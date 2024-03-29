import resolveConfig from 'tailwindcss/resolveConfig';

import siteMetadata from './static/metadata';
import tailwindConfig from './tailwind.config.js';

import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const twConfig = resolveConfig(tailwindConfig)

const config: GatsbyConfig = {
  siteMetadata: siteMetadata,
  flags: {
    // Disabling DEV_SSR since it is troublesome right now.
    // https://github.com/gatsbyjs/gatsby/discussions/28138
    // DEV_SSR: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
  },
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
      resolve: `instagram-graphql-media`,
      options: {
        instagram_id: process.env.INSTAGRAM_USERNAME,
        headers: {
          Cookie: process.env.INSTAGRAM_COOKIE,
        }
      },
    },
    `gatsby-plugin-dark-mode`,
    "gatsby-plugin-sass",
    'gatsby-plugin-postcss',
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
        nodeType: 'InstagramNode',
        imagePath: 'original',
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
              gistCssPreload: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1280,
              showCaptions: true,
              markdownCaptions: true,
              withWebp: true,
              linkImagesToOriginal: false,
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
              className: "autolink-header-icon",
              isIconAfterHeader: true,
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              noInlineHighlight: true,
            }
          },
        ],
      }
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: siteMetadata.siteUrl,
        stripQueryString: true,
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: process.env.DISQUS_SHORTNAME
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
        store: ['id', 'excerpt', 'title', 'subtitle', 'date', 'tags', 'slug', 'timeToRead'],
        normalizer: ({ data }: { data: { allMdx: Queries.MdxConnection } }) =>
          data.allMdx.edges.map((edge: Queries.MdxEdge) => ({
            id: edge.node.id,
            excerpt: edge.node.excerpt,
            title: edge.node.frontmatter?.title,
            subtitle: edge.node.frontmatter?.subtitle,
            date: edge.node.frontmatter?.date,
            tags: edge.node.frontmatter?.tags,
            slug: edge.node.fields?.slug,
            timeToRead: edge.node.fields?.timeToRead?.text,
          })),
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {

                const siteUrl = site.siteMetadata.siteUrl
                const slug = siteUrl + edge.node.fields.slug

                return Object.assign({}, edge.node.frontmatter, {
                  url: slug,
                  guid: slug,
                  custom_elements: [
                    { "content:encoded": edge.node.excerpt }
                  ],
                })
              })
            },
            query: `
              {
                allMdx(sort: {frontmatter: {date: DESC}}) {
                  edges {
                    node {
                      excerpt(pruneLength: 340)
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        description
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Rishi's Blog - rishikc.com",
          },
        ]
      }
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sitemap",
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteMetadata.siteUrl,
        sitemap: `${siteMetadata.siteUrl}/sitemap-index.xml`,
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'static/assets/icon.png',
        icon_options: {
          purpose: `any maskable`,
        },
        name: siteMetadata.title,
        short_name: siteMetadata.title,
        start_url: '/',
        background_color: twConfig.theme.colors.brand["900"],
        theme_color: twConfig.theme.colors.brand["900"],
        display: 'standalone',
        include_favicon: true,
        theme_color_in_head: false,
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: twConfig.theme.colors.brand["900"],
        showSpinner: true,
      },
    },
    `gatsby-plugin-offline`
  ]
};

export default config;
