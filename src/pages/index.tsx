import * as React from "react"
import type { PageProps } from "gatsby"
import { SEO } from "../components/seo"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      Main page
    </main>
  )
}

export const Head = () => <SEO />

export default IndexPage
