import * as d3 from 'd3';
import dataSrc from '../../data/sliced1000.csv';
import React, { useRef, useState, useEffect } from 'react';

// CANVAS SETUP
const MARGIN = { TOP: 0, BOTTOM: 0, LEFT: 0, RIGHT: 0 };
const WIDTH = 960 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 100 - MARGIN.TOP - MARGIN.BOTTOM;

// GRID SETUP
const NCOL = 100;
const NROW = 10;

// RENDERING SETUP
const COLOR = {
  MIGRATE_NO: '#6bbaad',
  MIGRATE_YES: '#eb5832',
  GRAY: '#e0e0e0',
};

const GridMigrationChart = ({ steps, direction }) => {
  const tooltipRef = React.useRef(null);
  const svgRef = React.useRef(null);
  const [data, setData] = useState(null);

  // CANVAS SETUP
  // .current => necessary when use ref
  const svg = d3
    .select(svgRef.current)
    .attr(
      'viewBox',
      `0 0 ${WIDTH + MARGIN.LEFT + MARGIN.RIGHT} ${
        HEIGHT + MARGIN.TOP + MARGIN.BOTTOM
      }`
    )
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .append('g')
    .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

  const xAxisGroup = svg
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${HEIGHT})`);

  const yAxisGroup = svg.append('g').attr('id', 'y-axis');

  // Init function to draw grid
  const setGridData = function (visData) {
    let xpos = 1;
    let ypos = 1;

    const width = WIDTH / NCOL;
    const height = width;

    // setting up the array for the grid
    let data = new Array();
    // keep track of data to collect
    let i = 0;

    // iterate for cols
    for (let column = 0; column < NCOL; column++) {
      data.push(new Array());

      // iterate for cells/rows inside cols
      for (let row = 0; row < NROW; row++) {
        data[column].push({
          x: xpos,
          y: ypos,
          width: width,
          height: height,
          visData: visData[i],
        });
        // increment the y position
        ypos += height;
        i++;
      }
      // reset the y position after a row is complete
      ypos = 1;
      // increment the x position for the next col
      xpos += width;
    }
    return data;
  };

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
      // MOUSE EVENT
      const tooltip = d3.select('#tooltip-grid');

      const mouseover = function (event, d) {
        tooltip
          .style('left', `${event.clientX * 0.8}px`)
          .style('top', `${event.clientY * 0.8}px`)
          .html(
            `<p class="header"><span>${d.visData.sex}, ${d.visData.age}</span></p>
            <p> Living in ${d.visData.rural_urban} area in ${d.visData.country}, with a family size of ${d.visData.fam_size} which is ${d.visData.fam_type} </p>`
          )
          .classed('hidden', false);
      };

      const mouseout = function (event, d) {
        tooltip.classed('hidden', true);
      };

      const gridData = setGridData(data);

      // Log the data to the console for quick debugging
      // console.log(gridData);

      const row = svg
        .selectAll('.row')
        .data(gridData)
        .enter()
        .append('g')
        .attr('class', 'row');

      const column = row
        .selectAll('.square')
        .data(function (d) {
          return d;
        })
        .enter()
        .append('rect')
        .attr('class', 'square')
        .attr('x', function (d) {
          return d.x;
        })
        .attr('y', function (d) {
          return d.y;
        })
        .attr('width', function (d) {
          return d.width;
        })
        .attr('height', function (d) {
          return d.height;
        })
        .on('mouseover', mouseover)
        .on('mouseout', mouseout)
        .style('fill', COLOR.GRAY)
        .style('stroke', '#fff');

      // SCROLL ANIMATION
      if (direction === 'down') {
        if (steps === 2) {
          column
            .transition()
            .ease(d3.easeCubicIn)
            .duration(500)
            .style('fill', (d) =>
              d.visData.mig_categ === '0.0'
                ? COLOR.MIGRATE_NO
                : COLOR.MIGRATE_YES
            );
        }
        if (steps > 2) {
          column.style('fill', (d) =>
            d.visData.mig_categ === '0.0' ? COLOR.MIGRATE_NO : COLOR.MIGRATE_YES
          );
        }
      }

      if (direction === 'up') {
        if (steps > 2) {
          column.style('fill', (d) =>
            d.visData.mig_categ === '0.0' ? COLOR.MIGRATE_NO : COLOR.MIGRATE_YES
          );
        } else {
          column
            .transition()
            .ease(d3.easeCubicIn)
            .duration(500)
            .style('fill', COLOR.GRAY);
        }
      }
    }
  }, [data, steps, direction]);

  return (
    <>
      <div id="tooltip-grid" className="tooltip hidden" ref={tooltipRef}></div>
      <svg className="grid-chart chart-area" ref={svgRef}></svg>
    </>
  );
};
export default GridMigrationChart;
