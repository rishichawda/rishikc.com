/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import Header from "components/header"
import PropTypes from "prop-types"
import getSiteMetadata from "query/getSiteMetadata"
import * as React from "react"
import { CommonProps } from "types/components"
import "./index.css"

const Layout = ({ children }: CommonProps) => {
  const siteMetadata = getSiteMetadata()

  return (
    <div className="bg-blue h-screen flex-col flex">
      <Header siteTitle={siteMetadata.title} />
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
