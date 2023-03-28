import * as React from "react"
import { PageProps } from "gatsby"
import SEO from "../components/seo"

const NotFoundPage: React.FC<PageProps> = () => (
  <section>
    <h1>404: Not Found</h1>
  </section>
)

export const Head = () => <SEO title="Oops! Page Not found!" />

export default NotFoundPage
