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

const SurveyChart = ({ steps }) => {
  console.log(steps);
  const tooltipRef = React.useRef(null);
  const svgRef = React.useRef(null);

  const [data, setData] = useState(null);

  // when step updates, update data
  useEffect(() => {
    d3.csv(rawdata).then((data) => {
      setData(data.slice(0, 4000));
    });
  }, []);

  //d3 chart update according to steps
  let width = '932';
  let height = '800';
  let center = { x: width / 2, y: height / 2 };
  let forceStrength = 5;
  let r = 2;
  let xCenter = [width / 4, width / 2, (width * 3) / 4, width];
  let cariCenter = [width / 4, width / 2, (width * 3) / 4, width];

  const svg = d3
    .select(svgRef.current)
    .style('width', '100vw')
    .style('height', '800px')
    .attr('text-anchor', 'middle');

  function charge(d) {
    return -Math.pow(d.radius, 4.0) * forceStrength;
  }

  // when data updates, update charts
  useEffect(() => {
    // when not scroll to page, there will be no data loading
    if (data) {
      console.log(data.length);
      const nodes = data
        .map(function (d) {
          return { ...d, radius: r };
        })
        .sort(function (a, b) {
          return b.ifMig - a.ifMig;
        });

      const simulation = d3
        .forceSimulation(nodes)
        .velocityDecay(0.8)
        .force(
          'x',
          d3
            .forceX()
            .strength(forceStrength)
            .x((d) => {
              return center.x;
              //   return xCenter[+d.ifMig];
            })
        )
        .force(
          'y',
          d3
            .forceY()
            .strength(forceStrength)
            .y((d) => {
              return center.y;
            })
        )
        .force('charge', d3.forceManyBody().strength(charge))
        .on('tick', ticked);

      function ticked() {
        const u = svg
          .selectAll('circle')
          .data(nodes)
          .join('circle')
          //   .transition()
          //   .duration(2000)
          .attr('r', function (d) {
            return d.radius;
          })
          .attr('cx', function (d) {
            return d.x;
          })
          .attr('cy', function (d) {
            return d.y;
          })
          .attr('fill', function (d) {
            if (d.ifMig == '1') {
              return COLOR.MARGIN;
            } else if (d.ifMig == '2') {
              return COLOR.MODERATE;
            } else if (d.ifMig == '3') {
              return COLOR.SEVERE;
            } else {
              return COLOR.GRAY;
            }
          });
      }

      if (steps == 2) {
        simulation.force(
          'x',
          d3
            .forceX()
            .strength(forceStrength)
            .x((d) => xCenter[+d.ifMig])
        );
      } else if (steps == 3) {
        simulation.force(
          'x',
          d3
            .forceX()
            .strength(forceStrength)
            .x((d) => cariCenter[+d.cari])
        );
      } else if (steps == 1) {
        simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));
      }
    }
  }, [data, steps]);

  return (
    <>
      <div className="survey-tooltip hidden" ref={tooltipRef}></div>
      <svg className="survey-chart" ref={svgRef}></svg>
      <button className="button">toggle</button>
    </>
  );
};

export default SurveyChart;
