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
          <div id="about" className="h-card">
            <div>
              <h1>
                Hi, I'm <span className="p-nickname">Rishi</span>.
              </h1>
              <p className="p-note">
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
            <div className="u-photo">
              <StaticImage
                src="../../static/assets/handsome-guy.webp"
                alt="handsome"
              />
            </div>
          </div>
          <div className="services">
            <h2>I design and build</h2>
            <div className="services-info">
              <div className="services-info-images">
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
              <div className="services-info-text">
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
