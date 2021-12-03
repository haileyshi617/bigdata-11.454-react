import * as d3 from 'd3';
import React, { useRef, useState, useEffect, forwardRef } from 'react';

const ArcChart = forwardRef(({ data, id }, ref) => {
  const innerRef = React.useRef(null);
//   console.log(id);

  return (
    <>
      <svg className="arc-chart" ref={ref}></svg>
    </>
  );
});

export default ArcChart;
