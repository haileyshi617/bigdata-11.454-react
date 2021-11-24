import * as d3 from 'd3';
import React, { useRef, useState, useEffect } from 'react';
import dataSrc from '../../data/food-global.csv';

// CANVAS SETUP
const MARGIN = { TOP: 0, BOTTOM: 50, LEFT: 30, RIGHT: 30 };
const WIDTH = 1000 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 450 - MARGIN.TOP - MARGIN.BOTTOM;

// RENDERING SETUP
const COUNTRIES = [
  'Honduras',
  'El Salvador',
  'Guatemala',
  'United States of America',
];
const CIRCLE = { REGULAR: 4, SELECT: 5 };
const OPACITY = { REGULAR: 0.1, SELECT: 1 };
const LINE = { REGULAR: 1, SELECT: 2 };
const COLOR = {
  MODERATE: '#6bbaad',
  SEVERE: '#eb5832',
  GRAY: '#e0e0e0',
  TEXT: '#808080',
};

const FoodGlobalChart = ({ steps, direction }) => {
  const tooltipRef = React.useRef(null);
  const svgRef = React.useRef(null);
  const [data, setData] = useState(null);

  // LOAD DATA
  // useEffect => When parent element's target value updates, update data
  useEffect(() => {
    d3.csv(dataSrc).then((data) => {
      setData(data);
    });
  }, []);

  // CANVAS SETUP
  // .current => necessary when use ref
  const svg = d3
    .select(svgRef.current)
    .attr('width', '100%')
    .attr(
      'viewBox',
      `0 0 ${WIDTH + MARGIN.LEFT + MARGIN.RIGHT} ${
        HEIGHT + MARGIN.TOP + MARGIN.BOTTOM
      }`
    )
    .attr('preserveAspectRatio', 'xMaxYMin meet')
    .append('g')
    .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

  const xAxisGroup = svg
    .append('g')
    .attr('transform', `translate(0, ${HEIGHT})`);

  // When data updates, update charts
  useEffect(() => {
    if (data) {
      // MOUSE EVENT
      const tooltip = d3.select('#tooltip-food-global');

      const mouseover = function (event, d) {
        tooltip
          .html(
            `<p class="header"><span> ${d.country} </span></p>
                    <p class="moderate"> Moderate Hunger: ${d.moderate}% </p>
                    <p> Severe Hunger: ${d.severe}% </p>`
          )
          .style('left', `${event.clientX * 0.8}px`)
          .style('top', `${event.clientY * 0.8}px`)
          .classed('hidden', false);
        svg
          .selectAll(`.bellchart-${d.index}`)
          .style('r', CIRCLE.SELECT)
          .attr('stroke-width', LINE.SELECT)
          .attr('opacity', OPACITY.SELECT);
      };

      const mouseout = function (event, d) {
        tooltip.classed('hidden', true);
        svg
          .selectAll(`.bellchart-${d.index}`)
          .style('r', CIRCLE.REGULAR)
          .attr('stroke-width', (d) =>
            COUNTRIES.includes(d.country) ? LINE.SELECT : LINE.REGULAR
          )
          .attr('opacity', (d) => {
            return COUNTRIES.includes(d.country)
              ? OPACITY.SELECT
              : OPACITY.REGULAR;
          });
      };

      // SCALES
      const y = d3
        .scaleLinear()
        .domain([
          d3.min(data, (d) => d.severe),
          d3.max(data, (d) => d.moderate),
        ])
        .nice()
        .range([HEIGHT, 0]);

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.country))
        .range([0, WIDTH])
        .padding(0.4);

      const yAxis = (g) =>
        g
          .call(
            d3
              .axisLeft(y)
              .ticks(5)
              .tickFormat((d, i) => `${d}%`)
          )
          .style('color', COLOR.TEXT);

      // DATA JOIN
      const highlightData = data.filter((d) => COUNTRIES.includes(d.country));

      const lines = svg
        .append('g')
        .attr('class', 'lines')
        .selectAll('myLine')
        .data(data)
        .enter()
        .append('line')
        .attr('class', (d) => `bellchart-${d.index}`)
        .on('mouseover', mouseover)
        .on('mouseout', mouseout)
        .attr('x1', function (d) {
          return x(d.country);
        })
        .attr('x2', function (d) {
          return x(d.country);
        })
        .attr('y1', function (d) {
          return y(d.moderate);
        })
        .attr('y2', function (d) {
          return y(d.moderate);
        })
        .transition()
        .ease(d3.easeCubicIn)
        .duration(1000)
        .attr('y1', function (d) {
          return y(d.moderate);
        })
        .attr('y2', function (d) {
          return y(d.severe);
        })
        .attr('stroke', COLOR.GRAY)
        .attr('stroke-width', (d) => {
          return COUNTRIES.includes(d.country) ? LINE.SELECT : LINE.REGULAR;
        })
        .attr('opacity', (d) => {
          return COUNTRIES.includes(d.country)
            ? OPACITY.SELECT
            : OPACITY.REGULAR;
        });

      const circleModerate = svg
        .append('g')
        .attr('class', 'circleModerate')
        .selectAll('myCircle')
        .data(data)
        .enter()
        .append('circle')
        .on('mouseover', mouseover)
        .on('mouseout', mouseout)
        .attr('cx', function (d) {
          return x(d.country);
        })
        .attr('cy', function (d) {
          return y(d.moderate);
        })
        .attr('class', (d) => `bellchart-${d.index}`)
        .attr('r', '0')
        .style('fill', COLOR.GRAY)
        .transition()
        .ease(d3.easeCubicIn)
        .duration(1000)
        .attr('r', CIRCLE.REGULAR)
        .attr('opacity', (d) => {
          return COUNTRIES.includes(d.country)
            ? OPACITY.SELECT
            : OPACITY.REGULAR;
        });

      const circleSevere = svg
        .append('g')
        .attr('class', 'circleSevere')
        .selectAll('myCircle')
        .data(data)
        .enter()
        .append('circle')
        .on('mouseover', mouseover)
        .on('mouseout', mouseout)
        .attr('cx', function (d) {
          return x(d.country);
        })
        .attr('cy', function (d) {
          return y(d.severe);
        })
        .attr('class', (d) => `bellchart-${d.index}`)
        .attr('r', '0')
        .style('fill', COLOR.GRAY)
        .transition()
        .ease(d3.easeCubicIn)
        .duration(1000)
        .transition()
        .ease(d3.easeCubicIn)
        .duration(1000)
        .attr('r', CIRCLE.REGULAR)
        .attr('opacity', (d) => {
          return COUNTRIES.includes(d.country)
            ? OPACITY.SELECT
            : OPACITY.REGULAR;
        });

      const NTlabel = svg
        .append('g')
        .attr('class', 'NTlabel')
        .selectAll('text')
        .data(highlightData);

      svg
        .append('g')
        .transition()
        .ease(d3.easeCubicIn)
        .duration(1000)
        .call(yAxis);

      NTlabel.enter()
        .append('text')
        .attr('y', (d) =>
          d.country === 'El Salvador'
            ? y(d.moderate) - 30
            : d.country === 'Guatemala'
            ? y(d.moderate) - 35
            : y(d.moderate) - 20
        )
        .attr('x', (d) => x(d.country))
        .attr('text-anchor', 'middle')
        .attr('fill', COLOR.TEXT)
        .attr('font-size', '12px')
        .text((d) => d.country);

      // SCROLL ANIMATION
      // DOWN
      if (direction === 'down') {
        if (steps >= 2) {
          circleModerate
            .transition()
            .ease(d3.easeCubicIn)
            .duration(500)
            .style('fill', COLOR.MODERATE);

          circleSevere
            .transition()
            .ease(d3.easeCubicIn)
            .duration(500)
            .style('fill', COLOR.SEVERE);
          // NTlabel
        }
        // if (steps === 2) {
        //   circleModerate.style('fill', COLOR.MODERATE);
        //   circleSevere.style('fill', COLOR.SEVERE);
        //   // circleModerate
        //   // circleSevere
        //   // NTlabel
        // }
      }
      // UP
      if (direction === 'up') {
        if (steps >= 2) {
          circleModerate
            .transition()
            .ease(d3.easeCubicIn)
            .duration(500)
            .style('fill', COLOR.MODERATE);

          circleSevere
            .transition()
            .ease(d3.easeCubicIn)
            .duration(500)
            .style('fill', COLOR.SEVERE);
          // NTlabel
        }
      }
    }
  }, [data, steps, direction]);

  return (
    <>
      <div
        id="tooltip-food-global"
        className="tooltip hidden"
        ref={tooltipRef}
      ></div>
      <svg className="grid-chart" ref={svgRef}></svg>
    </>
  );
};

export default FoodGlobalChart;
