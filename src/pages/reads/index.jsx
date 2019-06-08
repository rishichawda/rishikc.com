import React from 'react'
import './index.scss'
import quotes from 'content/reads/quotes'
import Layout from 'components/layouts'
import Header from 'elements/Header'
import { colors } from '../../../tailwind'

const pageMeta = {
  title:
    'Reads | Rishi Kumar Chawda - Developer, Freelancer | Web and Native Mobile Apps development | Freelance development services | Design and development | Bangalore, India',
  desc:
    'Bangalore, India based developer. Experienced with web development, progressive web apps, native apps for Android and iOS. Loves working on freelancing web and mobile app development. Interested in open source projects.',
}

export default class Reads extends React.Component {
  render() {
    return (
      <Layout bg={colors.bg} pageTitle={pageMeta.title} pageDesription={pageMeta.desc}>
        <Header title="Quotes">
          Some of my favourite quotes from various sources like books, articles and tweets too!
        </Header>
        <div className="quotes-main">
          <div className="quotes-main container">
            <ul>
              {quotes.map((quote, index) => (
                <li key={`${quote.info}${index}`} className="quote">
                  {`“${quote.quote}”`}
                  <p>{quote.info || ''}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}
