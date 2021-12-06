import CardSection from '../ui/CardSection';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Section05Pie = () => {
  const section05cardRef = useRef(null);

  useEffect(() => {
    gsap.to('#section05cardRef', {
      x: 100,
      duration: 1,
      ease: 'ease',

      scrollTrigger: {
        trigger: '#section05cardRef',
        markers: false,
        start: 'top center',
      },
    });
  }, []);

  const text = {
    header: `What is relationship between migration plan and the economic pressure on food `,
    main: `For those who suffer food insecurity tend to make solid plan and preparation to migrate than those don’t have food issue. 
    To answer this, we need to study the how many people have to work to ensure food security and understand how economic status impact migration plan and action. 
    `,
  };

  // TODO: Text change

  return (
    <div className="section regular center">
      <div className="content-container">
        <div
          className="section-card"
          id="section05cardRef"
          ref={section05cardRef}
        >
          <h1>
            How <span className="red">economic status </span>impact migration
            plan and action?
          </h1>
          <p>
            To confirm better off people have are less actions on migration, we
            need to study the how many people have to work to ensure food
            security to better understand how economic status impact migration
            plan and action.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section05Pie;
