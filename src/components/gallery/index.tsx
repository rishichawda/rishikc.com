import { OutboundLink } from "gatsby-plugin-google-gtag";
import React from "react";

import useInstagramNodes from "../../hooks/use-insta-nodes";
import Card from "./card";

const Gallery = () => {
  const data = useInstagramNodes();

  return (
    <div className="flex flex-col w-full mx-auto px-4 mb-28 justify-between gallery-preview-container">
      <div
        id="gallery-preview"
        aria-label="gallery-preview"
        className="flex flex-row justify-between pb-6"
      >
        <h2 className="antialiased">Gallery</h2>
        <OutboundLink
          href="https://www.instagram.com/rishiikc/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-700 dark:text-brand-400 hover:text-brand-900 dark:hover:text-brand-700 antialiased"
        >
          View all photos
        </OutboundLink>
      </div>
      <div className="flex mx-auto">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 grid-flow-row gap-2 auto-cols-min gallery-preview-list">
          {data.map((edge: Queries.InstaNodeEdge) => {
            return <Card data={edge} key={edge.node.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
