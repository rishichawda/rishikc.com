import { graphql, useStaticQuery } from "gatsby"

type QueryData = {
  allMdx: Queries.MdxConnection;
  localSearchArticles: Queries.LocalSearchArticles
}

export const useArticleList = () => {
  const data = useStaticQuery<QueryData>(graphql`
    query {
      localSearchArticles {
        index
        store
      }
      allMdx {
        edges {
          node {
            id
            excerpt(pruneLength: 340)
            frontmatter {
              title
              subtitle
              banner
              date(formatString: "MMMM D, YYYY")
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
  `)

  const results: [readonly Queries.MdxEdge[], Queries.LocalSearchArticles] = [data.allMdx.edges, data.localSearchArticles]
  return results
}
