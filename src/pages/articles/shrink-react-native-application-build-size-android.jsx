import React from 'react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import { GoLinkExternal } from 'react-icons/go'
import BlogTemplate from '../../templates/blog'
import './index.scss'
import bannerImage from '../../images/rn_logo_medium.png'
import screenshot1 from '../../images/rrnas-1.png'
import screenshot2 from '../../images/rrnas-2.png'

export default () => (
  <BlogTemplate
    meta_title="Compress your React Native Android App size with just a few lines!"
    meta_desc="To reduce your react native application size for android, first we'll need to eject it if you're using create-react-native-app for your project. After that we'll need to configure the build file to generate compressed android builds."
    meta_keywords="react native app, android application, app build, bundling android app, create-react-app, compress bundle size, shrink application size, reduce apk size, configuration setup, generate build apk"
    bannerImage={bannerImage}
  >
    <article className="blog-content container">
      <div className="original-article-link">
        <OutboundLink href="https://medium.com/@rishii.kumar.chawda/reduce-your-react-native-app-size-dramatically-5430d773c92f">
          <p>{'Read this article on Medium.'}</p>
          <GoLinkExternal />
        </OutboundLink>
      </div>
      <div className="blog-title">
        <h4>{'Shrink your React Native application size dramatically!'}</h4>
      </div>
      <div className="blog-body">
        <p>
          {'So you made a cool and awesome looking '}<a href="https://facebook.github.io/react-native/">{'React Native'}</a> {'app and now you’re ready to build it and maybe publish it to the store —'}
        </p>
        <p>
          {'But worried about it if the users would want to install it given its build size? Or maybe you just want to keep it light weight and not take too much memory unnecessarily when it can be packed into a smaller size?'}
        </p>
        <p>
          {'Or you’re just one of us who are paranoid about build sizes? Don’t worry, we got you covered! 😄 ✔️'}
        </p>
        <p>
          {'First of all, you’ll need to eject your Native app if you’re using'} <a href="https://github.com/react-community/create-react-native-app">{'create-react-native-app'}</a>{' for your project (You might have already done this if you’ve built your application before reading this article). This is important since you don’t have access to configurations until you eject, as the build folder is where we have to make changes. If you haven’t , you can simply do this by :'}
        </p>
        <code>npm run eject</code>
        <p>
          <strong>{'Note'}&nbsp;{': '}</strong>&nbsp;{'Ejecting a native application is a permanent action! ( Unless you’re using a version control system to keep track of previous versions of your app — from where you can recover the ‘unejected’ version of your app later if you need ). '}<a href="https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md">{'Learn more about ejecting here.'}</a>
        </p>
        <p>
          {'Okay so now we’re all set! Let’s get started and get that done fast. Don’t worry it just takes a few minutes and your app size will reduce dramatically!'}
        </p>
        <p>
          {'Now, navigate to the'} <span className="code">{'android / app'}</span> {'folder from your project root directory where you can find your'} <span className="code">{'build.gradle'}</span> {'file.'}
        </p>
        <div className="article-image">
          <img src={screenshot1} alt="blog-asset" />
        </div>
        <p>
          {'Here, you’ll find your default build configurations already setup, find the line which looks like this :'}
        </p>
        <code>
          {'def enableProguardInReleaseBuilds = false'}<br />{'def enableSeparateBuildPerCPUArchitecture = false'}
        </code>
        <p>{'and change their value to '}<span className="code">{'true'}</span>{' , like this :'}</p>
        <code>
          {'def enableProguardInReleaseBuilds = true'}<br />{'def enableSeparateBuildPerCPUArchitecture = true'}
        </code>
        <p>
          {'So you might be wondering what it does. Well, if you scroll down a bit you’ll see '}<span className="code">{'enableProguardInReleaseBuilds'}</span> {'and '}<span className="code">{'enableSeparateBuildPerCPUArchitecture'}</span>{' written at a few more places like here:'}
        </p>
        <div className="article-image">
          <img src={screenshot2} alt="blog-asset" />
        </div>
        <p>
          {'As you can see, these variables are being used to enable or disable two build configurations —'}
        </p>
        <ul>
          <li><p>{'One for generating separate .apks for different device architectures,'}</p></li>
        </ul>
        <code>
          {'. . .'}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;{'splits {'}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'abi {'}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'reset()'}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'enable enableSeparateBuildPerCPUArchitecture'}<br />
          {'. . .'}<br />
        </code>
        <p>
          <em>
            {'Don’t worry about having to handle different .apks for each architecture — Google takes care of distributing it to the users! And separating the builds according to architecture removes unnecessary code from your file which is not required on the device it is running.'}
          </em>
        </p>
        <ul>
          <li>
            <p>{'Another one for compressing the Java bytecode generated while building, as in,'}</p>
          </li>
        </ul>
        <code>
          {'...'}<br />
          {'buildTypes {'}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;{'release {'}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'minifyEnabled enableProguardInReleaseBuilds'}<br />
          {'...'}<br />
        </code>
        <p>
          {'Phew, that was pretty easy! But wait, we’re not done yet! There’s one little thing we need to do.'}
        </p>
        <p>{'Now let’s add this line right below the '}<span className="code">{'minifyEnabled '}</span>{'configuration:'}</p>
        <code>
          {'...'}<br />
          {'buildTypes {'}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;{'release {'}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'minifyEnabled enableProguardInReleaseBuilds'}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'shrinkResources true'}&nbsp;&nbsp;&nbsp;&nbsp;{'/* <-- Add this line */'}<br />
          {'...'}<br />
        </code>
        <p>
          {'And we’re done! Now build your app again and check the '}<span className="code">{'output'}</span>{' directory. You’ll find two different '}<span className="code">{'.apks'}</span>{' of your app which are specified in the configuration by default, i.e., for '}<span className="code">{'armebi'}</span>{' and '}<span className="code">{'x86'}</span>{' architectures.'}
        </p>
        <p>
          <em>{'Oh, and by the way,'}</em>{' if you need a universal '}<span className="code">{'.apk'}</span>{' that supports all device architectures — just set '}<span className="code">{'universalApk'}</span>{' to true and it’ll generate a universal '}<span className="code">{'.apk'}</span>{' next time you run build!'}
        </p>
        <p>
          {'That’s all! Now you’ve setup your build configuration to shrink your code along with resources and create separate '}<span className="code">{'.apk'}</span>{' for different architectures — thus removing unnecessary code from the final build.'}
        </p>
        <p>
          {'Thanks for reading! For more resources on how to reduce the application build size, '}<a href="https://developer.android.com/studio/build/shrink-code">{'follow this link.'}</a>
        </p>
        <p>{'Happy Hacking! Cheers!'}</p>
      </div>
    </article>
  </BlogTemplate>
);

