import './index.scss';

import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import React from 'react';

import ThemeToggleButton from './button';

type ThemeToggleProps = {
  theme: string;
  toggleTheme: (theme: string) => void;
}

const ThemeToggle = () => {
  const renderButton = ({ theme, toggleTheme }: ThemeToggleProps) => {
    if (theme == null) {
      return null
    }
    return <ThemeToggleButton onChange={toggleTheme} theme={theme} />
  }

  return <ThemeToggler>{renderButton}</ThemeToggler>
}

export default ThemeToggle
