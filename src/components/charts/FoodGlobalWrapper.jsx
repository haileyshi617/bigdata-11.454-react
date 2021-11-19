import React, { useRef, useState, useEffect } from 'react';
import FoodGlobalChart from './FoodGlobalChart';

const FoodGlobalChartWrapper = ({}) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new FoodGlobalChart(chartArea.current));
    }
    // skip the loading state, when data is still a pending promise
    else if (chart.menData) {
      chart.update();
    }
  }, [chart]);

  return (
    <>
      <div className="tooltip hidden"></div>
      <div className="chart-area" ref={chartArea}></div>
    </>
  );
};

export default FoodGlobalChartWrapper;
