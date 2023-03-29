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
      allMdx(sort: {frontmatter: {date: DESC}}) {
        nodes {
          id
          fields {
            slug
            timeToRead {
              text
            }
          }
          excerpt(pruneLength: 520)
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

  const results: [readonly Queries.Mdx[], Queries.LocalSearchArticles] = [data.allMdx.nodes, data.localSearchArticles] 
  return results
}
