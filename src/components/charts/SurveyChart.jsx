import * as d3 from 'd3';
import React, { useRef, useState, useEffect } from 'react';
import rawdata from '../../data/cari-mig.csv';

const COLOR = {
  MODERATE: '#6bbaad',
  SEVERE: '#eb5832',
  GRAY: '#e0e0e0',
  TEXT: '#808080',
};

const SurveyChart = ({ steps }) => {
  const tooltipRef = React.useRef(null);
  const svgRef = React.useRef(null);
  const gRef = React.useRef(null);

  const [data, setData] = useState(null);

  // when step updates, update data
  useEffect(() => {
    d3.csv(rawdata).then((data) => {
      setData(data);
    });
  }, [steps]);

  //d3 chart update according to steps
  let width = '932';
  let height = '800';

  const svg = d3
    .select(svgRef.current)
    .style('width', '100vw')
    .style('height', '800px')
    .attr('text-anchor', 'middle');

  // when data updates, update charts
  useEffect(() => {
    // when not scroll to page, there will be no data loading
    if (data) {
      var nodes = d3.range(data.length / 2).map(function (d) {
        return { radius: 2 };
      });

      const simulation = d3
        .forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(0.6))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force(
          'collision',
          d3.forceCollide().radius(function (d) {
            return d.radius;
          })
        )
        .on('tick', ticked);

      function ticked() {
        var u = svg
          .selectAll('circle')
          .data(nodes)
          .join('circle')
          .attr('r', function (d) {
            return d.radius;
          })
          .attr('cx', function (d) {
            return d.x;
          })
          .attr('cy', function (d) {
            return d.y;
          })
          .attr('fill', COLOR.MODERATE);
      }
    }
  }, [data]);

  return (
    <>
      <div className="survey-tooltip hidden" ref={tooltipRef}></div>
      <svg className="survey-chart" ref={svgRef}></svg>
    </>
  );
};

export default SurveyChart;
