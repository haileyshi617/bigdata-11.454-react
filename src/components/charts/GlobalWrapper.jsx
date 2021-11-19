import React, { useRef, useState, useEffect } from 'react';
import GlobalChart from './GlobalChart';

const GlobalWrapper = ({ gender }) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new GlobalChart(chartArea.current));
    }
    // skip the loading state, when data is still a pending promise
    else if (chart.menData) {
      chart.update();
    }
  }, [chart]);

  return (
    <div>
      <div className="chart-area" ref={chartArea}>
        <div id="tooltip" className="hidden"></div>
      </div>
    </div>
  );
};

export default GlobalWrapper;
