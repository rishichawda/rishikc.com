import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { onClickProfileUrl } from "utils/onclick"
import React from 'react'

const Gallery = () => {
  // Keep potato quality image and redirect to instagram for full quality.
  // Makes sure nobody wants to download images from my website.
  // Also improves page load time.
  const data = useStaticQuery(graphql`
query GalleryQuery {
  allInstaNode(
    limit: 12
    filter: {mediaType: {eq: "GraphImage"}, fields: {visibility: {eq: true}}}
    sort: {order: DESC, fields: timestamp}
  ) {
    edges {
      node {
        id
        caption
        localFile {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, quality: 2)
          }
        }
      }
    }
  }
}
`)

  return (
    <div className="flex flex-col max-w-screen-2xl mx-auto px-4 w-full mb-28 justify-between">
      <div className="flex flex-row justify-between pb-6">
        <h2 className="italic antialiased">Gallery</h2>
        <a href="https://www.instagram.com/rishiikc/" target="_blank" className="text-brand dark:text-gray-400 text-xl italic antialiased">View all photos</a>
      </div>
      <div className="overflow-hidden flex mx-auto w-full px-6 py-6 border-4 border-dashed bg-slate-400 border-gray-500 bg-opacity-20 border-opacity-40 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 grid-flow-row gap-2 auto-cols-min">
          {data.allInstaNode.edges.map((item, i) => {
            const image = getImage(item.node.localFile)
            return (
              <div onClick={() => onClickProfileUrl("https://www.instagram.com/rishiikc/")} className="inline-flex w-full items-stretch cursor-pointer aspect-square" key={item.node.id}>
                <GatsbyImage className='w-full' alt={item.node.id} image={image} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Gallery