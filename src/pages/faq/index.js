import React from 'react'
import { Link } from 'gatsby'

import Layout from 'components/layouts'

const pageMeta = {
  title: 'Blogs | Rishi Kumar Chawda - Web and Mobile Applications Developer',
  desc: 'Blogs written by Rishi Kumar Chawda.',
}

const FAQ = () => (
  <Layout withFooter pageTitle={pageMeta.title} pageDesription={pageMeta.desc}>
    <div className="faq-main">
      <div role="main" className="faq-main container">
        <h1>FAQs</h1>
        <h2 className="q">What's your stack?</h2>
        <p className="a">For web, React and Node. For mobile applications, React Native.</p>
        <p className="a">
          For a list of all the tools I've worked with,{' '}
          <a target="_newtab" href="https://stackshare.io/rishichawda/my-stack/main">
            check out this link
          </a>
          .
        </p>
        <h2 className="q">Editor</h2>
        <ul className="a">
          <li>
            <a target="_newtab" rel="nofollow" href="https://code.visualstudio.com/">
              Visual Studio Code
            </a>
          </li>
          <p>
            <a
              target="_newtab"
              rel="nofollow"
              href="https://marketplace.visualstudio.com/items?itemName=sdras.night-owl"
            >
              Night Owl
            </a>{' '}
            theme by Sarah Drasner
          </p>
          <p>
            <a target="_newtab" rel="nofollow" href="https://sourcefoundry.org/hack/">
              Hack font
            </a>{' '}
            - It's open sourced!
          </p>
          <li>
            <a target="_newtab" rel="nofollow" href="https://www.vim.org/">
              Vim
            </a>
          </li>
          <p>
            I don't use it much but here's{' '}
            <a target="_newtab" href="https://github.com/rishichawda/vimrc">
              my current configuration
            </a>
            .
          </p>
        </ul>
        <h2 className="q">Command line</h2>
        <p className="a">
          <a target="_newtab" href="https://github.com/robbyrussell/oh-my-zsh">
            Oh My Zsh
          </a>{' '}
          with the following plugins :
        </p>
        <ul className="a">
          <li>
            <a target="_newtab" href="https://github.com/denysdovhan/spaceship-prompt">
              Spaceship theme
            </a>{' '}
            for Zsh
          </li>
          <li>git</li>
          <li>zsh-autosuggestions</li>
          <li>node</li>
          <li>bundler</li>
          <li>osx</li>
          <li>python</li>
          <li>zsh-syntax-highlighting</li>
        </ul>
        <h2 className="q">Browser Extensions ( Chrome )</h2>
        <ul className="a">
          <li>
            <a
              target="_newtab"
              rel="nofollow"
              href="https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd"
            >
              aXe
            </a>
          </li>
          <li>
            <a
              target="_newtab"
              rel="nofollow"
              href="https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk"
            >
              Lighthouse
            </a>
          </li>
          <li>
            <a
              target="_newtab"
              rel="nofollow"
              href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi"
            >
              React Developer tools
            </a>
          </li>
        </ul>
        <p className="a">Yup, that's it. Not a fan of installing stuff!</p>
        <h2 className="q">OS</h2>
        <ul className="a">
          <li>MacOS</li>
          <li>Linux</li>
          <p>
            <em>I hate Windows.</em>
          </p>
        </ul>
        <p className="bottom-text">
          Have more questions? You can contact me through my{' '}
          <Link target="_newtab" rel="nofollow" to="/">
            social media profiles
          </Link>
          !
        </p>
      </div>
    </div>
  </Layout>
)

export default FAQ
