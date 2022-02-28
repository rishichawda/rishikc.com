import * as React from "react"
import HeroAnimation from "components/hero"
import Layout from "components/layout"
import SEO from "components/seo"

const IndexPage = () => (
  <>
    <Layout>
      <SEO title="Home" />
      <HeroAnimation />
    </Layout>
  </>
)

export default IndexPage