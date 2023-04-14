import "./index.scss";

import { motion } from "framer-motion";
import React from "react";

import { trackExternalUrlClick } from "../../utils/open-link";

const Card = () => {
  const openInstagramProfile = () => {
    trackExternalUrlClick("https://www.instagram.com/rishiikc/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onClick={openInstagramProfile}
      className="inline-flex w-full items-stretch cursor-pointer aspect-square instagram-gallery-image-wrapper"
    >
      {/* <GatsbyImage className='w-full' alt={item.node.id} image={image} /> */}
      <img
        className="w-full"
        src={`https://picsum.photos/200/300`}
        alt="random image"
      />
    </motion.div>
  );
};

export default Card;
