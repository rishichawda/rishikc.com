import React from 'react';
import './index.scss';
import SkillsCard from './card';
import reactLogo from '../../assets/skills/react.png';
import jsLogo from '../../assets/skills/javascript.png';
import pythonLogo from '../../assets/skills/python.png';

const Skills = () => (
  <section className="container skills-section" id="skills">
    <h2>Skills</h2>
    <div className="skill-set">
      <SkillsCard image={jsLogo} className="js-logo" />
      <SkillsCard image={pythonLogo} />
      <SkillsCard image={reactLogo} />
      <SkillsCard image={reactLogo} />
    </div>
  </section>
);

export default Skills;
