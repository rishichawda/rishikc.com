import { graphql, useStaticQuery } from "gatsby";

const useInstagramNodes = () => {
  // Keep potato quality image and redirect to instagram for full quality.
  // Makes sure nobody wants to download images from my website.
  // Also improves page load time.
  const data = useStaticQuery(graphql`
    query GalleryQuery {
      allInstagramNode(
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
            localImage {
              id
              childImageSharp {
                gatsbyImageData(
                  aspectRatio: 1
                  transformOptions: { cropFocus: CENTER }
                  width: 200
                  formats: [WEBP]
                  placeholder: DOMINANT_COLOR
                )
              }
            }
          }
        }
      }
    }
  `);

  return data.allInstagramNode.edges;
};

export default useInstagramNodes;
