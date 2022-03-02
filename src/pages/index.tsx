import * as React from "react"
import HeroAnimation from "components/hero"
import Layout from "components/layout"
import SEO from "components/seo"
import HandsomeGuySVG from "assets/handsome-guy.svg"

const IndexPage = () => (
  <>
    <Layout>
      <SEO title="Home" />
      <HeroAnimation />
      <div className="flex flex-col w-full bg-white dark:bg-gray-800 dark:text-gray-50 py-44">
        <div className="flex flex-row max-w-7xl mx-auto mb-28 justify-between">
          <div className="flex flex-col w-8/12 justify-around">
            <h1 className="text-right text-5xl italic antialiased">Hi, I'm Rishi.</h1>
            <h2 className="text-right text-2xl italic font-light antialiased">..and that above is my desk setup when I designed this page</h2>
            <p className="text-2xl leading-loose font-normal antialiased">Currently, I am a software engineer by profession and building
              awesome tools with the Chef team at Progress.

              Apart from my work, I spend time reading books, painting or
              just doodling, designing solutions to random ideas, learning
              new things and occasionally indulging in photography.

              Curious about science and mathematics, I spend an awful
              lot of time gathering knowledge that I don’t generally any
              use in day to day life. It’s good for geeking out though. :) </p>
            <a className="text-sky-400 text-xl italic antialiased">Read more about me</a>
          </div>
          <div className="flex w-3/12 my-7">
            <HandsomeGuySVG className="w-full h-auto" />
          </div>
        </div>
        <div className="flex flex-col max-w-7xl mx-auto w-2/3 mb-28 justify-between">
          <h1 className="text-3xl italic antialiased">Some of my writings</h1>
          <div className="flex flex-col w-full justify-around py-36"></div>
          <a className="text-sky-400 text-xl italic antialiased">Browse the complete list</a>
        </div>
        <div className="flex flex-col max-w-7xl mx-auto w-2/3 mb-28 justify-between">
          <h1 className="text-3xl italic antialiased">Open source</h1>
          <div className="flex flex-col w-full justify-around py-28"></div>
          <a className="text-sky-400 text-xl italic antialiased">See more projects on GitHub</a>
        </div>
        <div className="flex flex-col max-w-7xl mx-auto w-2/3 mb-28 justify-between">
          <div className="flex flex-row justify-between">
            <h1 className="text-3xl italic antialiased">Gallery</h1>
            <a className="text-sky-400 text-xl italic antialiased">View all photos</a>
          </div>
          <div className="flex flex-col w-full justify-around py-28"></div>
        </div>
        <div className="flex flex-col max-w-3xl mx-auto w-2/3 mb-28 justify-between">
          <p className="text-xl antialiased italic text-center mb-10 leading-loose">“The happiness of those who want to be popular depends on others;
            the happiness of those who seek pleasure fluctuates with moods outside their control;
            but the happiness of the wise grows out of their own free acts.”</p>
          <p className="text-xl antialiased text-center">Marcus Aurelius</p>
        </div>
      </div>
    </Layout>
  </>
)

export default IndexPage