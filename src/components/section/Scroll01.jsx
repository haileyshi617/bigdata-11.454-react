import React, { Component, useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import CardScroll from '../ui/CardScroll';

function Scroll01() {
  const imgs = [
    'https://images.unsplash.com/photo-1636335287146-a22df22cafe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80',
    'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1474&q=80',
  ];

  const [steps, setSteps] = useState(null);
  const [progress, setProgress] = useState(null);
  const [img, setImg] = useState(imgs[0]);
  // const imgRef = React.useRef(img);

  const onStepEnter = ({ data, entry, direction }) => {
    setSteps(data);
    setImg(imgs[Math.min(data - 1, imgs.length - 1)]);
  };

  const onStepProgress = ({ progress }) => {
    setProgress(progress);
  };

  return (
    <div>
      <div className="main">
        <div className="main__graphic">
          <img src={img} id="myImg" />
          {/* <d3 class='a' step={steps}></d3> */}
        </div>
        <div className="scroller">
          <Scrollama
            onStepEnter={onStepEnter}
            progress
            onStepProgress={onStepProgress}
            offset="0.5"
          // debug
          >
            <Step data={1} value={1} >
              <div className='step'>
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
              <div className="step"></div>
            </Step>
          </Scrollama>
        </div>
      </div>
    </div>
  );
}

export default Scroll01;
