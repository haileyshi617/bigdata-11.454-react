import * as d3 from 'd3';

// CANVAS SETUP
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// RENDERING SETTING
const NT = ['GTM', 'HND', 'SLV'];
const RED = { REGULAR: '#f8ad96', SELECT: '#eb5832' };
const GRAY = { REGULAR: '#f0f0f0', SELECT: '#bcbcbc' };

export default class Mapchart {
  constructor(element) {
    const vis = this;

    // CANVAS SETUP
    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width', WIDTH)
      .attr('height', HEIGHT)
      .append('g')
      .attr('transform', `translate(${(WIDTH * 5) / 6}, ${HEIGHT / 6})`);

    // Map and projection
    vis.projection = d3
      .geoNaturalEarth1()
      .scale(WIDTH / 0.6 / Math.PI)
      .translate([WIDTH / 2, HEIGHT / 2]);

    // FETCHING DATA
    Promise.all([
      d3.json(
        'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
      ),
    ]).then((datasets) => {
      vis.data = datasets[0];
      vis.update();
    });
  }
  update() {
    const vis = this;
    vis.data = vis.data;

    // DATA JOIN
    const map = vis.svg.selectAll('path').data(vis.data.features);

    // MOUSE EVENT
    const tooltip = d3.select('#tooltip-map');

    const mouseover = function (event, d) {
      tooltip
        .html(
          `<p>In <span>${d.properties.name}</span>, around <span>(??)%</span> of the population migrate to the US.<p>`
        )
        .style('left', event.pageX + 'px')
        .style('top', event.pageY - HEIGHT + 'px')
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
      .attr('d', d3.geoPath().projection(vis.projection))
      .style('stroke', '#fff')
      .style('stroke-width', 1)
      .attr('class', 'Country');
  }
}
