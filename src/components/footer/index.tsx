import "./index.scss";

import React from "react";

const Footer = () => {
  return (
    <footer className="dark:text-gray-200">
      © 2018-{new Date().getFullYear()} Rishi Kumar Chawda. All Rights Reserved.
    </footer>
  );
};

export default Footer;
