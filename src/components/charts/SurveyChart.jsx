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

  //d3 chart update according to steps
  let width = '1200';
  let height = '800';
  let center = { x: width / 2, y: height / 2 };
  let forceStrength = 0.023;
  let r = 2;
  let padding = 2;
  let cariCenter = [width / 6, width / 2.3, width / 1.5, width / 1.2];
  let xCenter = [width / 6, width / 2.3, width / 1.5, width / 1.2];

  // when step updates, update data
  useEffect(() => {
    d3.csv(rawdata).then((data) => {
      setData(
        data.slice(0, 1000).map(function (d) {
          return {
            ...d,
            radius: r,
          };
        })
      );
    });
  }, []);

  // when data updates, update charts
  useEffect(() => {
    // when not scroll to page, there will be no data loading

    if (data) {
      const svg = d3
        .select(svgRef.current)
        .style('width', '100vw')
        .style('height', '800px')
        .attr('text-anchor', 'middle');

      const simulation = d3
        .forceSimulation(data)
        .velocityDecay(0.2)
        .force(
          'collide',
          d3
            .forceCollide()
            .radius(function (d) {
              return d.radius + padding;
            })
            .strength(0.65)
        )
        .force('x', d3.forceX().strength(forceStrength).x(center.x))
        .force('y', d3.forceY().strength(forceStrength).y(center.y))
        .on('tick', ticked);

      const bubbles = svg
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('r', 0)
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

      bubbles
        .transition()
        .ease(d3.easeBounce)
        .duration(0.5)
        .attr('r', function (d) {
          return d.radius;
        });

      function ticked() {
        bubbles.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
      }

      if (steps == 1 && direction == 'down') {
        simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));
        simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));
        simulation.alpha(1).restart();
      } else if (steps == 2) {
        simulation.force(
          'x',
          d3
            .forceX()
            .strength(forceStrength)
            .x((d) => cariCenter[+d.cari - 1])
        );
        simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));
        simulation.alpha(1).restart();
      } else if (steps == 3 || steps == 4) {
        simulation.force(
          'x',
          d3
            .forceX()
            .strength(forceStrength)
            .x((d) => xCenter[+d.ifMig])
        );
        simulation.force('y', d3.forceY().strength(forceStrength).y(center.y));
        simulation.alpha(1).restart();
      }
      simulation.alpha(1).restart();
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
