import React, { Component } from 'react'
import { createGlobalStyle } from 'styled-components'
import Helmet from 'react-helmet'
import Navbar from '../navbar'

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  * {
    box-sizing: border-box;
  }
}
`
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
    <Navbar />
    {children}
  </>
)

export default Layout
