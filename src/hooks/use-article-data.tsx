import { graphql, useStaticQuery } from "gatsby";

export const useArticleData = () => {
  const data = useStaticQuery<{ mdx: Queries.Mdx }>(graphql`
    query ($id: String) {
      mdx(id: { eq: $id }) {
        fields {
          timeToRead {
            text
          }
        }
        frontmatter {
          title
          subtitle
          hero_image
          date(formatString: "MMMM D, YYYY")
        }
      }
    }
  `);

  return data.mdx;
};
