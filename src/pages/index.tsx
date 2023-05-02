import "../stylesheets/homepage.scss";

import { Link, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";

import ArticlePreview from "../components/articles/preview";
import Gallery from "../components/gallery";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Github from "../components/repository";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="root-container">
        <main className="main-container">
          <div
            id="about"
            className="flex lg:flex-row flex-col-reverse items-center max-w-screen-2xl mx-auto mb-28 justify-between about"
          >
            <div className="flex flex-col lg:w-2/3 justify-around">
              <h1 className="lg:text-right antialiased">Hi, I'm Rishi.</h1>
              <p className="antialiased text-lg">
                Currently, I am a software engineer by profession and building
                awesome tools with the Chef team at Progress.
                <br />
                <br />
                Apart from my work, I spend time reading{" "}
                <Link to="/reads">books</Link>, painting or just doodling,
                designing solutions to random ideas, learning new things and
                occasionally indulging in{" "}
                <a href="#gallery-preview">photography</a>.<br />
                <br />
                Curious about science and mathematics, I spend an awful lot of
                time gathering knowledge that I don’t generally use in day to
                day life. It’s good for geeking out though.{" "}
              </p>
            </div>
            <div className="flex lg:w-3/12">
              <StaticImage
                src="../../static/assets/handsome-guy.webp"
                alt="handsome"
                className="w-full max-w-xs h-auto"
              />
            </div>
          </div>
          <ArticlePreview />
          <Github />
          <Gallery />
        </main>
      </div>
    </Layout>
  );
};

export const Head = () => <SEO />;

export default IndexPage;
