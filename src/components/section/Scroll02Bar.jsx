import React, { Component, useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';

import CardSection from '../ui/CardSection';
import GridChartWrapper from '../charts/GridChartWrapper';

function Scroll02Bar() {
  const [steps, setSteps] = useState(null);
  const [progress, setProgress] = useState(null);

  const text = {
    header: `Food security and migration intention.`,
    main: '',
  };

  const onStepEnter = ({ data, entry, direction }) => {
    setSteps(data);
  };

  const onStepProgress = ({ progress }) => {
    setProgress(progress);
  };

  return (
    <div>
      <div className="main ">
        <div className="main__graphic">
          <CardSection header={text.header} main={text.main} />
          <GridChartWrapper />
        </div>
        <div className="scroller no-hover">
          <Scrollama
            onStepEnter={onStepEnter}
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

export default Scroll02Bar;
