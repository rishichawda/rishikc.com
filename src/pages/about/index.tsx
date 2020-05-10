import React from 'react'
import About from 'components/about'
import Links from 'components/links'
import Layout from 'components/layouts'

const pageMeta = {
  keywords:
    'web,developer,react,development,app development,websites,design,progressive,web apps,bangalore,bengaluru area india,mobile,application,android,app developer,ios,mobile apps development',
}

const App = () => (
  <Layout withFooter keywords={pageMeta.keywords}>
    <About />
    <Links />
  </Layout>
)

export default App
