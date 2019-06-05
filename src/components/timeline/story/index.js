import React from 'react'

const Story = ({ position, data: { title, desc, time } }) => (
  <li>
    <div className={`direction-${position}`}>
      <div className="story-wrapper">
        <span className="story-title">{title}</span>
        <span className="time">{time}</span>
        <div className="desc">{desc}</div>
      </div>
    </div>
  </li>
)

export default Story
