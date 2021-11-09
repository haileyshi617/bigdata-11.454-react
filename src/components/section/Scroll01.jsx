import React, { Component } from 'react';
import { Scrollama, Step } from 'react-scrollama';

class Scroll01 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: 'https://images.unsplash.com/photo-1636335287146-a22df22cafe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80',
      steps: [1, 2, 3, 4],
      progress: 0,
      img: [
        'https://images.unsplash.com/photo-1636335287146-a22df22cafe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80',
        'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1474&q=80',
        'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1473283147055-e39c51463929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1473283147055-e39c51463929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
      
      ]
    };
  }
  componentDidMount() {
    const img = document.getElementById('myImg');
    img.src = this.state.init
  }

  onStepEnter = (e) => {
    const { data, entry, direction } = e    
    const img = document.getElementById('myImg');
    img.src = this.state.img[data]
    this.setState({ data });
  };

  onStepExit = ({ direction, data }) => {
    if (direction === 'up' && data === this.state.steps[0]) {
      const img = document.getElementById('myImg');
      this.setState({ init: this.state.img[0] });
      img.src = this.state.init
    }
  };

  onStepProgress = ({ progress }) => {
    this.setState({ progress });
  };

  render() {
    return (
      <div>
        <div className='main'>
          <div className='main__graphic'>
            <img id="myImg"/>
          </div>
          <div className='scroller'>
            <Scrollama
              onStepEnter={this.onStepEnter}
              onStepExit={this.onStepExit}
              progress 
              onStepProgress={this.onStepProgress}
              offset="0.5"
              debug
            >
              {this.state.steps.map((value) => {
                const isVisible = value === this.state.data;
                const visibility = isVisible ? 'visible' : 'hidden';
                return (
                  <Step data={value} key={value}>
                    <div className='step'>
                      <h2>I. Migration Desire</h2>
                      <p>The probability of experiencing moderate or severe food insecurity varies widely across countries—from <span className="red">less than 2 percent</span> in Switzerland to <span className="blue">85 percent</span> in Liberia.
                      </p>
                      <p style={{ visibility }}>
                        {Math.round(this.state.progress * 1000) / 10 + '%'}
                      </p>
                    </div>
                  </Step>
                );
              })}
            </Scrollama>
          </div>
        </div>
      </div>
    );
  }
}

export default Scroll01;
