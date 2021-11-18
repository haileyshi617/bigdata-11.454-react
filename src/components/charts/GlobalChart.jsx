import * as d3 from 'd3';
import data from '../../data/food-global.csv';

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 30, RIGHT: 10 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

// conditional rendering
const COUNTRIES = ['Honduras', 'El Salvador', 'Guatemala'];
const CIRCLE = { REGULAR: 5, SELECT: 10 };
const OPACITY = { REGULAR: 0.2, SELECT: 1 };
const LINE = { REGULAR: 0.4, SELECT: 2 };

export default class D3Chart {
  constructor(element) {
    const vis = this;

    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    vis.xLabel = vis.svg
      .append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 50)
      .attr('text-anchor', 'middle');

    vis.xAxisGroup = vis.svg
      .append('g')
      .attr('transform', `translate(0, ${HEIGHT})`);

    vis.yAxisGroup = vis.svg.append('g').attr('id', 'y-axis');

    Promise.all([d3.csv(data)]).then((datasets) => {
      vis.data = datasets[0];
      vis.update();
    });
  }

  update() {
    const vis = this;
    vis.data = vis.data;

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(vis.data, (d) => d.severe),
        d3.max(vis.data, (d) => d.moderate),
      ])
      .nice()
      .range([HEIGHT, 0]);

    const x = d3
      .scaleBand()
      .domain(vis.data.map((d) => d.country))
      .range([0, WIDTH])
      .padding(0.4);

    const yAxisCall = d3.axisLeft(y).tickFormat((d, i) => {
      if (i % 2 == 0) {
        return `${d}%`;
      }
    });
    vis.yAxisGroup.transition().duration(500).call(yAxisCall);

    // DATA JOIN
    const lines = vis.svg.selectAll('myLine').data(vis.data);
    const circleModerate = vis.svg.selectAll('myCircle').data(vis.data);
    const circleSevere = vis.svg.selectAll('myCircle').data(vis.data);

    // MOUSE EVENT
    const mouseover = function (event, d) {
      d3.select(this).style('r', CIRCLE.SELECT);
      d3.select(this).attr('stroke-width', LINE.SELECT);
      d3
        .select('#tooltip')
        .style('left', event.pageX - 100 + 'px')
        .style('top', event.pageY - 100 + 'px').html(`<p> ${d.country} </p>
        <p> Severe Hunger: ${d.severe} </p>
        <p> Moderate Hunger: ${d.moderate} </p>`);
      d3.select('#tooltip').classed('hidden', false);
    };

    const mouseout = function (event, d) {
      d3.select(this).style('r', CIRCLE.REGULAR);
      d3.select(this).attr('stroke-width', (d) => {
        return COUNTRIES.includes(d.country) ? LINE.SELECT : LINE.REGULAR;
      });
      d3.select('#tooltip').classed('hidden', true);
    };

    // ENTER
    lines
      .enter()
      .append('line')
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
      .duration(1000)
      .transition()
      .duration(800)
      .ease(d3.easeCubicOut)
      .attr('y1', function (d) {
        return y(d.moderate);
      })
      .attr('y2', function (d) {
        return y(d.severe);
      })
      .attr('stroke', '#bcbcbc')
      .attr('stroke-width', (d) => {
        return COUNTRIES.includes(d.country) ? LINE.SELECT : LINE.REGULAR;
      });

    circleModerate
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
      .attr('r', '0')
      .style('fill', '#6bbaad')
      .transition()
      .ease(d3.easeCubicIn)
      .duration(500)
      .attr('r', CIRCLE.REGULAR)
      .attr('opacity', (d) => {
        return COUNTRIES.includes(d.country) ? OPACITY.SELECT : OPACITY.REGULAR;
      });

    circleSevere
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
      .attr('r', '0')
      .style('fill', '#eb5832')
      .transition()
      .duration(1500)
      .transition()
      .ease(d3.easeCubicIn)
      .duration(500)
      .attr('r', CIRCLE.REGULAR)
      .attr('opacity', (d) => {
        return COUNTRIES.includes(d.country) ? OPACITY.SELECT : OPACITY.REGULAR;
      });

    // // EXIT
    // rects
    //   .exit()
    //   .transition()
    //   .duration(500)
    //   .attr('height', 0)
    //   .attr('y', HEIGHT)
    //   .remove();

    // // UPDATE
    // rects
    //   .transition()
    //   .duration(500)
    //   .attr('x', (d) => x(d.country))
    //   .attr('y', (d) => y(d.moderate))
    //   .attr('width', x.bandwidth)
    //   .attr('height', (d) => HEIGHT - y(d.moderate));

    // // ENTER
    // rects
    //   .enter()
    //   .append('rect')
    //   .attr('x', (d) => x(d.country))
    //   .attr('width', x.bandwidth)
    //   .attr('fill', 'grey')
    //   .attr('y', HEIGHT)
    //   .transition()
    //   .duration(500)
    //   .attr('height', (d) => HEIGHT - y(d.moderate))
    //   .attr('y', (d) => y(d.moderate));
  }
}
