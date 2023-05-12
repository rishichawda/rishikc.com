import { graphql, useStaticQuery } from "gatsby";

type IconFile = {
  file: Queries.File;
};

const useIcon = () => {
  const data = useStaticQuery<IconFile>(graphql`
    query SiteOGImage {
      file(absolutePath: { glob: "**/static/assets/icon.png" }) {
        publicURL
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 1080)
        }
      }
    }
  `);

  return (
    data.file.publicURL ||
    data.file.childImageSharp?.gatsbyImageData?.images?.fallback?.src
  );
};

export default useIcon;
