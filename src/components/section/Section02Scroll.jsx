import React, { Component, useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';

import FoodGlobalChart from '../charts/FoodGlobalChart';

function Section02Scroll() {
  const [steps, setSteps] = useState(null);
  const [direction, setDirection] = useState(null);
  const [progress, setProgress] = useState(null);

  const text = {
    header: `Food security and migration intention.`,
    main: '',
  };

  const onStepEnter = ({ data, entry, direction }) => {
    setSteps(data);
    setDirection(direction);
  };

  const onStepExit = () => {};

  const onStepProgress = ({ progress }) => {
    setProgress(progress);
  };

  return (
    <div className="section scroll">
      <div className="main ">
        <div className="main__graphic">
          <div className="scroll-chart-content-container">
            <div className="title-container">
              <p className="chart-title">
                <span className="red">High Food Insecurity</span> in El
                Salvador, Guatemala, and Honduras
              </p>
              {steps > 1 && (
                <div className="legend-container">
                  <div className="legend">
                    <div className="legend-block dot no"></div>
                    <p className="no">Moderate Hunger</p>
                  </div>
                  <div className="legend">
                    <div className="legend-block dot yes"></div>
                    <p className="yes">Severe Hunger</p>
                  </div>
                </div>
              )}
            </div>
            <FoodGlobalChart steps={steps} direction={direction} />
          </div>
        </div>
        <div className="scroller">
          <Scrollama
            onStepEnter={onStepEnter}
            onStepExit={onStepExit}
            progress
            onStepProgress={onStepProgress}
            offset="0.5"
            // debug
          >
            <Step data={1} value={1}>
              <div className="step">
                <h2>Gap Between Countries</h2>
                <p>
                  In the Northern Triangle Regions,{' '}
                  <span className="red">more than 13.8 percent</span> people are
                  likely to experience severe hunger, compared to the United
                  States <span className="blue"> less than 2 percent</span>{' '}
                  people are facing similar difficulty.
                </p>
              </div>
            </Step>

            <Step data={2} key={2}>
              <div className="step">
                <h2>Severe Food Insecurity</h2>
                <p>
                  In the Northern Triangle Regions,{' '}
                  <span className="red">more than 45.6 percent</span> people are
                  likely to experience some level of hunger, compared to the
                  United States{' '}
                  <span className="blue">less than 1 percent</span> people are
                  facing similar difficulty.
                </p>
              </div>
            </Step>

            <Step data={3} key={3}>
              <div className="step">
                <h2>What does it mean?</h2>
                <p>
                  Food insecurity is an issue in the Northern Triangle area.
                  This can be <span className="blue"> a driving factor</span>{' '}
                  for people to migrate to countries which are more food secure
                  like the US.
                </p>
                <br />
                <p>
                  We further explored the survey data to study the relationship
                  between <span className="red"> migration</span> and{' '}
                  <span className="red">food insecurity </span>.
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

export default Section02Scroll;
