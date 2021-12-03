import CardSection from '../ui/CardSection';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Section04GridCard = () => {
  const section04cardRef = useRef(null);

  useEffect(() => {
    gsap.to('#section04cardRef', {
      x: 100,
      duration: 1,
      ease: 'ease',

      scrollTrigger: {
        trigger: '#section04cardRef',
        markers: false,
        start: 'top center',
      },
    });
  }, []);

  const text = {
    header: `Food security may have some impact on people's desire and action on migration. What kind of relationship could we see from this survey? `,
    main: `From the previous data, we can see a larger proportion of people suffering food insecurity. How many of these people may want to migrate as opposed of those who have adequate food? 
    `,
  };

  return (
    <div className="section" id="section04cardRef" ref={section04cardRef}>
      <CardSection header={text.header} main={text.main} />
    </div>
  );
};

export default Section04GridCard;
