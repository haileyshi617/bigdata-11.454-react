import React, { Component, useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';

import GridSecureChartWrapper from '../charts/GridSecureChartWrapper';
import GridInsecureChartWrapper from '../charts/GridInsecureChartWrapper';

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
              {steps === 1 && (
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

              {steps >= 2 && (
                <div className="legend-container">
                  <div className="legend">
                    <div className="legend-block yes mig-scale-1"></div>
                    <p className="mig-scale-1">
                      Household wants to migrate but no plan
                    </p>
                  </div>
                  <div className="legend">
                    <div className="legend-block no mig-scale-2"></div>
                    <p className="mig-scale-2">
                      Household has plan but no preparation
                    </p>
                  </div>
                  <div className="legend">
                    <div className="legend-block no mig-scale-3"></div>
                    <p className="mig-scale-3">
                      Household has plan and preparation
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="chart-wrapper">
              <GridSecureChartWrapper steps={steps} direction={direction} />
              <GridInsecureChartWrapper steps={steps} direction={direction} />
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
                <h2>The food secure have higher desire to migrate.</h2>
                <p>
                  Does this mean food security will actually drive people to
                  migrate? Further research of the data tells a different story.
                </p>
              </div>
            </Step>

            <Step data={2} key={2}>
              <div className="step">
                <h2>Desire does not equal to action.</h2>
                <p>
                  Even though food secure people are more likely to say they
                  want to migrate, when it comes to migration, it takes{' '}
                  <span className="red">actual planning and preparation</span>{' '}
                  to actualize the action.
                </p>
              </div>
            </Step>

            <Step data={3} key={3}>
              <div className="step">
                <h2>
                  The food insecure are more likely to take actual action.
                </h2>
                <p>
                  Given the food insecure people are already struggling with
                  basic needs such as food, their plans to migrate are more
                  likely to be <span className="red">out of desperation </span>
                  rather than <span className="blue">by choice </span>.
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

export default Section04Scroll;
