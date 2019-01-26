import React from 'react'
import { Link } from 'gatsby'
import BlogTemplate from '../../templates/blog'
import './index.scss'
import bannerImage from '../../images/rn_logo_medium.png'

export default () => (
    <BlogTemplate
      meta_title="Android Emulator for React Native in Mac, Linux and Windows - The right way to get it working."
      meta_desc="Let’s quickly set up Android Studio’s emulator in a better way this time — without actually installing Android Studio!"
      meta_keywords="react, native, android, emulator, android, studio, right, setup, less, space, mac, linux, windows, install, commandline, cli"
      bannerImage={bannerImage}
    >
      <article className="blog-content container">
        <div className="blog-title">
        <h4>{'Install Android Emulator for Mac, Linux and Windows without installing Android Studio'}</h4>
        </div>
        <div className="blog-body">

        </div>
      </article>
    </BlogTemplate>
);

