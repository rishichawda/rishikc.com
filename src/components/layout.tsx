import React from "react";

import Navbar from "./navbar";
import Footer from "./footer";

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
