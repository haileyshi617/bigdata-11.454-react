import React, { Component, useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import CardScroll from '../ui/CardScroll';
import SurveyChart from '../charts/SurveyChart';
// import CardScroll from '../ui/CardScroll';

function Scroll01Dot() {
  const [steps, setSteps] = useState(null);
  const [progress, setProgress] = useState(null);
  const [direction, setDirection] = useState(null);

  const onStepEnter = ({ data, entry, direction }) => {
    setDirection(direction);
    setSteps(data);
  };

  const onStepProgress = ({ progress }) => {
    setProgress(progress);
  };

  return (
    <div>
      <div className="main">
        <div className="main__graphic">
          <SurveyChart steps={steps} className="survey" />
        </div>
        <div className="scroller">
          <Scrollama
            onStepEnter={onStepEnter}
            progress
            onStepProgress={onStepProgress}
            offset="0.8"
            // debug
          >
            <Step data={1} value={1}>
              <div className="step">
                <h2>4996 Survey response</h2>
                <p>
                  In an ??-month investigation, the World Food Programme (WFP)
                  has conducted a survey of civilians in the Northern Triangle
                  region, compiling a database of 4996 responses with
                  information on a number of dimensions.
                </p>
                {/* <p>{Math.round(progress * 1000) / 10 + '%'}</p> */}
              </div>
            </Step>
            <Step data={2} key={2}>
              <div className="step">
                <h2>The majority are suffering from food insecurity</h2>
                <p>
                  In terms of
                  <span className="red"> food insecurity level</span>, the
                  participants are classified into 4 groups based on CARI food
                  security indicators given from WFP.
                </p>
                {/* <p>{Math.round(progress * 1000) / 10 + '%'}</p> */}
              </div>
            </Step>
            <Step data={3} key={3}>
              <div className="step">
                <h2>Around half have migration desire</h2>
                <p>Of all the participants, 43% have migration desire.</p>
              </div>
            </Step>
            <Step data={4} key={4}>
              <div className="step"></div>
            </Step>
          </Scrollama>
        </div>
      </div>
    </div>
  );
}

export default Scroll01Dot;
