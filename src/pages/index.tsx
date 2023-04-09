import * as React from "react"
import { PageProps } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"
import '../stylesheets/homepage.scss'

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="root-container">
        <main className="main-container">
          Main page
        </main>
      </div>
    </Layout>
  )
}

export const Head = () => <SEO />

export default IndexPage
