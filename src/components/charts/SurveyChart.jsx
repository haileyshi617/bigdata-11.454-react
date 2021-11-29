import * as d3 from 'd3';
import React, { useRef, useState, useEffect } from 'react';
import rawdata from '../../data/cari-mig.csv';

const COLOR = {
  MARGIN: '#B0D9D5',
  MODERATE: '#F8AD96',
  SEVERE: '#EB5832',
  GRAY: '#e0e0e0',
  TEXT: '#808080',
};

const SurveyChart = ({ steps, direction }) => {
  // console.log(steps);
  const tooltipRef = React.useRef(null);
  const svgRef = React.useRef(null);

  const [data, setData] = useState(null);
  const [nodes, setNodes] = useState(null);

  //d3 chart update according to steps
  let width = '932';
  let height = '800';
  let center = { x: width / 2, y: height / 2 };
  let forceStrength = 0.02;
  let r = 2;
  let xCenter = [width / 4, width / 2, (width * 3) / 4, width];
  let cariCenter = [width / 4, width / 2, (width * 3) / 4, width];

  const svg = d3
    .select(svgRef.current)
    .style('width', '100vw')
    .style('height', '800px')
    .attr('text-anchor', 'middle');

  function charge(d) {
    return -Math.pow(d.radius, 2.0) * forceStrength;
  }

  // when step updates, update data
  useEffect(() => {
    d3.csv(rawdata).then((data) => {
      setData(
        data.slice(0, 3000).map(function (d) {
          return {
            ...d,
            radius: r,
            // x: Math.random() * width,
            // y: Math.random() * height,
          };
        })
      );
    });
  }, []);

  // when data updates, update charts
  useEffect(() => {
    // when not scroll to page, there will be no data loading
    if (data) {
      const nodes = data;
      //   const nodes = data.map(function (d) {
      //     return { ...d, radius: r };
      //   });

      const simulation = d3
        .forceSimulation(nodes)
        .velocityDecay(0.2)
        .force('x', d3.forceX().strength(forceStrength).x(center.x))
        .force('y', d3.forceY().strength(forceStrength).y(center.y))
        .force('charge', d3.forceManyBody().strength(charge))
        .on('tick', ticked);

      const bubbles = svg
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', function (d) {
          return d.radius;
        })
        .attr('fill', function (d) {
          if (d.cari == '2') {
            return COLOR.MARGIN;
          } else if (d.cari == '3') {
            return COLOR.MODERATE;
          } else if (d.cari == '4') {
            return COLOR.SEVERE;
          } else {
            return COLOR.GRAY;
          }
        });

      function ticked() {
        bubbles
          .attr('cx', function (d) {
            return d.x;
          })
          .attr('cy', function (d) {
            return d.y;
          });
      }

      if (steps == 1 && direction == 'down') {
        simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));
      } else if (steps == 2) {
        simulation.force(
          'x',
          d3
            .forceX()
            .strength(forceStrength)
            .x((d) => cariCenter[+d.cari - 1])
        );
      } else if (steps == 3 || steps == 4) {
        simulation.force(
          'x',
          d3
            .forceX()
            .strength(forceStrength)
            .x((d) => xCenter[+d.ifMig])
        );
      }
    }
  }, [steps, data]);

  return (
    <>
      <div className="survey-tooltip hidden" ref={tooltipRef}></div>
      <svg className="survey-chart" ref={svgRef}></svg>
    </>
  );
};

export default SurveyChart;
