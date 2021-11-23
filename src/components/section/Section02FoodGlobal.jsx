import React from 'react';
import GlobalWrapper from '../charts/FoodGlobalWrapper';
import CardSection from '../ui/CardSection';

const Section02FoodGlobal = () => {
  return (
    <div className="section">
      <div className="section-card no-hover">
        <h1>
          <span className="red">Food security</span>
          <br /> in the Northern Triangle Region
        </h1>
      </div>
      <GlobalWrapper />
    </div>
  );
};

export default Section02FoodGlobal;
