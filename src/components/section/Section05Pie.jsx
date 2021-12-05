import React, { memo } from 'react';
import DonutChart from '../charts/DonutChart';

const Square = ({ color, width }) => (
  <div style={{ backgroundColor: color, width: width, height: width }}></div>
);

const Section05Pie = () => {
  return (
    <div className="section regular center">
      <div className="donut-container">
        <div className="donut-chart-part">
          <div className="top-legend">
            <Square color="#DFBFBF" width={18} />
            <span>Have to work for food but NO PLAN to migrate</span>
          </div>
          <div className="top-legend">
            <Square color="#CC0000" width={18} />
            <span>Have to work for food and HAVE PLAN to migrate</span>
          </div>
          <div className="main-content">
            <div className="donut-chart-wrapper">
              <p className="title">NO PLAN TO MIGRATE</p>
              <DonutChart
                dataArray={[
                  { name: 'a', value: 77 },
                  { name: 'b', value: 23 },
                ]}
                colorsArray={['#D9D9D9', '#DFBFBF']}
              />
              <div className="donut-chart-footer">
                <div className="bottom-legend">
                  <Square color="#D9D9D9" width={14} />
                  <span>NOT WORK FOR FOOD</span>
                </div>
                <div className="bottom-legend">
                  <Square color="#DFBFBF" width={14} />
                  <span>WORK FOR FOOD</span>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="donut-chart-wrapper">
              <p className="title">HAS PLAN TO MIGRATE</p>
              <DonutChart
                dataArray={[
                  { name: 'a', value: 68 },
                  { name: 'b', value: 32 },
                ]}
                colorsArray={['#D9D9D9', '#CC0000']}
              />
              <div className="donut-chart-footer">
                <div className="bottom-legend">
                  <Square color="#D9D9D9" width={14} />
                  <span>NOT WORK FOR FOOD</span>
                </div>
                <div className="bottom-legend">
                  <Square color="#CC0000" width={14} />
                  <span>WORK FOR FOOD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Section05Pie);
