import * as d3 from 'd3';
import React, { useRef, useState, useEffect } from 'react'

const SurveyChart = ({ steps }) => {
    const tooltipRef = React.useRef(null);
    const svgRef = React.useRef(null);

    React.useEffect(() => {
        console.log('survey', steps)


    }, [steps])

    return (
        <>
            <div className="survey-tooltip hidden" ref={tooltipRef}></div>
            <div className="survey-chart" ref={svgRef}></div>
        </>
    )
}

export default SurveyChart