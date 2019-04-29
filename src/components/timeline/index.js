import React from "react";
import "./index.scss";
import Story from "./story";

const timelinedata = [
  {
    title: 'Software Development Engineer',
    time: '2018 - 2019',
  },
  {
    title: 'Freelancer',
    time: '2016 - 2018',
  }
]

class Timeline extends React.Component {
  render() {
    return (
      <section class="timeline-section">
        <ul class="timeline">
          {
            timelinedata.map((item, index) => (
            <Story data={item} position={index % 2 === 0 ? 'l' : 'r'} />
          ))
        }
        </ul>
      </section>
    );
  }
}

export default Timeline;
