import * as d3 from 'd3';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

export default class Mapchart {
  constructor(element) {
    const vis = this;
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
    const NT = ['GTM', 'HND', 'SLV'];

    const map = vis.svg.selectAll('path').data(vis.data.features);

    // MOUSE EVENT
    const tooltip = d3.selectAll('.tooltip');

    const mouseover = (event, d) => {
      tooltip
        .html(
          `<p>in ${d.properties.name} around % of the popluation migrates to the US.<p>`
        )
        .style('left', event.pageX + 'px')
        .style('top', event.pageY - HEIGHT + 'px')
        .classed('hidden', false);
      vis.svg.selectAll('path').style('opacity', 1);
      vis.svg
        .selectAll('path')
        .filter((e) => e === d)
        .attr('fill', (d) => (NT.includes(d.id) ? '#eb5832' : '#bcbcbc'));
    };

    const mouseout = (event, d) => {
      tooltip.classed('hidden', true);
      vis.svg
        .selectAll('path')
        .style('opacity', 1)
        .attr('fill', (d) => (NT.includes(d.id) ? '#f8ad96' : '#f0f0f0'));
    };

    map
      .enter()
      .append('path')
      .attr('fill', (d) => (NT.includes(d.id) ? '#f8ad96' : '#f0f0f0'))
      .attr('d', d3.geoPath().projection(vis.projection))
      .style('stroke', '#fff')
      .style('stroke-width', 1)
      .attr('class', 'Country')
      .on('mouseover', mouseover)
      .on('mouseout', mouseout);
  }
}
