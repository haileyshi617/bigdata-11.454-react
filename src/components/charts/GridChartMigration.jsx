import * as d3 from 'd3';
import data from '../../data/sliced1000.csv';

// CANVAS SETUP
const MARGIN = { TOP: 0, BOTTOM: 0, LEFT: 0, RIGHT: 0 };
const WIDTH = 960 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = window.innerHeight - MARGIN.TOP - MARGIN.BOTTOM;

// GRID SETUP
const NCOL = 100;
const NROW = 10;

// RENDERING SETUP
const COLOR = {
  MIGRATE_NO: '#6bbaad',
  MIGRATE_YES: '#eb5832',
  GRAY: '#e0e0e0',
};

export default class GridChart {
  constructor(element) {
    const vis = this;

    // CANVAS SETUP
    vis.svg = d3
      .select(element)
      .append('svg')
      .attr(
        'viewBox',
        `0 0 ${WIDTH + MARGIN.LEFT + MARGIN.RIGHT} ${
          HEIGHT + MARGIN.TOP + MARGIN.BOTTOM
        }`
      )
      .attr('preserveAspectRatio', 'xMinYMin meet')
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

    function setGridData(visData) {
      //starting xpos and ypos at 1 so the stroke will show when we make the grid below
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
    }

    // MOUSE EVENT
    const tooltip = d3.select('#tooltip-grid');

    const mouseover = function (event, d) {
      tooltip
        .style('left', `${event.clientX}px`)
        .style('top', `${event.clientY * 0.1}px`)
        .html(
          `<p class="header"><span>${d.visData.sex}, ${d.visData.age}</span></p>
          <p> Living in ${d.visData.rural_urban} area in ${d.visData.country}, with a family size of ${d.visData.fam_size} which is ${d.visData.fam_type} </p>`
        )
        .classed('hidden', false);
    };

    const mouseout = function (event, d) {
      tooltip.classed('hidden', true);
    };

    const gridData = setGridData(vis.data);

    // Log the data to the console for quick debugging
    // console.log(gridData);

    const grid = d3
      .select('.grid')
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

    const row = grid
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
      .style('fill', COLOR.GRAY);

    column
      .transition()
      .ease(d3.easeCubicIn)
      .duration(3000)
      .style('fill', (d) =>
        d.visData.mig_categ === '0.0' ? COLOR.MIGRATE_NO : COLOR.MIGRATE_YES
      )
      .style('stroke', '#fff');
  }
}
