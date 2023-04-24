import "../stylesheets/404.scss";

import { PageProps } from "gatsby";
import * as React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage: React.FC<PageProps> = () => (
  <Layout>
    <div className="root-container">
      <main className="not-found-container dark:text-gray-200 grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl tracking-tight sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="rounded-md bg-brand-900 hover:bg-brand-800 text-gray-200 px-3.5 py-2.5"
            >
              Go back home
            </a>
            <a
              href="/contact"
              className="text-sm font-semibold text-gray-500 dark:text-gray-300"
            >
              Contact me <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  </Layout>
);

export const Head = () => <SEO title="404: Not Found" />;

export default NotFoundPage;
