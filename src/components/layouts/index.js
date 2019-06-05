import React, { Component } from 'react'
import { createGlobalStyle } from 'styled-components'
import Helmet from 'react-helmet'
import Navbar from '../navbar'

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  background-color: ${props => props.bg || '#fff'}
  * {
    box-sizing: border-box;
    &::-webkit-scrollbar { width: 0 !important };
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
  }
}
`
const Layout = ({ children, pageTitle, pageDesription, keywords, bg, color }) => (
  <>
    <GlobalStyle bg={bg} />
    <Helmet>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="theme-color" content="#766dff" />
    </Helmet>
    <Navbar bg={bg} color={color} />
    {children}
  </>
)

export default Layout
