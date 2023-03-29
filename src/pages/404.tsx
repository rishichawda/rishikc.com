import * as React from "react"
import { PageProps } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"

const NotFoundPage: React.FC<PageProps> = () => (
  <Layout>
    <div className="root-container">
      <main className="main-container">
      <section>
        <h1>404: Not Found</h1>
      </section>
      </main>
    </div>
  </Layout>
)

export const Head = () => <SEO title="Oops! Page Not found!" />

export default NotFoundPage
