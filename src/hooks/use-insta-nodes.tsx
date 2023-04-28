import { graphql, useStaticQuery } from "gatsby";

const useInstagramNodes = () => {
  // Keep potato quality image and redirect to instagram for full quality.
  // Makes sure nobody wants to download images from my website.
  // Also improves page load time.
  const data = useStaticQuery(graphql`
    query GalleryQuery {
      allInstaNode(
        limit: 12
        filter: {
          mediaType: { eq: "GraphImage" }
          fields: { visibility: { eq: true } }
        }
        sort: { timestamp: DESC }
      ) {
        edges {
          node {
            id
            caption
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, quality: 2)
              }
            }
          }
        }
      }
    }
  `);

  return data.allInstaNode.edges;
};

export default useInstagramNodes;
