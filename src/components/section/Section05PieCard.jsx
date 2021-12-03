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

  return (
    <div className="section" id="section05cardRef" ref={section05cardRef}>
      <CardSection header={text.header} main={text.main} />
    </div>
  );
};

export default Section05Pie;
