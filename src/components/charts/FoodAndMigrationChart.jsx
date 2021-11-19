import * as d3 from 'd3';
import data from '../../data/roster.csv';

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 30, RIGHT: 10 };
const WIDTH = 1000 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

// // conditional rendering
// const COUNTRIES = [
//   'Honduras',
//   'El Salvador',
//   'Guatemala',
//   'United States of America',
// ];
// const CIRCLE = { REGULAR: 5, SELECT: 10 };
// const OPACITY = { REGULAR: 0.2, SELECT: 1 };
// const LINE = { REGULAR: 0.4, SELECT: 2 };

export default class FoodAndMigrationChart {
  constructor(element) {
    const vis = this;

    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    vis.xAxisGroup = vis.svg
      .append('g')
      .attr('id', 'x-axis')
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

    // add the tooltip area to the webpage
    let tooltip = d3
      .select('.food-chart-area')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    const t = d3.transition().duration(1000);

    // Set the ranges
    const x = d3.scaleLinear().rangeRound([0, WIDTH]).domain([2, 11]);
    // const y = d3.scaleLinear().range([HEIGHT, 0]).domain([0, vis.data.length]);

    // Set up the binning parameters for the histogram
    const nbins = vis.data.length;
    const histogram = d3
      .bin()
      .value(function (d) {
        return d.Value;
      })
      .domain(x.domain())
      .thresholds(x.ticks(nbins));

    // Compute the histogram
    const bins = histogram(vis.data);

    //g container for each bin
    let binContainer = vis.svg.selectAll('.gBin').data(bins);

    binContainer.exit().remove();

    let binContainerEnter = binContainer
      .enter()
      .append('g')
      .attr('class', 'gBin')
      .attr('transform', (d) => `translate(${x(d.x0)}, ${HEIGHT})`);

    //need to populate the bin containers with data the first time
    binContainerEnter
      .selectAll('circle')
      .data((d) =>
        d.map((p, i) => {
          return {
            idx: i,
            name: p.Name,
            value: p.Value,
            radius: (x(d.x1) - x(d.x0)) / 2,
          };
        })
      )
      .enter()
      .append('circle')
      .attr('class', 'enter')
      .attr('cx', 0) //g element already at correct x pos
      .attr('cy', function (d) {
        return -d.idx * 2 * d.radius - d.radius;
      })
      .attr('r', 0)
      .on('mouseover', tooltipOn)
      .on('mouseout', tooltipOff)
      .transition()
      .duration(500)
      .attr('r', function (d) {
        return d.length == 0 ? 0 : d.radius;
      });

    binContainerEnter
      .merge(binContainer)
      .attr('transform', (d) => `translate(${x(d.x0)}, ${HEIGHT})`);

    //enter/update/exit for circles, inside each container
    let dots = binContainer.selectAll('circle').data((d) =>
      d.map((p, i) => {
        return {
          idx: i,
          name: p.Name,
          value: p.Value,
          radius: (x(d.x1) - x(d.x0)) / 2,
        };
      })
    );

    //EXIT old elements not present in data
    dots.exit().attr('class', 'exit').transition(t).attr('r', 0).remove();

    //UPDATE old elements present in new data.
    dots.attr('class', 'update');

    //ENTER new elements present in new data.
    dots
      .enter()
      .append('circle')
      .attr('class', 'enter')
      .attr('cx', 0) //g element already at correct x pos
      .attr('cy', function (d) {
        return -d.idx * 2 * d.radius - d.radius;
      })
      .attr('r', 0)
      .merge(dots)
      .on('mouseover', tooltipOn)
      .on('mouseout', tooltipOff)
      .transition()
      .duration(500)
      .attr('r', function (d) {
        return d.length == 0 ? 0 : d.radius;
      });

    function tooltipOn(event, d) {
      //x position of parent g element
      let gParent = d3.select(this.parentElement);
      let translateValue = gParent.attr('transform');

      let gX = translateValue.split(',')[0].split('(')[1];
      let gY = HEIGHT + (+d3.select(this).attr('cy') - 50);

      d3.select(this).classed('selected', true);
      tooltip.transition().duration(200).style('opacity', 0.9);
      tooltip
        .html(d.name + '<br/> (' + d.value + ')')
        .style('left', gX + 'px')
        .style('top', gY + 'px');
    } //tooltipOn

    function tooltipOff(event, d) {
      d3.select(this).classed('selected', false);
      tooltip.transition().duration(500).style('opacity', 0);
    } //tooltipOff
  }
}
