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

  return (
    <div className="section regular center">
      <div className="content-container">
        <div
          className="section-card"
          id="section04cardRef"
          ref={section04cardRef}
        >
          <h1>
            What is the relationship between food insecurity and{' '}
            <span className="red">
              migration's intention, plan and preparation?
            </span>
          </h1>

          <p>
            Instead of asking only the desire to migrate, we look into more
            detailed aspects of migration other than intension, such as plan and
            preparation. These factors serve as a stronger indicator for the
            migration action. We explore the relationship of these factors with
            food security level.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section04GridCard;
