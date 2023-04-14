import { PageProps } from "gatsby";
import * as React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

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
);

export const Head = () => <SEO title="Oops! Page Not found!" />;

export default NotFoundPage;
