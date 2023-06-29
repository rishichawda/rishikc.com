import "../stylesheets/404.scss";

import { Link, PageProps } from "gatsby";
import * as React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { StaticImage } from "gatsby-plugin-image";

const NotFoundPage: React.FC<PageProps> = () => (
  <Layout>
    <div className="not-found-container dark:bg-slate-900 flex flex-col md:flex-row-reverse items-center justify-center">
      <StaticImage
        className="w-full md:w-3/4 h-auto"
        imgStyle={{ objectFit: "contain" }}
        src="../../static/assets/404.png"
        alt="404image"
      />
      <main className="dark:text-gray-200 grid place-items-center px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 tracking-tight">Whooops!</h1>
          <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
            Looks like we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 flex-col sm:flex-row">
            <Link
              to="/"
              className="mb-7 sm:mb-0 relative block rounded-full dark:bg-brand-950 bg-brand-700 hover:bg-brand-900 dark:hover:bg-brand-900 text-gray-200 px-4 py-2.5"
            >
              Go back home
            </Link>
            <Link
              to="/contact"
              className="text-sm font-semibold text-gray-500 dark:text-gray-300"
            >
              Contact me <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  </Layout>
);

export const Head = () => <SEO title="404: Not Found" />;

export default NotFoundPage;
