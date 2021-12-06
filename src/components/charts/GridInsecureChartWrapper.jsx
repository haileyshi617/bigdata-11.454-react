import React, { useRef, useState, useEffect } from 'react';
import GridInsecureChart from './GridInsecureChart';

const ChartWrapper = ({ steps, direction }) => {
  const [chart, setChart] = useState(null);
  const tooltipRef = React.useRef(null);
  const svgRef = React.useRef(null);

  useEffect(() => {
    if (!chart) {
      setChart(new GridInsecureChart(svgRef.current, steps, direction));
    }
    // skip the loading state, when data is still a pending promise
    else if (chart.intention) {
      chart.update(steps, direction);
    }
  }, [chart, steps, direction]);

  // AXIS
  const axis = (
    <div className="axis-container">
      <small>0%</small>
      <small>25%</small>
      <small>50%</small>
      <small>75%</small>
      <small>100%</small>
    </div>
  );

  return (
    <>
      <div className="chart-container">
        <p>Food Insecure Group</p>
        {axis}
        <div
          id="tooltip-grid"
          className="tooltip hidden red"
          ref={tooltipRef}
        ></div>

        <svg className="grid-chart chart-area" ref={svgRef}></svg>
      </div>
    </>
  );
};

export default ChartWrapper;
