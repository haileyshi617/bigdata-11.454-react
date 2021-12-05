import React, { Component, useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import CardScroll from '../ui/CardScroll';
import SurveyChart from '../charts/SurveyChart';
// import CardScroll from '../ui/CardScroll';

function Section03Scroll() {
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

  const myelement =
    steps == 2 ? (
      <p className="chart-title grey">
        Survey data, <span className="red">food security</span>, Migration
        Intension
      </p>
    ) : steps >= 3 ? (
      <p className="chart-title grey">
        Survey data, food security, <span className="red">Migration Intension</span>
      </p>
    ) : (
      <p className="chart-title grey">
        <span className="red">Survey data</span>, food security, Migration
        Intension
      </p>
    );

  return (
    <div>
      <div className="main">
        <div className="main__graphic">
          <div className="scroll-chart-content-container">
            <div className="title-container tall">{myelement}</div>
          </div>
          <div className="chart-wrapper">
            <SurveyChart steps={steps} className="survey" />
          </div>
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
                <h2>4,498 Survey response</h2>
                <p>
                  In April-May 2021, the World Food Programme conducted a
                  face-to-face household survey of{' '}
                  <span className="red">4,498 responses</span> in El Salvador,
                  Guatemala, and Honduras.
                </p>
                {/* <p>{Math.round(progress * 1000) / 10 + '%'}</p> */}
              </div>
            </Step>
            <Step data={2} key={2}>
              <div className="step">
                <h2>The majority are suffering from food insecurity</h2>
                <p>
                  In terms of <span className="red">food insecurity level</span>
                  , the participants are classified into{' '}
                  <span className="blue"> four groups</span> based on CARI food
                  security indicators given from WFP.
                </p>
                {/* <p>{Math.round(progress * 1000) / 10 + '%'}</p> */}
              </div>
            </Step>
            <Step data={3} key={3}>
              <div className="step">
                <h2>Around half have migration desire</h2>
                <p>
                  Around <span className="blue">half of household</span>{' '}
                  respondents indicated a desire to migrate, but{' '}
                  <span className="red">only 6% are making plans</span> to do
                  so.
                </p>
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

export default Section03Scroll;
