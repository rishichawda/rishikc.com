import React from "react";

const JsonLDSchema: React.FC<JsonLDSchemaProps> = (props) => {
  let json_ld = {};
  if (props.article) {
    json_ld = { ...props.website, ...props.article };
  } else {
    json_ld = { ...props.website };
  }
  return <script type="application/ld+json">{JSON.stringify(json_ld)}</script>;
};

type ArticleSchema = {
  "@type": "NewsArticle";
  "@id": string;
  headline: string;
  image: string;
  dateCreated: string;
  datePublished: string;
  dateModified: string;
  author: {
    "@type": "Person";
    name: string;
    url: string;
    sameAs: string[];
  };
  creator: {
    "@type": "Person";
    name: string;
    url: string;
    sameAs: string[];
  };
  publisher: {
    "@type": "Organization";
    name: string;
    url: string;
    logo: string;
    sameAs: string[];
  };
};

type WebSiteSchema = {
  "@context": "https://schema.org/";
  "@type": "WebSite";
  url: string;
  name: string;
  description: string;
  keywords: string[];
  mainEntityOfPage: string;
  image: string;
};

type JsonLDSchemaProps = {
  article?: ArticleSchema;
  website: WebSiteSchema;
};

export default JsonLDSchema;
