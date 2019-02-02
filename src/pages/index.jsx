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
          <title>{'Rishi Kumar Chawda - Developer, Freelancer | Web and Native Mobile Apps development | Freelance development services | Design and development | Bangalore, India'}</title>
          <meta name="description" content="Bangalore, India based developer. Experienced with web development, progressive web apps, native apps for Android and iOS. Loves working on freelancing web and mobile app development. Interested in open source projects." />
          <meta name="keywords" content="web development, web developer bangalore, web development services, native app development, websites, progressive web apps, app developer, developer in bangalore, bengaluru area india, freelancing projects, freelance development, freelancing services, mobile apps development, android development, ios app development" />
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
