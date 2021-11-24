import * as React from 'react';
import CardSection from '../ui/CardSection';
import MapChart from '../charts/MapChart';
import { ScrollAnimation } from 'animate-on-scroll';

const Section01Map = () => {
  return (
    <div className="section migration">
      <MapChart />
      <div className="section-card  no-hover">
        <h1>
          <span className="red">Migration status</span>
          <br /> in the Northern Triangle Region
        </h1>
        <p>
          Migration from Central America to the U.S. began rising notably in the
          1980s, and continued to increase in subsequent decades.
        </p>
        <br />
        <p>
          More recently, the number of immigrants –
          <span>lawful and unauthorized</span> – from the three Northern
          Triangle nations <span>rose by 25%</span> between 2007 and 2015.
          During that same period, the immigrant population from Mexico, the
          largest birth country for U.S. immigrants, declined 6%.
        </p>
      </div>
    </div>
  );
};

export default Section01Map;
