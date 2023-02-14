import * as React from "react"
import HeroAnimation from "components/hero"
import Layout from "components/layout"
import SEO from "components/seo"
import './index.css'
import HandsomeGuySVG from "assets/handsome-guy.svg"
import Gallery from "components/gallery"
import RandomQuote from "components/quote"
import Github from "components/github"
import ArticlePreview from "components/articlePreview"

const IndexPage = () => (
  <>
    <Layout>
      <SEO title="Home" />
      <HeroAnimation />
      <div className="flex flex-col w-full py-44">
        {/* intro section */}
        <div className="flex md:flex-row flex-col-reverse max-w-screen-2xl mx-auto px-4 mb-28 justify-between">
          <div className="flex flex-col lg:w-8/12 justify-around">
            <h1 className="text-4xl md:text-right italic antialiased">Hi, I'm Rishi.</h1>
            {/* <p className="text-right italic font-light antialiased">..and that above is my desk setup when I designed this page</p> */}
            <p className="font-normal leading-7 tracking-wide antialiased text-lg my-7">Currently, I am a software engineer by profession and building
              awesome tools with the Chef team at Progress.<br /><br />
              Apart from my work, I spend time reading books, painting or
              just doodling, designing solutions to random ideas, learning
              new things and occasionally indulging in photography.<br /><br />
              Curious about science and mathematics, I spend an awful
              lot of time gathering knowledge that I don’t generally any
              use in day to day life. It’s good for geeking out though. :) </p>
            {/* <a className="text-brand dark:text-gray-400 text-xl italic antialiased">Read more about me</a> */}
          </div>
          <div className="flex md:w-3/12 my-7">
            <HandsomeGuySVG className="w-full h-auto" />
          </div>
        </div>
        {/* blog preview section */}
        <ArticlePreview />
        {/* popular repo preview section */}
        <Github />
        {/* gallery preview section */}
        <Gallery />
        {/* random quote section */}
        <RandomQuote />
      </div>
    </Layout>
  </>
)

export default IndexPage