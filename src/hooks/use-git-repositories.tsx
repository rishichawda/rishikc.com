import { graphql, useStaticQuery } from "gatsby";

const useGitRepositoryInfo = () => {
  const data = useStaticQuery(graphql`
    query {
      github {
        viewer {
          repositories(
            orderBy: { field: STARGAZERS, direction: DESC }
            first: 6
            ownerAffiliations: OWNER
          ) {
            edges {
              node {
                id
                name
                url
                descriptionHTML
                stargazerCount
                owner {
                  login
                }
                languages(
                  orderBy: { field: SIZE, direction: DESC }
                  first: 10
                ) {
                  edges {
                    node {
                      color
                      name
                    }
                    size
                  }
                  totalSize
                }
              }
            }
          }
        }
      }
    }
  `);

  return data.github.viewer.repositories.edges;
};

export default useGitRepositoryInfo;
