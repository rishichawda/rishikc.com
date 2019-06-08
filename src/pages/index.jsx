import React from 'react'
import { Parallax } from 'react-spring/renderprops-addons'
import HomePageLayout from 'components/layouts/homepage.layout'
import Hero from 'components/hero-section'
import About from 'components/about'
import Layout from 'components/layouts'
import './index.scss'
import { colors } from '../../tailwind'

const pageMeta = {
  keywords:
    'web,developer,react,development,app development,websites,design,progressive,web apps,bangalore,bengaluru area india,mobile,application,android,app developer,ios,mobile apps development',
}

const App = () => (
  <>
    <Layout disableNavbarHide bg={colors.bg} keywords={pageMeta.keywords} />
    <Parallax id="homepage-parallax" pages={2}>
      <HomePageLayout offset={0} speed={1} factor={0.75}>
        <Hero />
      </HomePageLayout>
      <HomePageLayout offset={1} speed={1} factor={0.5}>
        <About />
      </HomePageLayout>
    </Parallax>
  </>
)

export default App
