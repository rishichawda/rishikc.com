import * as React from "react"
import { Link, PageProps } from "gatsby"
import SEO from "../components/seo"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <div>
      <Link to="/articles">Articles</Link>
      <div>
        Main page
      </div>
    </div>
  )
}

export const Head = () => <SEO />

export default IndexPage
