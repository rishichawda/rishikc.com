import "./index.scss";

import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

type Props = {
  data: Queries.InstagramNodeEdge;
};

const Card = ({ data }: Props) => {
  const image = getImage(data.node.localImage);

  return (
    <div className="inline-flex w-full items-stretch cursor-pointer aspect-square instagram-gallery-image-wrapper">
      <GatsbyImage className="w-full" alt={data.node.id} image={image!} />
    </div>
  );
};

export default Card;
