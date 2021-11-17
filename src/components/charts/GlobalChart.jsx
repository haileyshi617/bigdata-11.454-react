import * as d3 from 'd3';
import data from '../../data/food-global.csv';

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 };
const WIDTH = 1000 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

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

    vis.svg
      .append('text')
      .attr('x', -(HEIGHT / 2))
      .attr('y', -50)
      .attr('text-anchor', 'middle')
      .text('Hunger Severity')
      .attr('transform', 'rotate(-90)');

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
      .range([HEIGHT, 0]);

    const x = d3
      .scaleBand()
      .domain(vis.data.map((d) => d.country))
      .range([0, WIDTH])
      .padding(0.4);

    const xAxisCall = d3.axisBottom(x);
    // vis.xAxisGroup.transition().duration(500).call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    vis.yAxisGroup.transition().duration(500).call(yAxisCall);

    // DATA JOIN
    const lines = vis.svg.selectAll('myLine').data(vis.data);
    const circleModerate = vis.svg.selectAll('myCircle').data(vis.data);
    const circleSevere = vis.svg.selectAll('myCircle').data(vis.data);

    // // EXIT
    // lines
    //   .exit()
    //   .transition()
    //   .duration(500)
    //   .attr('x1', function (d) {
    //     return x(d.country);
    //   })
    //   .attr('x2', function (d) {
    //     return x(d.country);
    //   })
    //   .attr('y1', function (d) {
    //     return y(d.moderate);
    //   })
    //   .attr('y2', function (d) {
    //     return y(d.moderate);
    //   })
    //   .remove();

    // // UPDATE
    // lines
    //   .transition()
    //   .duration(500)
    //   .ease(d3.easeCubicIn)
    //   .attr('x1', function (d) {
    //     return x(d.country);
    //   })
    //   .attr('x2', function (d) {
    //     return x(d.country);
    //   })
    //   .attr('y1', function (d) {
    //     return y(d.moderate);
    //   })
    //   .attr('y2', function (d) {
    //     return y(d.severe);
    //   });

    // Mouse Event
    const mouseover = function (event, d) {
      console.log(event);
      d3.select(this).style('opacity', 0.81);
      d3.select('#tooltip')
        .style('left', event.pageX + 'px')
        .style('top', event.pageY + 'px')
        .html(`<p> ${d.country} </p>`);
      d3.select('#tooltip').classed('hidden', false);
    };

    const mouseout = function (event, d) {
      d3.select(this).style('opacity', 1);
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
      .attr('stroke-width', '2px');

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
      .attr('r', '3');

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
      .attr('r', '3');

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
