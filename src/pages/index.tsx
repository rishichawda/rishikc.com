import '../stylesheets/homepage.scss';

import { PageProps } from 'gatsby';
import * as React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

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
