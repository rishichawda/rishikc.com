import React from "react";
import Hero from "../components/hero-section";
import About from "../components/about";
import Projects from "../components/projects";
import Blogs from "../components/blogs";
import { graphql } from "gatsby";
import "./index.scss";
import Navbar from "../components/navbar";
import { fadeInOnView } from "../utils";
import Layout from "../components/layout";
import Timeline from '../components/timeline';

const pageMeta = {
  title:
    "Rishi Kumar Chawda - Developer, Freelancer | Web and Native Mobile Apps development | Freelance development services | Design and development | Bangalore, India",
  desc:
    "Bangalore, India based developer. Experienced with web development, progressive web apps, native apps for Android and iOS. Loves working on freelancing web and mobile app development. Interested in open source projects.",
  keywords:
    "web development, web developer bangalore, web development services, native app development, websites, progressive web apps, app developer, developer in bangalore, bengaluru area india, freelancing projects, freelance development, freelancing services, mobile apps development, android development, ios app development"
};

class App extends React.Component {
  componentDidMount() {
    fadeInOnView.init("fade-in-up-element");
  }

  componentWillUnMount() {
    fadeInOnView.unload();
  }

  render() {
    const { edges } = this.props.data.allMarkdownRemark;
    return (
      <Layout
        pageTitle={pageMeta.title}
        pageDesription={pageMeta.desc}
        keywords={pageMeta.keywords}
      >
        <Navbar />
        <Hero heroImage={this.props.data.heroImage.childImageSharp} />
        <About />
        <Timeline />
        <Blogs posts={edges} />
        <Projects />
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query {
    heroImage: file(relativePath: { eq: "1456505540091_2.png" }) {
      childImageSharp {
        fluid(maxWidth: 1240) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 430)
          frontmatter {
            path
            title
            subtitle
            description
            brief
          }
        }
      }
    }
  }
`;

export default App;
