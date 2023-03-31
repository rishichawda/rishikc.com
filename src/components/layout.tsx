import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

type LayoutProps = {
  children: React.ReactNode;
}

export default Layout
