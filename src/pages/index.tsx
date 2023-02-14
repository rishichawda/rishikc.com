import * as React from "react"
import HeroAnimation from "components/hero"
import Layout from "components/layout"
import SEO from "components/seo"
import GatsbyLink from 'gatsby-link'
import './index.css'
import HandsomeGuySVG from "assets/handsome-guy.svg"
import { graphql } from "gatsby"
import RepoCard from "components/repoCard"

const IndexPage = ({ data }) => (
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
        <div className="flex flex-col max-w-screen-2xl mx-auto px-4 mb-28 justify-between">
          <h2 className="italic antialiased">Some of my writings</h2>
            <div className="mx-auto py-4">
              <div className="flex flex-col justify-between">
                {
                  data.allMdx.nodes.map(node => (
                    <article className="my-2" key={node.id}>
                      <div className="p-2 px-0 flex flex-col justify-between leading-normal">
                        <GatsbyLink to={`/${node.slug}`}>
                          <div className="mb-2">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                              <h2 className="text-brand dark:text-gray-300 font-semibold text-2xl mb-2 md:mb-0">{node.frontmatter.title}</h2>
                              <div className="flex items-center text-sm text-gray-400">
                                <p>{node.frontmatter.date}</p>
                              </div>
                            </div>
                            <p className="article-preview font-normal leading-7 tracking-wide text-gray-500 dark:text-gray-400">{node.excerpt}</p>
                          </div>
                        </GatsbyLink>
                      </div>
                    </article>
                  ))
                }
              </div>
            </div>
          <GatsbyLink to="articles" className="text-brand dark:text-gray-400 text-xl italic antialiased">Browse the complete list</GatsbyLink>
        </div>
        {/* popular repo preview section */}
        <div className="flex flex-col max-w-screen-2xl mx-auto px-4 mb-28 justify-between">
          <h2 className="italic antialiased">Open source</h2>
            <div className="mx-auto py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-4 auto-cols-min gap-y-5">
                {data.github.viewer.repositories.edges.map((repository, i) => (
                  <div className="flex items-stretch w-full" key={repository.node.name}>
                    <RepoCard repository={repository.node} />
                  </div>
                ))}
              </div>
            </div>
          <a href="https://github.com/rishichawda" target="_blank" className="text-brand dark:text-gray-400 text-xl italic antialiased">See more projects on GitHub</a>
        </div>
        {/* gallery preview section */}
        <div className="flex flex-col max-w-screen-2xl mx-auto px-4 w-full mb-28 justify-between">
          <div className="flex flex-row justify-between">
            <h2 className="italic antialiased">Gallery</h2>
            <a className="text-brand dark:text-gray-400 text-xl italic antialiased">View all photos</a>
          </div>
            <div className="flex">
              <div className="w-full py-6">
                <div className="flex flex-row items-center justify-center border-4 border-dashed bg-slate-400 border-gray-500 bg-opacity-20 border-opacity-40 opacity-40 rounded-lg h-96">
                  <p>Coming soon..</p>
                </div>
              </div>
            </div>
        </div>
        {/* random quote section */}
        <div className="flex flex-col max-w-3xl mx-auto px-4 m:px-0 m:w-2/3 mb-28 justify-between">
          <p className="text-xl antialiased italic text-center mb-10 leading-loose">“The happiness of those who want to be popular depends on others;
            the happiness of those who seek pleasure fluctuates with moods outside their control;
            but the happiness of the wise grows out of their own free acts.”</p>
          <p className="text-xl antialiased text-center">Marcus Aurelius</p>
        </div>
      </div>
    </Layout>
  </>
)

export const query = graphql`
query HomePageData {
    github {
    viewer {
      repositories(
        orderBy: {field: STARGAZERS, direction: DESC}
        first: 6
        ownerAffiliations: OWNER
      ) {
        edges {
          node {
            id
            name
            url
            descriptionHTML
            stargazerCount
            owner {
              login
            }
            languages(orderBy: {field: SIZE, direction: DESC}, first: 10) {
              edges {
                node {
                  color
                  name
                }
                size
              }
              totalSize
            }
          }
        }
      }
    }
  }
  allMdx: allMdx(limit: 2, sort: {fields: frontmatter___date, order: DESC}) {
    nodes {
      slug
      id
      excerpt(pruneLength: 340)
      frontmatter {
        subtitle
        date(formatString: "Do MMMM, YYYY")
        title
      }
    }
  }
}
`

export default IndexPage