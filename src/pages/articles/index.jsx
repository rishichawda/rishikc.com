import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import './index.scss';
import { IoIosReturnRight } from 'react-icons/io'

export default () => (
  <>
    <Helmet>
      <html lang="en"></html>
      <title>{'Blogs | Rishi Kumar Chawda - Developer, Freelancer | Web and Native Mobile Apps development | Freelance development services | Design and development | Bangalore, India'}</title>
      <meta name="description" content="Bangalore, India based developer. Experienced with web development, progressive web apps, native apps for Android and iOS. Loves working on freelancing web and mobile app development. Interested in open source projects." />
      <meta name="keywords" content="web development, web developer bangalore, web development services, native app development, websites, progressive web apps, app developer, developer in bangalore, bengaluru area india, freelancing projects, freelance development, freelancing services, mobile apps development, android development, ios app development" />
    </Helmet>
    <div className="blog-main container">
      <div className="blog-main-header">
        <h2>Blogs by Rishi Kumar Chawda</h2>
        <Link to="/">
          <IoIosReturnRight style={{ marginRight: 10 }} />
          <p>{'Back to Home'}</p>
        </Link>
      </div>
      <Link to="/articles/shrink-react-native-application-build-size-android">
        <article>
          <h4>{'Shrink your React Native application size dramatically!'}</h4>
          <p>{'So you made a cool and awesome looking React Native app and now you\’re ready to build it and maybe publish it to the store \—'}</p>
          <p>{'But worried about it if the users would want to install it given its build size? Or maybe you just want to keep it light weight and not take too much memory unnecessarily when it can be packed into a smaller size?'}</p>
        </article>
      </Link>
      <Link to="/articles/native-app-emulator-android-mac-linux-ios-install-command-line">
        <article>
          <h4>{'Install Android Emulator for Mac, Linux and Windows without installing Android Studio'}</h4>
          <p>{'How many of you have installed Android Studio only to use the emulator for your native app? Oh, and don’t forget the way your system struggles when you try to run it!'}
          </p>
          <p>{'A lot of you might have also come across alternatives like Genymotion , Nox , BlueStacks and a lot others. Some are free, while a lot others with...'}</p>
        </article>
      </Link>
    </div>
  </>
);