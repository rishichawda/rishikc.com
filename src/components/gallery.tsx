import React from 'react'

const Gallery = () => {
  return (
    <div className="flex flex-col max-w-screen-2xl mx-auto px-4 w-full mb-28 justify-between">
      <div className="flex flex-row justify-between">
        <h2 className="italic antialiased">Gallery</h2>
        <a href="https://www.instagram.com/rishiikc/" target="_blank" className="text-brand dark:text-gray-400 text-xl italic antialiased">View all photos</a>
      </div>
      <div className="flex">
        <div className="w-full py-6">
          <div className="flex flex-row items-center justify-center border-4 border-dashed bg-slate-400 border-gray-500 bg-opacity-20 border-opacity-40 opacity-40 rounded-lg h-96">
            <p>Coming soon..</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery
