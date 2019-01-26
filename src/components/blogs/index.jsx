import React from 'react'
import { Link } from 'gatsby'
import { FaArrowRight } from 'react-icons/fa'
import './index.scss';

export default () => (
  <section className="container blog-section">
    <h2>blogs</h2>
    <div className="inner-container">
    <Link to="/articles/shrink-react-native-application-build-size-android">
        <article className="card">
          <div className="blog-title">
            <h4>{'Shrink your React Native android application bundle size dramatically!'}</h4>
          </div>
          <div className="blog-description">
          <p>
          {'So you made a cool and awesome looking React Native app and now you\’re ready to build it and maybe publish it to the store \— But worried about it if the users would want to install it given its build size? Or maybe you just want to keep it light weight'}
          </p>
          </div>
        </article>
      </Link>
      <Link to="/articles/native-app-emulator-android-mac-linux-ios-install-command-line">
        <article className="card">
          <div className="blog-title">
            <h4>{'Install Android Emulator for Mac, Linux and Windows without installing Android . . .'}</h4>
          </div>
          <div className="blog-description">
          <p>
          {'How many of you have installed Android Studio only to use the emulator for your native app? Oh, and don’t forget the way your system struggles when you try to run it!'}
          </p>
          </div>
        </article>
      </Link>
      <Link to="/articles">
        <article className="card" style={{ flexDirection: 'row' }}>
          <span style={{ fontSize: 20 }}>View All</span>
          <FaArrowRight style={{ marginLeft: 20, fontSize: 20 }} />
        </article>
      </Link>
    </div>
  </section>
)
