import * as d3 from 'd3';
import React, { useRef, useState, useEffect } from 'react';

// CANVAS SETUP
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// RENDERING SETTING
const NT = ['GTM', 'HND', 'SLV'];
const RED = { REGULAR: '#f8ad96', SELECT: '#eb5832' };
const GRAY = { REGULAR: '#f0f0f0', SELECT: '#bcbcbc' };

const MapChart = () => {
  const tooltipRef = React.useRef(null);
  const svgRef = React.useRef(null);
  const [data, setData] = useState(null);

  // LOAD DATA
  // useEffect => When parent element's target value updates, update data
  useEffect(() => {
    d3.json(
      'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
    ).then((data) => {
      setData(data);
    });
  }, []);

  // CANVAS SETUP
  // .current => necessary when use ref
  const svg = d3
    .select(svgRef.current)
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .append('g')
    .attr('transform', `translate(${(WIDTH * 7) / 8}, ${HEIGHT / 6})`);

  // When data updates, update charts
  useEffect(() => {
    if (data) {
      // Map and projection
      const projection = d3
        .geoNaturalEarth1()
        .scale(WIDTH / 0.6 / Math.PI)
        .translate([WIDTH / 2, HEIGHT / 2]);

      // DATA JOIN
      const map = svg.selectAll('path').data(data.features);
      // MOUSE EVENT
      const tooltip = d3.select('#tooltip-map');

      const mouseover = function (event, d) {
        tooltip
          .html(
            d.properties.name == 'USA'
              ? `<p>The <span>${d.properties.name}</span> receives ??% of migrants from El Salvador, Guatemala, and Honduras.</p>`
              : `<p>Around <span>(??)%</span> of the population from <span>${d.properties.name}</span> migrate to the US in 2020.<p>`
          )
          .style('left', `${event.clientX * 0.8}px`)
          .style('top', () => {
            if (event.clientY - window.innerHeight / 2 > 0)
              return `${event.clientY * 0.8}px`;
            return `${event.clientY}px`;
          })
          .classed('hidden', false);

        d3.select(this).attr('fill', (d) =>
          NT.includes(d.id) ? RED.SELECT : GRAY.SELECT
        );
      };

      const mouseout = function (event, d) {
        tooltip.classed('hidden', true);

        d3.select(this).attr('fill', (d) =>
          NT.includes(d.id) ? RED.REGULAR : GRAY.REGULAR
        );
      };

      // ENTER
      map
        .enter()
        .append('path')
        .on('mouseover', mouseover)
        .on('mouseout', mouseout)
        .attr('fill', GRAY.REGULAR)
        .transition()
        .duration(1000)
        .attr('fill', (d) => (NT.includes(d.id) ? RED.REGULAR : GRAY.REGULAR))
        .attr('d', d3.geoPath().projection(projection))
        .style('stroke', '#fff')
        .style('stroke-width', 1)
        .attr('class', 'Country');
    }
  }, [data]);

  return (
    <>
      <div id="tooltip-map" className="tooltip hidden" ref={tooltipRef}></div>
      <svg className="map-chart" ref={svgRef}></svg>
    </>
  );
};

export default MapChart;
