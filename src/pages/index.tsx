import "../stylesheets/homepage.scss";

import { Link, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";

import { Player } from "@lottiefiles/react-lottie-player";

import ArticlePreview from "../components/articles/preview";
import Gallery from "../components/gallery";
import Layout from "../components/layout";
import Github from "../components/repository";
import SEO from "../components/seo";
import etcLottie from "../lottie-assets/i-do-everything.json";
import mobileLottie from "../lottie-assets/i-do-mobile-stuff-too.json";
import webLottie from "../lottie-assets/i-do-web-stuff.json";

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
                Currently, I am a software engineer by profession. I started out
                building websites as a freelancer, then built fullstack web and
                mobile applications as a professional. Now, I'm building awesome
                DevSecOps tools with the Chef team at Progress.
                <br />
                <br />
                Apart from my work, I spend time reading{" "}
                <Link to="/reads">books</Link>, painting or just doodling,
                designing solutions to random ideas, learning new things and
                occasionally indulging in{" "}
                <a href="#gallery-preview">photography</a>.<br />
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
          <div className="flex flex-col mb-28 about mx-5">
            <h2 className="text-center w-3/4 mx-auto">I design and build</h2>
            <div className="flex flex-col mx-auto sm:max-w-xs md:m-0 md:max-w-screen-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-evenly mt-8">
                <Player autoplay loop speed={2} src={webLottie}></Player>
                <p className="md:hidden text-center mb-8">
                  user experiences inside your browser through websites
                </p>
                <Player autoplay loop src={mobileLottie}></Player>
                <p className="md:hidden text-center mb-8">
                  native boxes, buttons and experiences on your mobile
                  applications
                </p>
                <Player autoplay loop speed={0.5} src={etcLottie}></Player>
                <p className="md:hidden text-center">
                  software, tools and more..
                </p>
              </div>
              <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
                <p className="text-center">
                  user experiences inside your browser through websites
                </p>
                <p className="text-center">
                  native boxes, buttons and experiences on your mobile
                  applications
                </p>
                <p className="text-center">system software, tools and more..</p>
              </div>
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
