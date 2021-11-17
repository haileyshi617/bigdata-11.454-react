import * as d3 from 'd3';

const dataSrc = '../../data/food-global.csv';

export default class GlobalChart {
    constructor(element) {
        d3.csv("src/data/food-global.csv").then(data => console.log(data))
    }
}