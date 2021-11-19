import React, { useRef, useState, useEffect } from 'react';
import FoodAndMigrationChart from './FoodAndMigrationChart';

const FoodAndMigrationWrapper = ({}) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new FoodAndMigrationChart(chartArea.current));
    }
    // // skip the loading state, when data is still a pending promise
    // else if (chart.menData) {
    //   chart.update();
    // }
  }, [chart]);

  return (
    <div>
      <div className="food-chart-area" ref={chartArea}>
        {/* <div id="tooltip" className="hidden"></div> */}
      </div>
    </div>
  );
};

export default FoodAndMigrationWrapper;
