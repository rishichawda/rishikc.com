import React from "react";
import PropTypes from "prop-types";
import "./header.css";

const Fade = require("react-reveal/Fade");

interface HeaderProps extends React.Props<React.ReactNode> {
  title: string;
}

const Header = (props: HeaderProps) => {
  const { title, children } = props;
  return (
    <div className="container flex items-center justify-center w-screen min-w-full article-list-header-container">
      <Fade bottom={true} cascade={true}>
        <div>
          {title && <h1 className="text-center">{title}</h1>}
          {children && <h2 className="text-center text-xl mt-8">{children}</h2>}
        </div>
      </Fade>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string
};

Header.defaultProps = {
  title: ""
};

export default Header;
