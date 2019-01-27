import React from 'react'
import Helmet from 'react-helmet'
import Hero from '../components/hero-section'
import About from '../components/about'
import Projects from '../components/projects'
import Blogs from '../components/blogs'

import './index.scss';

class App extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <html lang="en"></html>
          <title>{'Rishi Kumar Chawda - Developer, Freelancer | Web and Native Mobile Apps development'}</title>
          <meta name="description" content="Bangalore, (also, Bengaluru) India based developer. Experienced with web apps, progressive web apps, native apps for Android and iOS. Loves working on freelancing and open source projects." />
          <meta name="keywords" content="web, progressive, apps, pwa, native, mobile, android, ios, freelance, freelancing, developer, design, development, freelancer, open, source, projects, blog, bangalore, bengaluru, india" />
        </Helmet>
        <Hero heroImage={this.props.data.heroImage.childImageSharp}/>
        <About />
        <Blogs />
        <Projects />
      </>
    );
  }
}

export const pageQuery = graphql`
   query {
      heroImage: file(relativePath: {eq: "1456505540091_2.png"}) {
        childImageSharp {
        fluid(maxWidth: 1240 ) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default App
