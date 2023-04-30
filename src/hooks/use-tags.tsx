import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  globalMetadata: Queries.GlobalMetadata;
};

export const useTags = () => {
  const data = useStaticQuery<QueryData>(graphql`
    query {
      globalMetadata {
        data {
          mdx {
            tags {
              all
              top
            }
          }
        }
      }
    }
  `);

  const allTags = (data.globalMetadata?.data?.mdx?.tags?.all || []) as string[];
  const topTags = (data.globalMetadata?.data?.mdx?.tags?.top || []) as string[];
  const topTagsWithCount = allTags.filter((tag) =>
    topTags.join(" ").includes(tag.split("(")[0].trim())
  );

  const allTagsData: [readonly string[], readonly string[]] = [
    allTags,
    topTagsWithCount,
  ];
  return allTagsData;
};
