import React from 'react'
import { Link } from 'gatsby'
import BlogTemplate from '../../templates/blog'
import './index.scss'
import bannerImage from '../../images/rn_logo_medium.png'

export default () => (
  <BlogTemplate
      meta_title="Compress your React Native Android App size with just a few lines!"
      meta_desc="First of all, you’ll need to eject your Native app if you’re using create-react-native-app for your project. This is important since you don’t have access to configurations until you eject, as the build folder is where we have to make changes."
      meta_keywords="react, native, android, application, app, build, create-react-app, compress, shrink, reduce, apk, size"
      bannerImage={bannerImage}
  >
    <article className="blog-content container">
        <div className="blog-title">
        <h4>{'Shrink your React Native application size dramatically!'}</h4>
        </div>
        <div className="blog-body">

        </div>
      </article>
  </BlogTemplate>
);

