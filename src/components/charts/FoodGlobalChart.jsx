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
const LINE = { REGULAR: 1, SELECT: 3 };
const COLOR = {
  MODERATE_S: '#6bbaad',
  SEVERE_S: '#eb5832',
  MODERATE_R: '#DFEBE8',
  SEVERE_R: '#EBD7D0',
  GRAY: '#F3F3F3',
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

  // When data updates, update charts
  useEffect(() => {
    if (data) {
      // CANVAS SETUP
      const svgEl = d3
        .select(svgRef.current) // .current => necessary when use ref
        .attr('width', '100%')
        .attr(
          'viewBox',
          `0 0 ${WIDTH + MARGIN.LEFT + MARGIN.RIGHT} ${
            HEIGHT + MARGIN.TOP + MARGIN.BOTTOM
          }`
        )
        .attr('preserveAspectRatio', 'xMaxYMin meet');
      svgEl.selectAll('*').remove(); // Clear svg content before adding new elements

      const svg = svgEl
        .append('g')
        .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

      const xAxisGroup = svg
        .append('g')
        .attr('transform', `translate(0, ${HEIGHT})`);

      // MOUSE EVENT
      const tooltip = d3.select('#tooltip-food-global');

      const mouseover = function (event, d) {
        tooltip
          .html(
            `<p class="header"><span> ${d.country} </span></p>
                    <p class="moderate"> Moderate Hunger: ${d.moderate}% </p>
                    <p> Severe Hunger: ${d.severe}% </p>`
          )
          .style('left', `${event.clientX * 0.7}px`)
          .style('top', `${event.clientY * 0.5}px`)
          .classed('hidden', false);
        svg
          .selectAll(`.bellchart-${d.index}`)
          .style('r', CIRCLE.SELECT)
          .style('stroke', COLOR.TEXT)
          .attr('stroke-width', LINE.REGULAR);
      };

      const mouseout = function (event, d) {
        tooltip.classed('hidden', true);
        svg
          .selectAll(`.bellchart-${d.index}`)
          .style('r', CIRCLE.REGULAR)
          .style('stroke', 'transparent');
        svg
          .selectAll('line')
          .style('stroke', COLOR.GRAY)
          .attr('stroke-width', (d) =>
            COUNTRIES.includes(d.country) ? LINE.SELECT : LINE.REGULAR
          );
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
          .style('color', COLOR.TEXT)
          .transition()
          .ease(d3.easeCubicIn)
          .duration(1000);

      // DATA JOIN
      const highlightData = data.filter((d) => COUNTRIES.includes(d.country));

      // TODO: Fix animations!

      // STEP 0
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
        .attr('y1', function (d) {
          return y(d.moderate);
        })
        .attr('y2', function (d) {
          return y(d.severe);
        })
        .attr('stroke', COLOR.GRAY)
        .attr('stroke-width', (d) => {
          return COUNTRIES.includes(d.country) ? LINE.SELECT : LINE.REGULAR;
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
        .style('fill', COLOR.GRAY)
        .attr('r', CIRCLE.REGULAR);

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
        .style('fill', COLOR.GRAY)
        .attr('r', CIRCLE.REGULAR);

      const NTlabel = svg
        .append('g')
        .attr('class', 'NTlabel')
        .selectAll('text')
        .data(highlightData)
        .enter()
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

      svg.append('g').call(yAxis);

      // STEP 1:
      // 1) Highlight selected countries -> text
      if (steps === 1) {
        if (direction === 'down') {
          circleModerate
            .transition()
            .ease(d3.easeCubicIn)
            .duration(500)
            .style('fill', (d) => {
              if (COUNTRIES.includes(d.country))
                if (d.country === 'United States of America') {
                  return COLOR.MODERATE_S;
                } else {
                  return COLOR.SEVERE_S;
                }
              return COLOR.GRAY;
            });

          circleSevere
            .transition()
            .ease(d3.easeCubicIn)
            .duration(500)
            .style('fill', (d) => {
              if (COUNTRIES.includes(d.country))
                if (d.country === 'United States of America') {
                  return COLOR.MODERATE_S;
                } else {
                  return COLOR.SEVERE_S;
                }
              return COLOR.GRAY;
            });

          NTlabel.transition()
            .ease(d3.easeCubicIn)
            .duration(500)
            .style('fill', (d) =>
              d.country === 'United States of America'
                ? COLOR.MODERATE_S
                : COLOR.SEVERE_S
            )
            .style('font-weight', 'bold');
        } else {
          circleModerate.style('fill', (d) => {
            if (COUNTRIES.includes(d.country))
              if (d.country === 'United States of America') {
                return COLOR.MODERATE_S;
              } else {
                return COLOR.SEVERE_S;
              }
            return COLOR.GRAY;
          });

          circleSevere.style('fill', (d) => {
            if (COUNTRIES.includes(d.country))
              if (d.country === 'United States of America') {
                return COLOR.MODERATE_S;
              } else {
                return COLOR.SEVERE_S;
              }
            return COLOR.GRAY;
          });

          NTlabel.style('fill', (d) =>
            d.country === 'United States of America'
              ? COLOR.MODERATE_S
              : COLOR.SEVERE_S
          ).style('font-weight', 'bold');
        }
      }

      // STEP 2:
      // 1) Undo highlight selected countries -> tex
      // 2) Add in colors based on countries and severity to the circles
      if (steps === 2) {
        if (direction === 'down') {
          NTlabel.transition()
            .ease(d3.easeCubicIn)
            .duration(500)
            .style('fill', COLOR.TEXT);

          circleModerate
            .transition()
            .ease(d3.easeCubicIn)
            .duration(500)
            .style('fill', (d) =>
              COUNTRIES.includes(d.country)
                ? COLOR.MODERATE_S
                : COLOR.MODERATE_R
            );

          circleSevere
            .transition()
            .ease(d3.easeCubicIn)
            .duration(500)
            .style('fill', (d) =>
              COUNTRIES.includes(d.country) ? COLOR.SEVERE_S : COLOR.SEVERE_R
            );
        } else {
          NTlabel.style('fill', COLOR.TEXT);
          circleModerate.style('fill', (d) =>
            COUNTRIES.includes(d.country) ? COLOR.MODERATE_S : COLOR.MODERATE_R
          );

          circleSevere.style('fill', (d) =>
            COUNTRIES.includes(d.country) ? COLOR.SEVERE_S : COLOR.SEVERE_R
          );
        }
      }

      // STEP 3
      if (steps > 2) {
        circleModerate.style('fill', (d) =>
          COUNTRIES.includes(d.country) ? COLOR.MODERATE_S : COLOR.MODERATE_R
        );
        circleSevere.style('fill', (d) =>
          COUNTRIES.includes(d.country) ? COLOR.SEVERE_S : COLOR.SEVERE_R
        );
        NTlabel.style('fill', COLOR.TEXT);
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
