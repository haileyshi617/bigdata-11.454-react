import * as d3 from 'd3';
import data from '../../data/food-global.csv';

// CANVAS SETUP
const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 30, RIGHT: 30 };
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
const OPACITY = { REGULAR: 0.2, SELECT: 1 };
const LINE = { REGULAR: 1, SELECT: 2 };
const COLOR = {
  MODERATE: '#6bbaad',
  SEVERE: '#eb5832',
  GRAY: '#e0e0e0',
  TEXT: '#808080',
};

// TRANSITION SETUP
const TRANS = d3.transition().ease(d3.easeCubicIn).duration(1000);

export default class FoodGlobalChart {
  constructor(element) {
    const vis = this;

    // CANVAS SETUP
    vis.svg = d3
      .select(element)
      .append('svg')
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

    vis.xAxisGroup = vis.svg
      .append('g')
      .attr('transform', `translate(0, ${HEIGHT})`);

    // FETCHING DATA
    Promise.all([d3.csv(data)]).then((datasets) => {
      vis.data = datasets[0];
      vis.update();
    });
  }

  update() {
    const vis = this;

    // DATA JOIN
    const highlightData = vis.data.filter((d) => COUNTRIES.includes(d.country));
    const lines = vis.svg
      .append('g')
      .attr('class', 'lines')
      .selectAll('myLine')
      .data(vis.data);
    const circleModerate = vis.svg
      .append('g')
      .attr('class', 'circleModerate')
      .selectAll('myCircle')
      .data(vis.data);
    const circleSevere = vis.svg
      .append('g')
      .attr('class', 'circleSevere')
      .selectAll('myCircle')
      .data(vis.data);
    const NTlabel = vis.svg
      .append('g')
      .attr('class', 'NTlabel')
      .selectAll('text')
      .data(highlightData);

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
      vis.svg
        .selectAll(`.bellchart-${d.index}`)
        .style('r', CIRCLE.SELECT)
        .attr('stroke-width', LINE.SELECT)
        .attr('opacity', OPACITY.SELECT);
    };

    const mouseout = function (event, d) {
      tooltip.classed('hidden', true);
      vis.svg
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

    const yAxis = (g) =>
      g
        .call(
          d3
            .axisLeft(y)
            .ticks(5)
            .tickFormat((d, i) => `${d}%`)
        )
        .style('color', COLOR.TEXT);

    // ENTER
    lines
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
      .transition(TRANS)
      .transition(TRANS)
      .ease(d3.easeCubicOut)
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
        return COUNTRIES.includes(d.country) ? OPACITY.SELECT : OPACITY.REGULAR;
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
      .attr('class', (d) => `bellchart-${d.index}`)
      .attr('r', '0')
      .style('fill', COLOR.MODERATE)
      .transition(TRANS)
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
      .attr('class', (d) => `bellchart-${d.index}`)
      .attr('r', '0')
      .style('fill', COLOR.SEVERE)
      .transition(TRANS)
      .transition(TRANS)
      .attr('r', CIRCLE.REGULAR)
      .attr('opacity', (d) => {
        return COUNTRIES.includes(d.country) ? OPACITY.SELECT : OPACITY.REGULAR;
      });

    vis.svg.append('g').transition(TRANS).call(yAxis);

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
  }
}
