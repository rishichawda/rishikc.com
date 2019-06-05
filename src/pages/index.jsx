import React from 'react'
import { graphql } from 'gatsby'
import { Parallax } from 'react-spring/renderprops-addons'
import Hero from '../components/hero-section'
import About from '../components/about'
// import Projects from '../components/projects'
import Blogs from '../components/blogs'
import { fadeInOnView } from '../utils'
import Layout from '../components/layouts'
import Timeline from '../components/timeline'
import './index.scss'
import HomePageLayout from '../components/layouts/homepage.layout'
import { colors } from '../../tailwind'

const pageMeta = {
  title:
    'Rishi Kumar Chawda - Developer, Freelancer | Web and Native Mobile Apps development | Design and development | Bangalore, India',
  desc:
    'Bangalore, India based developer. Experienced with web development, progressive web apps, native apps for Android and iOS. Loves working on freelancing web and mobile app development. Interested in open source projects.',
  keywords:
    'web,developer,react,development,app development,websites,design,progressive,web apps,bangalore,bengaluru area india,mobile,application,android,app developer,ios,mobile apps development',
}

class App extends React.Component {
  componentDidMount() {
    fadeInOnView.init('fade-in-up-element')
  }

  componentWillUnmount() {
    fadeInOnView.unload()
  }

  render() {
    const {
      data: {
        heroImage,
        allMarkdownRemark: { edges },
      },
    } = this.props
    return (
      <>
        <Layout bg={colors.bg} pageTitle={pageMeta.title} pageDesription={pageMeta.desc} keywords={pageMeta.keywords} />
        <Parallax id="homepage-parallax" pages={4}>
          <HomePageLayout offset={0} speed={0.7} factor={0.75}>
            <Hero heroImage={heroImage.childImageSharp} />
          </HomePageLayout>
          <HomePageLayout offset={1} speed={0.7} factor={0.75}>
            <About />
          </HomePageLayout>
          <HomePageLayout offset={2} speed={0.7} factor={0.75}>
            <Timeline />
          </HomePageLayout>
          <HomePageLayout offset={3} speed={0.7} factor={0.75}>
            <Blogs posts={edges} />
          </HomePageLayout>
        </Parallax>
      </>
    )
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
`

export default App
