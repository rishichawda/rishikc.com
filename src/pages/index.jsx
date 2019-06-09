import React from 'react'
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
  <Layout withFooter disableNavbarHide bg={colors.bg} keywords={pageMeta.keywords}>
    <Hero />
    <About />
  </Layout>
)

export default App
