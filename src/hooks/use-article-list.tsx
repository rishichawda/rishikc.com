import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  allMdx: Queries.MdxConnection;
  localSearchArticles: Queries.LocalSearchArticles;
};

type FlattenedArticleNode = {
  id: string;
  excerpt: string;
  slug: string;
  title: string;
  subtitle: string;
  timeToRead: string;
  date: Queries.MdxFrontmatter_dateArgs;
  tags: string[];
};

export const useArticleList = () => {
  const data = useStaticQuery<QueryData>(graphql`
    query {
      localSearchArticles {
        index
        store
      }
      allMdx(sort: { frontmatter: { date: DESC } }) {
        edges {
          previous {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
          next {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
          node {
            id
            excerpt(pruneLength: 340)
            frontmatter {
              title
              subtitle
              date(formatString: "MMMM D, YYYY")
              tags
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
  `);

  const results: [readonly Queries.MdxEdge[], Queries.LocalSearchArticles] = [
    data.allMdx.edges,
    data.localSearchArticles,
  ];
  return results;
};

export const getPreviousAndNext = (path: string) => {
  let [edges, _] = useArticleList();
  let res = edges.find((x) => x.node.fields?.slug === path);
  return res;
};

export const filterByTags = (data: any[], tags: string[]) => {
  return data.filter((edge) => {
    return edge.node.frontmatter.tags.some((t: string) => tags.includes(t));
  });
};

export const transformFlexSearchData = (
  data: FlattenedArticleNode[]
): Queries.MdxEdge[] => {
  return data.map((x: FlattenedArticleNode) => ({
    node: {
      id: x.id,
      fields: {
        slug: x.slug,
        timeToRead: {
          text: x.timeToRead,
        },
      },
      frontmatter: {
        title: x.title,
        subtitle: x.subtitle,
        date: x.date,
        tags: x.tags,
      },
      excerpt: x.excerpt,
    },
  })) as unknown as Queries.MdxEdge[];
};
