import { graphql, useStaticQuery } from "gatsby";
import { getImage } from "gatsby-plugin-image";

type AllImageSharpNodes = {
  allImageSharp: {
    nodes: Queries.ImageSharp[];
  };
};

const useHeroImage = (path: string) => {
  const data = useStaticQuery<AllImageSharpNodes>(graphql`
    query {
      allImageSharp {
        nodes {
          parent {
            ... on File {
              relativePath
            }
          }
          gatsbyImageData
        }
      }
    }
  `);

  const image = data.allImageSharp.nodes.find((node) => {
    const p = node?.parent?.relativePath || "";
    return p == path.replace("content/", "");
  });

  return image;
};

export default useHeroImage;
