import * as React from 'react';
import CardSection from '../ui/CardSection';
import MapWrapper from '../charts/MapWrapper';
import { ScrollAnimation } from 'animate-on-scroll';

const Section01Migration = () => {
  return (
    <div className="section migration">
      <MapWrapper />
      <div className="section-card no-hover">
        <h1>
          <span className="red">Migration status</span>
          <br /> in the Northern Triangle Region
        </h1>
        <p>
          Migration from Central America to the U.S. began rising notably in the
          1980s, and continued to increase in subsequent decades. More recently,
          the number of immigrants – lawful and unauthorized – from the three
          Northern Triangle nations rose by 25% between 2007 and 2015. During
          that same period, the immigrant population from Mexico, the largest
          birth country for U.S. immigrants, declined 6%.
        </p>
      </div>
    </div>
  );
};

export default Section01Migration;
