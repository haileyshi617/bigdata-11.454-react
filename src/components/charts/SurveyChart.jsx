import * as d3 from 'd3';
import React, { useRef, useState, useEffect } from 'react'
import rawdata from '../../data/cari-mig.csv';


const SurveyChart = ({ steps }) => {
    const tooltipRef = React.useRef(null);
    const svgRef = React.useRef(null);
    const gRef = React.useRef(null);
    const [data, setData] = useState(null)

    //import data
    useEffect(() => {
        d3.csv(rawdata).then(data => {
            setData(data)
        })
    }, [])

    //d3 chart update according to steps
    let width = 932;
    let height = 932;

    const svg = d3.select(svgRef.current)
        .style("width", "100%")
        .style("height", "800px")
        .attr("text-anchor", "middle");

    useEffect(() => {
        if (data) {
            var nodes = d3.range(400).map(function (d) {
                return { radius: 6 }
            })

            const simulation = d3.forceSimulation(nodes)
                .force('charge', d3.forceManyBody().strength(5))
                .force('center', d3.forceCenter(width / 2, height / 2))
                .force('collision', d3.forceCollide().radius(function (d) {
                    return d.radius
                }))
                .on('tick', ticked);

            function ticked() {
                var u = svg
                    .selectAll('circle')
                    .data(nodes)
                    .join('circle')
                    .attr('r', function (d) {
                        return d.radius
                    })
                    .attr('cx', function (d) {
                        return d.x
                    })
                    .attr('cy', function (d) {
                        return d.y
                    })
            }
        }

    }, [steps, data])

    return (
        <>
            <div className="survey-tooltip hidden" ref={tooltipRef}></div>
            <div className="survey-chart" ref={svgRef}>
            </div>
        </>
    )
}

export default SurveyChart