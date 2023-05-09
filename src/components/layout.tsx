import React from "react";

import Footer from "./footer";
import Navbar from "./navbar";

const Layout: React.FC<LayoutProps> = ({ children, showScrollProgress }) => {
  return (
    <div>
      <Navbar showScrollProgress={showScrollProgress} />
      {children}
      <Footer />
    </div>
  );
};

type LayoutProps = {
  children: React.ReactNode;
  showScrollProgress?: boolean;
};

Layout.defaultProps = {
  showScrollProgress: false,
};

export default Layout;
