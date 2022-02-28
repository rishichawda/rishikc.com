import { graphql, useStaticQuery } from "gatsby"
import { SiteMetadata } from "types/siteMetadata"

const getSiteMetadata = (): SiteMetadata => {
    const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `)

  return data.site.siteMetadata || {}
}

export default getSiteMetadata
