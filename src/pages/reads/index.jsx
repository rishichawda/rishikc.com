import React from 'react'
import Helmet from 'react-helmet'
import './index.scss';
import { IoIosReturnRight } from 'react-icons/io'
import { Link } from 'gatsby';
import quotes from '../../content/reads/quotes'
import { fadeInOnView } from '../../utils';
import Layout from '../../components/layout';

export default class Reads extends React.Component {

  componentDidMount() {
    fadeInOnView.init('fade-in-element');
  }

  componentWillUnMount() {
    fadeInOnView.unload();
  }

  render() {
    return (
      <Layout>
        <Helmet>
          <html lang="en"></html>
          <title>{'Blogs | Rishi Kumar Chawda - Developer, Freelancer | Web and Native Mobile Apps development | Freelance development services | Design and development | Bangalore, India'}</title>
          <meta name="description" content="Bangalore, India based developer. Experienced with web development, progressive web apps, native apps for Android and iOS. Loves working on freelancing web and mobile app development. Interested in open source projects." />
          <meta name="keywords" content="web development, web developer bangalore, web development services, native app development, websites, progressive web apps, app developer, developer in bangalore, bengaluru area india, freelancing projects, freelance development, freelancing services, mobile apps development, android development, ios app development" />
        </Helmet>
        <div className="quotes-main container">
          <div className="quotes-main-header">
            <h2>Some of the snippets / quotes that I found interesting..</h2>
          </div>
          <ul>
            {quotes.map((quote, index) => (
              <li key={`${quote.info}${index}`} className="quote hidden">
                {`“${quote.quote}”`}
                <p>{quote.info || ''}</p>
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    )
  }
}