import React from "react";

import Navbar from "./navbar";
import Footer from "./footer";

const Layout: React.FC<LayoutProps> = ({ children, showScrollProgress }) => {
  return (
    <div>
      <Navbar showScrollProgress={showScrollProgress} />
      {children}
      <Footer />
      {/* Buy me a coffee */}
      <script
        defer
        data-name="BMC-Widget"
        data-cfasync="false"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="rishikc"
        data-description="Support me on Buy me a coffee!"
        data-message=""
        data-color="#BD5FFF"
        data-position="Right"
        data-x_margin="18"
        data-y_margin="18"
      ></script>
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
