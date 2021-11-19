import * as d3 from 'd3';
import data from '../../data/sliced1000.csv';

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 30, RIGHT: 10 };
const WIDTH = 1000 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 200 - MARGIN.TOP - MARGIN.BOTTOM;
const NCOL = 100;
const NROW = 10;

export default class GridChart {
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

    function gridData(visData) {
      let data = new Array();
      let xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
      let ypos = 1;
      const width = WIDTH / NCOL;
      const height = width;

      // keep track of data to collect
      let i = 0;

      // iterate for rows
      for (let row = 0; row < NROW; row++) {
        data.push(new Array());

        // iterate for cells/columns inside rows
        for (let column = 0; column < NCOL; column++) {
          data[row].push({
            x: xpos,
            y: ypos,
            width: width,
            height: height,
            visData: visData[i],
          });
          // increment the x position
          xpos += width;
          i++;
        }
        // reset the x position after a row is complete
        xpos = 1;
        // increment the y position for the next row
        ypos += height;
      }
      return data;
    }

    // MOUSE EVENT
    const mouseover = function (event, d) {
      d3
        .select('#tooltip')
        .style('left', event.pageX - 100 + 'px')
        .style('top', event.pageY - 100 + 'px')
        .html(`<p>Interviewee ID: ${d.visData._id} </p>
          <p> cari: ${d.visData.cari} </p>
          <p> CARI: ${d.visData.CARI} </p>`);
      d3.select('#tooltip').classed('hidden', false);
    };

    const mouseout = function (event, d) {
      d3.select('#tooltip').classed('hidden', true);
    };

    var gridData = gridData(vis.data);

    // Log the data to the console for quick debugging
    console.log(gridData);

    var grid = d3
      .select('.grid')
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

    var row = grid
      .selectAll('.row')
      .data(gridData)
      .enter()
      .append('g')
      .attr('class', 'row');

    var column = row
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
      .style('fill', (d) =>
        d.visData.mig_categ === '0.0' ? '#b0d9d5' : '#eb5832'
      )
      .style('stroke', '#fff')
      .on('mouseover', mouseover)
      .on('mouseout', mouseout);
  }
}
