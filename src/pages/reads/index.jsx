import React, { Component } from 'react'
import Helmet from 'react-helmet'
import './index.scss';
import quotes from './quotes';

export default class Reads extends Component {

  render() {
    return (
      <>
        <Helmet>
          <html lang="en"></html>
          <title>{'Blogs | Rishi Kumar Chawda - Developer, Freelancer | Web and Native Mobile Apps development | Freelance development services | Design and development | Bangalore, India'}</title>
          <meta name="description" content="Bangalore, India based developer. Experienced with web development, progressive web apps, native apps for Android and iOS. Loves working on freelancing web and mobile app development. Interested in open source projects." />
          <meta name="keywords" content="web development, web developer bangalore, web development services, native app development, websites, progressive web apps, app developer, developer in bangalore, bengaluru area india, freelancing projects, freelance development, freelancing services, mobile apps development, android development, ios app development" />
        </Helmet>
        <div className="quotes-main container">
          <p>Some of the snippets / quotes that I found interesting..</p>
          <ul>
            {quotes.map(quote => (
              <li className="quote">
              {quote.quote}
              <p> - {quote.info}</p>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }
}
