import { graphql, useStaticQuery } from "gatsby"

interface QueryData {
  allMdx: {
    nodes: Queries.Mdx[]
  }
}

export const useArticleList = () => {
  const data = useStaticQuery<QueryData>(graphql`
    query {
      allMdx(sort: {frontmatter: {date: DESC}}) {
        nodes {
          id
          fields {
            slug
            timeToRead {
              text
            }
          }
          excerpt(pruneLength: 340)
          frontmatter {
            subtitle
            date(formatString: "Do MMMM, YYYY")
            hero_image
            title
          }
        }
      }
    }
  `)

  return data.allMdx.nodes
}
