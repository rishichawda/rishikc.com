import "./index.scss";

import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

import { trackExternalUrlClick } from "../../utils/open-link";

type Props = {
  data: Queries.InstagramNodeEdge;
};

const Card = ({ data }: Props) => {
  const openInstagramProfile = () => {
    trackExternalUrlClick("https://www.instagram.com/rishiikc/");
  };

  const image = getImage(data.node.localFile);

  return (
    <div
      onClick={openInstagramProfile}
      className="inline-flex w-full items-stretch cursor-pointer aspect-square instagram-gallery-image-wrapper"
    >
      <GatsbyImage className="w-full" alt={data.node.id} image={image} />
    </div>
  );
};

export default Card;
