import React, { useRef, useState, useEffect } from 'react';
import GridChart from './GridChartMigration';

const GridChartWrapper = ({}) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new GridChart(chartArea.current));
    }
  }, [chart]);

  return (
    <div>
      <div className="grid chart-area" rsef={chartArea}>
        <div id="tooltip-grid" className="tooltip hidden"></div>
      </div>
    </div>
  );
};

export default GridChartWrapper;
