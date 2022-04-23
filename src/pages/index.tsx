import * as React from "react"
import HeroAnimation from "components/hero"
import Layout from "components/layout"
import SEO from "components/seo"
import GatsbyLink from 'gatsby-link'
import './index.css'
import HandsomeGuySVG from "assets/handsome-guy.svg"
import LinkModal from "components/links"

const IndexPage = () => (
  <>
    <Layout>
      <SEO title="Home" />
      <HeroAnimation />
      <div className="flex flex-col w-full py-44">
        <div className="flex flex-row max-w-7xl mx-auto mb-28 justify-between">
          <div className="flex flex-col w-8/12 justify-around">
            <h1 className="text-right italic antialiased">Hi, I'm Rishi.</h1>
            {/* <p className="text-right italic font-light antialiased">..and that above is my desk setup when I designed this page</p> */}
            <p className="leading-loose font-normal antialiased">Currently, I am a software engineer by profession and building
              awesome tools with the Chef team at Progress.

              Apart from my work, I spend time reading books, painting or
              just doodling, designing solutions to random ideas, learning
              new things and occasionally indulging in photography.

              Curious about science and mathematics, I spend an awful
              lot of time gathering knowledge that I don’t generally any
              use in day to day life. It’s good for geeking out though. :) </p>
            <a className="text-brand text-xl italic antialiased">Read more about me</a>
          </div>
          <div className="flex w-3/12 my-7">
            <HandsomeGuySVG className="w-full h-auto" />
          </div>
        </div>
        <div className="flex flex-col max-w-7xl mx-auto w-2/3 mb-28 justify-between">
          <h2 className="italic antialiased">Some of my writings</h2>
          <div>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="flex flex-row items-center justify-center border-4 border-dashed bg-slate-400 border-gray-500 bg-opacity-20 border-opacity-40 opacity-40 rounded-lg h-96">
                  <p>Coming soon..</p>
                </div>
              </div>
            </div>
          </div>
          <GatsbyLink to="articles" className="text-brand text-xl italic antialiased">Browse the complete list</GatsbyLink>
        </div>
        <div className="flex flex-col max-w-7xl mx-auto w-2/3 mb-28 justify-between">
          <h2 className="italic antialiased">Open source</h2>
          <div>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="flex flex-row items-center justify-center border-4 border-dashed bg-slate-400 border-gray-500 bg-opacity-20 border-opacity-40 opacity-40 rounded-lg h-96">
                  <p>Coming soon..</p>
                </div>
              </div>
            </div>
          </div>
          <a className="text-brand text-xl italic antialiased">See more projects on GitHub</a>
        </div>
        <div className="flex flex-col max-w-7xl mx-auto w-2/3 mb-28 justify-between">
          <div className="flex flex-row justify-between">
            <h2 className="italic antialiased">Gallery</h2>
            <a className="text-brand text-xl italic antialiased">View all photos</a>
          </div>
          <div>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="flex flex-row items-center justify-center border-4 border-dashed bg-slate-400 border-gray-500 bg-opacity-20 border-opacity-40 opacity-40 rounded-lg h-96">
                  <p>Coming soon..</p>
                </div>
              </div>
            </div>
          </div>
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