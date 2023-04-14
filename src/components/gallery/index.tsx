import React from "react";

import Card from "./card";

const Gallery = () => {
  return (
    <div className="flex flex-col w-full mx-auto px-4 mb-28 justify-between gallery-preview-container">
      <div
        id="gallery-preview"
        aria-label="gallery-preview"
        className="flex flex-row justify-between pb-6"
      >
        <h2 className="antialiased">Gallery</h2>
        <a
          href="https://www.instagram.com/rishiikc/"
          target="_blank"
          className="text-brand-600 hover:text-brand-800 antialiased"
        >
          View all photos
        </a>
      </div>
      <div className="flex mx-auto">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 grid-flow-row gap-2 auto-cols-min gallery-preview-list">
          {Array(12)
            .fill(0)
            .map(() => {
              return <Card />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
