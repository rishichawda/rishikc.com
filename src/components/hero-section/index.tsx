import { Link } from "gatsby";
import React from "react";
import Typist from "react-typist";

const niceImage = require("assets/1456505540091.png");
const nicelyCompressedImage = require("assets/1456505540091.webp");
const Bounce = require("react-reveal/Bounce");
const Fade = require("react-reveal/Fade");

interface WindowObject extends Window {
  gtag: Gtag.Gtag;
}

const onClickProfileUrl = (url: string) => {
  const windowObject: WindowObject = window;
  if (typeof windowObject !== "undefined" && url) {
    if (windowObject.gtag) {
      windowObject.gtag("event", url, { url });
    }
    windowObject.open(url, "_newtab");
  }
};

const Hero = () => {
  const [isAnimationDone, setAnimationDone] = React.useState(false);
  const [shouldShowLink, setLinkVisibilityState] = React.useState(false);

  const initiateTyping = () => {
    setTimeout(() => {
      setAnimationDone(true);
    }, 1500);
  };

  const showMoreLink = () => {
    setLinkVisibilityState(true);
  };

  return (
    <section className="container flex flex-col mx-auto h-full items-center p-2">
      <Fade delay={200} bottom={true} onReveal={initiateTyping}>
        <div className="px-4 py-2 mt-32">
          <picture className="rounded-full w-56 h-56">
            <source srcSet={nicelyCompressedImage} type="image/webp" />
            <source srcSet={niceImage} type="image/png" />
            <img
              className="shadow-xl rounded-full w-56 h-56"
              alt="rishi_kumar_chawda"
              src={niceImage}
            />
          </picture>
        </div>
        <div className="flex flex-col items-center">
          {isAnimationDone ? (
            <Typist
              avgTypingDelay={79}
              stdTypingDelay={38}
              cursor={{ hideWhenDone: true }}
              className="text-gray-700 text-center text-2xl px-4 py-2 mt-5 mb-40 font-light font-sans"
              onTypingDone={showMoreLink}
            >
              <span>Full Stack Web Developer</span>
              <Typist.Backspace count={9} delay={500} />
              <span>and Mobile Applications Developer</span>
            </Typist>
          ) : null}
          <Link
            className="mt-20 text-xl text-gray-500 hover:text-gray-700 hover:opacity-75 font-light"
            to="/about"
          >
            <Bounce cascade={true} delay={500} when={shouldShowLink}>
              Know more
            </Bounce>
          </Link>
        </div>
      </Fade>
    </section>
  );
};

export default Hero;
