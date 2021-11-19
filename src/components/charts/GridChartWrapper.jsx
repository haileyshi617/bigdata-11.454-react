import React, { useRef, useState, useEffect } from 'react';
import GridChart from './GridChart';

const GridChartWrapper = ({}) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new GridChart(chartArea.current));
    }
    // // skip the loading state, when data is still a pending promise
    // else if (chart.menData) {
    //   chart.update();
    // }
  }, [chart]);

  return (
    <div>
      <div className="grid" ref={chartArea}>
        {/* <div id="tooltip" className="hidden"></div> */}
      </div>
    </div>
  );
};

export default GridChartWrapper;
