import React, { Component, useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';

import GridMigrationChart from '../charts/GridMigrationChart';

function Section04Scroll() {
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
    <div>
      <div className="main ">
        <div className="main__graphic">
          <div className="scroll-chart-content-container">
            <div className="title-container">
              <p className="chart-title">
                Food security and migration intention.
              </p>
              {steps > 1 && (
                <div className="legend-container">
                  <div className="legend">
                    <div className="legend-block yes"></div>
                    <p className="yes">Household answered "Yes"</p>
                  </div>
                  <div className="legend">
                    <div className="legend-block no"></div>
                    <p className="no">Household answered "No"</p>
                  </div>
                </div>
              )}
            </div>

            <div className="chart-wrapper">
              <div className="chart-container">
                <p>Food Secure Group</p>
                <div className="axis-container">
                  <small>0</small>
                  <small>100</small>
                  <small>200</small>
                  <small>300</small>
                  <small>400</small>
                </div>
                <GridMigrationChart steps={steps} direction={direction} />
              </div>

              <div className="chart-container">
                <p>Food Insecure Group</p>
                <div className="axis-container">
                  <small>0</small>
                  <small>100</small>
                  <small>200</small>
                  <small>300</small>
                  <small>400</small>
                </div>
                <GridMigrationChart steps={steps} direction={direction} />
              </div>
            </div>
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
                <h2>I. Migration Desire</h2>
                <p>
                  The probability of experiencing moderate or severe food
                  insecurity varies widely across countries—from{' '}
                  <span className="red">less than 2 percent</span> in
                  Switzerland to <span className="blue">85 percent</span> in
                  Liberia.
                </p>
                <p>{Math.round(progress * 1000) / 10 + '%'}</p>
              </div>
            </Step>

            <Step data={2} key={2}>
              <div className="step">
                <h2>II. Migration Preparation</h2>
                <p>
                  The probability of experiencing moderate or severe food
                  insecurity varies widely across countries—from less than 2
                  percent in Liberia.
                </p>
                <p>{Math.round(progress * 1000) / 10 + '%'}</p>
              </div>
            </Step>

            <Step data={3} key={3}>
              <div className="step">
                <h2>II. Migration Preparation</h2>
                <p>
                  The probability of experiencing moderate or severe food
                  insecurity varies widely across countries—from less than 2
                  percent in Liberia.
                </p>
                <p>{Math.round(progress * 1000) / 10 + '%'}</p>
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

export default Section04Scroll;
