import React from "react";
import Navbar from "./navbar";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

type LayoutProps = {
  children: React.ReactNode;
}

export default Layout
