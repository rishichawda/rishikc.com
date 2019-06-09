import React from 'react'

import quotes from 'content/reads/quotes'
import Layout from 'components/layouts'
import Header from 'elements/Header'

import { colors } from '../../../tailwind'
import './index.scss'

const pageMeta = {
  title: 'Reads | Rishi Kumar Chawda - Web and Mobile Applications Developer',
}

export default function Reads() {
  return (
    <Layout withFooter bg={colors.bg} pageTitle={pageMeta.title}>
      <Header title="Quotes">
        Some of my favourite quotes from various sources like books, articles and tweets too!
      </Header>
      <div className="quotes-main">
        <div className="quotes-main container">
          <ul>
            {quotes.map((quote, index) => (
              <li key={`${quote.info}${index + 1}`} className="quote">
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
