import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetadata = () => {
  const data = useStaticQuery<{
    site: { siteMetadata: Queries.SiteSiteMetadata };
  }>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          og {
            type
          }
          twitter {
            card
            creator
          }
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
