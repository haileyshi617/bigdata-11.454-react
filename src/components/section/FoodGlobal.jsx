import React from 'react';
import * as d3 from "d3";

const FoodGlobal = () => {
  // const margin = {top: 10, right: 30, bottom: 30, left: 30},
  //       width = 460 - margin.left - margin.right,
  //       height = 500 - margin.top - margin.bottom;


  // const svg = d3.select("#my_dataviz")
  //   .append("svg")
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //   .append("g")
  //     .attr("transform", `translate(${margin.left}, ${margin.top})`);

  d3.csv('../../data/food-global.csv').then(
    function(data){
      console.log(data)
    }
  )

  return (
    <div className="section-break">
      <h1><span className="red">Food security</span> of the Northern Triangle Region in the global context.</h1>
    </div>
  );
}

export default FoodGlobal;
