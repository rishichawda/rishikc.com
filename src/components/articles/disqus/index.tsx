import React from "react";
import { Disqus, DisqusConfig } from "gatsby-plugin-disqus";
import { useForceUpdate } from "framer-motion";

type Props = {
  config: DisqusConfig;
};

const CommentSection = (props: Props) => {
  const [update, _] = useForceUpdate();

  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      update();
    });

    const config = {
      attributes: true,
      attributeFilter: ["class"],
    };

    observer.observe(document.body, config);
    return () => {
      observer.disconnect();
    };
  }, []);

  return <Disqus className="root-container" config={props.config} />;
};

export default CommentSection;
