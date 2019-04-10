import React, { Component } from 'react'
import { createGlobalStyle } from "styled-components";

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
`
;

const Layout = ({ children }) => (
      <>
        <GlobalStyle />
        {children}
      </>
    );

export default Layout;
