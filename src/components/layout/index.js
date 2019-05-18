import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";
import Helmet from "react-helmet";

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  * {
    box-sizing: border-box;
  }
}
`;
const Layout = ({ children, pageTitle, pageDesription, keywords }) => (
  <>
    <GlobalStyle />
    <Helmet>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="theme-color" content="#766dff" />
    </Helmet>
    {children}
  </>
);

export default Layout;
