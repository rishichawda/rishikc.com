import '../stylesheets/homepage.scss';

import { PageProps } from 'gatsby';
import * as React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <main className="bg-gray-100 dark:bg-slate-700 dark:text-gray-200 main-container">
        Main page
      </main>
    </Layout>
  )
}

export const Head = () => <SEO />

export default IndexPage
