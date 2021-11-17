import React, { useRef, useState, useEffect } from 'react';
import GlobalChart from './GlobalChart';

const ChartWrapper = () => {
    const chartArea = useRef(null);
    const [chart, setChart] = useState(null);

    useEffect(() => {
        if (!chart) {
            setChart(new GlobalChart(chartArea.current));
        } else {
            chart.update();
        }
    }, [chart]);

    return <div className="chart-area" ref={chartArea}></div>;
};

export default ChartWrapper;
