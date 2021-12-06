import MapChart from '../charts/MapChart';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Power3 } from 'gsap';

import { ScrollTrigger, timeline } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section01Map = () => {
  // section card animation
  const section01cardRef = useRef(null);

  useEffect(() => {
    gsap.to('#section01cardRef', {
      x: 100,
      duration: 1,
      ease: 'ease',

      scrollTrigger: {
        trigger: '#section01cardRef',
        markers: false,
        start: 'top center',
      },
    });
  }, []);

  // map animation
  const mapRef = useRef(null);

  useEffect(() => {
    gsap.to('#mapRef', {
      duration: 5,
      opacity: 1,
      ease: Power3.easeOut,

      scrollTrigger: {
        trigger: '#mapRef',
        markers: false,
        start: 'top center',
        end: 'bottom 0px',
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="section regular center">
      <div className="map-container" ref={mapRef} id="mapRef">
        <MapChart />
      </div>

      <div className="content-container">
        <div
          className="section-card no-hover"
          id="section01cardRef"
          ref={section01cardRef}
        >
          <h1>
            <span className="red">Migration status</span>
            <br /> in the Northern Triangle Region
          </h1>
          <p>
            Migration from Central America to the U.S. began rising notably in
            the 1980s, and continued to increase in subsequent decades.
          </p>
          <br />
          <p>
            More recently, the number of immigrants{' '}
            <span>–– from the three Northern Triangle nations rose by 25%</span>{' '}
            between 2007 and 2015. During that same period, the immigrant
            population from Mexico, the largest birth country for U.S.
            immigrants, declined 6%.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section01Map;
