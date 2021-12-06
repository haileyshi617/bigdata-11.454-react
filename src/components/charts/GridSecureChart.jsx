import * as d3 from 'd3';
import dataSrc_int from '../../data/food-secure-mig-int.csv';
import dataSrc_prep from '../../data/food-secure-mig-prep.csv';

/* ---------------------------------- SETUP --------------------------------- */
// CANVAS SETUP
const MARGIN = { TOP: 0, BOTTOM: 0, LEFT: 0, RIGHT: 0 };
const WIDTH = window.innerWidth - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = window.innerWidth / 16 - MARGIN.TOP - MARGIN.BOTTOM;

// GRID SETUP
const NCOL = 80;
const NROW = { INTENTION: 5, PREPARATION: 5 };

// RENDERING SETUP
const COLOR_GRAY = '#efefef';
const COLOR_INTENTION = {
  NO: '#efefef',
  YES: '#ffe3e0',
};
const COLOR_PREPARATION = {
  PLAN_NO_PREP: '#ffe3e0',
  PREP_NO_ACTION: '#ad2e24',
  ACTION: '#540804',
};

// LABELS
const L_INT = { YES: '44%', NO: '56%' };
const L_PREP = { L1: '9%', L2: '10%', L3: '80%' };

/* -------------------------- FUNCTION TO DRAW GRID ------------------------- */
function setGridData(visData, nrow) {
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
    // iterate for cells/rows inside cols
    for (let row = 0; row < nrow; row++) {
      data.push({
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

/* --------------------------- CLASS CONSTRUCTION --------------------------- */
export default class GirdSecureChart {
  constructor(element, steps, direction) {
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
      .attr('preserveAspectRatio', 'xMidYMin meet')
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    vis.xAxisGroup = vis.svg
      .append('g')
      .attr('id', 'x-axis')
      .attr('transform', `translate(0, ${HEIGHT})`);

    vis.yAxisGroup = vis.svg.append('g').attr('id', 'y-axis');

    // LOAD THE DATA
    Promise.all([d3.csv(dataSrc_int), d3.csv(dataSrc_prep)]).then(
      (datasets) => {
        vis.intention = datasets[0];
        vis.preparation = datasets[1];

        vis.update(steps, direction);
      }
    );
  }

  update(steps, direction) {
    const vis = this;

    // console.log(`CHART UPDATE`);
    // console.log(steps);
    // console.log(direction);

    vis.data = vis.intention;
    vis.gridData = setGridData(vis.data, NROW.INTENTION);

    // SET UP DATA BASED ON STEPS AND DIRECTION
    if (!steps || steps === 1 || steps === 2) {
      vis.data = vis.intention;
      vis.gridData = setGridData(vis.data, NROW.INTENTION);
    } else {
      vis.data = vis.preparation;
      vis.gridData = setGridData(vis.data, NROW.PREPARATION);
    }
    // console.log(vis.gridData);

    // Remove All
    vis.svg.selectAll('.grid').remove();

    // DATA JOIN
    const grid = vis.svg.selectAll('.grid').data(vis.gridData);

    // Exit
    grid.exit().remove();

    // Enter
    grid
      .enter()
      .append('rect')
      .attr('class', 'grid')
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
      .style('fill', COLOR_GRAY)
      .style('stroke', '#fff');

    // UPDATE
    const square = vis.svg.selectAll('rect');

    if (direction === 'down') {
      if (steps === 1) {
        square
          .transition()
          .ease(d3.easeCubicIn)
          .duration(300)
          .style('fill', (d) =>
            d.visData.mig_int_global === '0'
              ? COLOR_INTENTION.NO
              : COLOR_INTENTION.YES
          );
      }
      if (steps === 2) {
        square
          .transition()
          .ease(d3.easeCubicIn)
          .duration(300)
          .style('fill', (d) => {
            if (parseInt(d.visData.mig_int_global) === 0) {
              return COLOR_INTENTION.NO;
            } else {
              if (parseInt(d.visData.mig_plan_global) === 0) {
                return COLOR_PREPARATION.PLAN_NO_PREP;
              } else if (parseInt(d.visData.mig_prep_global) === 0) {
                return COLOR_PREPARATION.PREP_NO_ACTION;
              } else {
                return COLOR_PREPARATION.ACTION;
              }
            }
          });
      }

      if (steps === 3) {
        square.style('fill', (d) => {
          if (parseInt(d.visData.mig_plan_global) === 0) {
            return COLOR_PREPARATION.PLAN_NO_PREP;
          } else if (parseInt(d.visData.mig_prep_global) === 0) {
            return COLOR_PREPARATION.PREP_NO_ACTION;
          } else {
            return COLOR_PREPARATION.ACTION;
          }
        });
      }
    }

    if (direction === 'up') {
      if (steps === 1) {
        square
          .transition()
          .ease(d3.easeCubicIn)
          .duration(300)
          .style('fill', (d) =>
            parseInt(d.visData.mig_int_global) === 0
              ? COLOR_INTENTION.NO
              : COLOR_INTENTION.YES
          );
      }

      if (steps === 2) {
        square.style('fill', (d) => {
          if (parseInt(d.visData.mig_int_global) === 0) {
            return COLOR_INTENTION.NO;
          } else {
            if (parseInt(d.visData.mig_plan_global) === 0) {
              return COLOR_PREPARATION.PLAN_NO_PREP;
            } else if (parseInt(d.visData.mig_prep_global) === 0) {
              return COLOR_PREPARATION.PREP_NO_ACTION;
            } else {
              return COLOR_PREPARATION.ACTION;
            }
          }
        });
      }
      if (steps === 3) {
        square.style('fill', (d) => {
          if (parseInt(d.visData.mig_plan_global) === 0) {
            return COLOR_PREPARATION.PLAN_NO_PREP;
          } else if (parseInt(d.visData.mig_prep_global) === 0) {
            return COLOR_PREPARATION.PREP_NO_ACTION;
          } else {
            return COLOR_PREPARATION.ACTION;
          }
        });
      }
    }
    /* ------------------------------- MOUSE EVENT ------------------------------ */
    const tooltip = d3.select('#tooltip-grid');

    function mouseover(event, d) {
      const dataOrg = d.visData;
      const result = {
        country: '',
        neighborhood: '',
        ruralUrban: '',
        age: '',
        sex: '',
        familySize: '',
      };

      // country
      if (dataOrg.country === 'GT') {
        result.country = 'Guatemala';
      } else if (dataOrg.country === 'SLV') {
        result.country = 'El Salvador';
      } else {
        result.country = 'Honduras';
      }
      // neighborhood
      result.neighborhood = dataOrg.neighborhood;

      // ? rural urban
      dataOrg.ruralUrban === '1'
        ? (result.rural_urban = 'urban')
        : (result.rural_urban = 'rural');

      // ? sex
      dataOrg.sex === '1' ? (result.sex = 'Male') : (result.sex = 'Female');

      // age
      result.age = dataOrg.age;

      // family size
      result.familySize = dataOrg.family_size;

      tooltip
        .style('left', () => {
          if (event.clientX - window.innerWidth / 2 > 0) {
            return `${event.clientX - window.innerWidth / 5}px`;
          }

          return `${event.clientX}px`;
        })
        .style('top', () => {
          // if (event.clientY - window.innerHeight / 2 > 0) {
          //   return `${event.clientY - window.innerHeight / 6}px`;
          // }

          return `${event.clientY - window.innerHeight / 1.8}px`;
        })
        .html(
          `<p class="header"><span>${result.sex}, ${result.age}</span></p>
        <p> Living in ${result.rural_urban} area in ${result.country}, with a family size of ${result.familySize}.</p>`
        )
        .classed('hidden', false);
    }

    function mouseout(event, d) {
      tooltip.classed('hidden', true);
    }
  }
}
