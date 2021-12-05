import * as d3 from 'd3';
import React, { useRef, useState, useEffect } from 'react';
import rawdata from '../../data/mig_rate.csv';
import ArcChart from './ArcChart';

// TODO: change the data

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
  const arcRef = React.createRef();

  const [data, setData] = useState(null);
  const [migdata, setMigData] = useState(null);
  const [id, setId] = useState(null);

  // LOAD DATA
  // useEffect => When parent element's target value updates, update data
  useEffect(() => {
    d3.json(
      'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
    ).then((data) => {
      setData(data);
    });

    d3.csv(rawdata).then((data) => {
      setMigData(data);
    });
  }, []);

  // When data updates, update charts
  useEffect(() => {
    if (data && migdata) {
      const svg = d3
        .select(svgRef.current)
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .append('g')
        .attr('transform', `translate(${(WIDTH * 7) / 8}, ${HEIGHT / 6})`);

      svg.selectAll('*').remove();

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
        setId(d.id);
        let rate = migdata.find((e) => e['Alpha-3 code'] == d.id).rate;

        tooltip
          .html(
            d.properties.name == 'USA'
              ? `<p>The <span>${d.properties.name}</span> receives <span>${rate}% </span>of migrants from <span>El Salvador, Guatemala, and Honduras</span>.</p>`
              : `<p>Around <span>${rate}%</span> of the population of <span>${d.properties.name}</span> are migrants to the US by 2020.<p>`
          )
          .classed('hidden', false);

        d3.select(this).attr('fill', (d) =>
          NT.includes(d.id) ? RED.SELECT : GRAY.SELECT
        );
      };

      const mousemove = function (event, d) {
        tooltip.style('left', `${event.clientX * 0.8}px`).style('top', () => {
          if (event.clientY - window.innerHeight / 2 > 0)
            return `${event.clientY * 0.8}px`;
          return `${event.clientY}px`;
        });
      };

      const mouseout = function (event, d) {
        console.log('out');
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
        .on('mousemove', mousemove)
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
  }, [data, migdata]);

  return (
    <>
      <div id="tooltip-map" className="tooltip hidden" ref={tooltipRef}></div>
      <svg className="map-chart" ref={svgRef}></svg>
      {/* <ArcChart id={id} data={migdata} ref={arcRef}/> */}
    </>
  );
};

export default MapChart;
