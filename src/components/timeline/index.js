import React from "react";
import "./index.scss";
import Story from "./story";

import { data } from "./data.json";

class Timeline extends React.Component {
  render() {
    return (
      <section className="timeline-section">
        <ul className="timeline">
          {data.map((item, index) => (
            <Story data={item} position={index % 2 === 0 ? "l" : "r"} />
          ))}
        </ul>
      </section>
    );
  }
}

export default Timeline;
