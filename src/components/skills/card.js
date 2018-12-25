import React from 'react';

const SkillsCard = ({ image, className }) => (
  <div className={`card ${className || ''}`}>
    <div>
      <img src={image} alt="logo" />
    </div>
  </div>
);

export default SkillsCard;
