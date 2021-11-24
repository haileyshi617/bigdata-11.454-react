import React from 'react';
import FoodGlobalChart from '../charts/FoodGlobalChart';

const Section02FoodGlobal = () => {
  return (
    <div className="section">
      <div className="section-card">
        <h1>
          <span className="red">Food security</span> of the Northern Triangle
          Region in the global context.
        </h1>
      </div>
      <FoodGlobalChart />
    </div>
  );
};

export default Section02FoodGlobal;
