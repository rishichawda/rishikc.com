import React, { Component } from 'react';
import './index.scss';

class About extends Component {
  render() {
    return (
      <section className="container about-section" id="about">
        <h2>About</h2>
        <p>
            Looks like you're really interested!
            So I'll let you in a little secret..
        </p>
        <p>
            And tell you my "secret mantra"!
        </p>
        <q>Eat. Sleep. Code. Repeat.</q>
        <p>
            Haha! Expected something else? Well, that's
            where most of my time goes. Infront of my laptop.
            If not coding, then either reading documentations,
            articles or blogs.
            If not that, then I'm just spidering the web,
            exploring repositories / codebases, looking at what
            other programmers and developers are up to.
          <span>
            PS: If you have any
            suggestions, you can ping the details on
            any of my social media handles! Would love
            to have more content for reading!
          </span>
        </p>
        <p>
            I also like books, traveling
        <span>
            ( yes, infact programmers need it the most - you can't
            keep being frustrated 24x7 with your own code! )
          </span>,
            good food and music, and art.
        </p>

        <p>One of the best advices I've ever heard,
        <p className="by-jobs">
        “If today were the last day of my life, would I want to do what I am about to do today?’ And whenever the answer has been ‘no’ for too many days in a row, I know I need to change something.”
        </p><span> - Steve Jobs</span>
        </p>
      </section>
    );
  }
}

export default About;
