import React, { useRef, useState, useEffect } from 'react';
import MapChart from './MapChart';

const MapWrapper = ({ }) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new MapChart(chartArea.current));
    }
    // skip the loading state, when data is still a pending promise
    else if (chart.data) {
      chart.update();
    }
  }, [chart]);

  return (
    <>
      <div className="map-tooltip hidden"></div>
      <div className="map-chart" ref={chartArea}></div>
    </>)


};

export default MapWrapper;
