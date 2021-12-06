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

  let legend;
  if (steps === 1) {
    legend = (
      <div className="legend-container">
        <div className="legend">
          <div className="legend-block mig-yes"></div>
          <p className="mig-yes">Household answered "Yes"</p>
        </div>
        <div className="legend">
          <div className="legend-block mig-no"></div>
          <p className="mig-no">Household answered "No"</p>
        </div>
      </div>
    );
  } else if (steps === 2) {
    legend = (
      <div className="legend-container ">
        <div className="legend">
          <div className="legend-block mig-scale-3"></div>
          <p className="mig-scale-3">Household has plan and preparation</p>
        </div>
        <div className="legend">
          <div className="legend-block mig-scale-2"></div>
          <p className="mig-scale-2">Household has plan but no preparation</p>
        </div>
        <div className="legend">
          <div className="legend-block mig-scale-1"></div>
          <p className="mig-scale-1">
            Household wants to migrate but has no plan
          </p>
        </div>
        <div className="legend">
          <div className="legend-block mig-no"></div>
          <p className="mig-no">Household does not want to migrate</p>
        </div>
      </div>
    );
  } else if (steps === 3) {
    legend = (
      <div className="legend-container">
        <div className="legend">
          <div className="legend-block mig-scale-3"></div>
          <p className="mig-scale-3">Household has plan and preparation</p>
        </div>
        <div className="legend">
          <div className="legend-block mig-scale-2"></div>
          <p className="mig-scale-2">Household has plan but no preparation</p>
        </div>
        <div className="legend">
          <div className="legend-block mig-scale-1"></div>
          <p className="mig-scale-1">
            Household wants to migrate but has no plan
          </p>
        </div>
      </div>
    );
  } else {
    legend = <div></div>;
  }

  return (
    <div className="section scroll">
      <div className="main ">
        <div className="main__graphic">
          <div className="scroll-chart-content-container">
            <div className="title-container tall">
              <p className="chart-title">
                Food security and migration intention.
              </p>
              {legend}
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
                <h2> Higher migration desire?</h2>
                <p>
                  <span className="red">44% of the food secure</span> have a
                  desire to migrated, compared with{' '}
                  <span className="red">
                    37% of those who are food insecure
                  </span>
                  . Does this mean food security will actually drive people to
                  migrate?
                </p>
                <br />
                <p>
                  However it takes{' '}
                  <span className="blue">more than just desire</span> to
                  migrate.
                </p>
              </div>
            </Step>

            <Step data={2} key={2}>
              <div className="step">
                <h2>Desire does not equal to action.</h2>
                <p>
                  Even though food secure people are more likely to say they
                  want to migrate, it is important to consider{' '}
                  <span className="red">
                    how serious those people are for the action of migration
                  </span>
                  .
                </p>
                <br />
                <p>
                  Thus, we classified those who answered yes to migrate to{' '}
                  <span className="blue">three groups</span> based on the level
                  of preparation they have for migration in the near future.
                </p>
              </div>
            </Step>

            <Step data={3} key={3}>
              <div className="step">
                <h2>
                  The food insecure are more likely to take actual action.
                </h2>
                <p>
                  The ratio of having the intention to migrate and having plans
                  or preparations is:
                  <br />
                  <li>
                    <span className="blue">14% among the food secure</span>
                  </li>
                  <li>
                    <span className="red">19% among the food insecure. </span>
                  </li>
                </p>
                <br />
                <p>
                  Given <span className="red">the food insecure</span> are
                  already struggling with basic needs such as food, their plans
                  to migrate are more likely to be{' '}
                  <span className="red">out of desperation</span> rather than{' '}
                  <span className="blue">by choice </span>.
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
