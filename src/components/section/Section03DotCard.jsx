import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Section03DotCard = () => {
  const section03cardRef = useRef(null);

  useEffect(() => {
    gsap.to('#section03cardRef', {
      x: 100,
      duration: 1,
      ease: 'ease',

      scrollTrigger: {
        trigger: '#section03cardRef',
        markers: false,
        start: 'top center',
      },
    });
  }, []);

  return (
    <div className="section">
      <div
        className="section-card"
        id="section03cardRef"
        ref={section03cardRef}
      >
        <h1>
          Is food security <span className="red">a solution to</span>
          <br /> migration issue?
        </h1>
        <p>
          Since those three countries are having food security issues and
          contribute to a large proportion of migration in the US, it is
          tempting to say that maybe increasing food security is a solution to
          migration. However, the survey suggests otherwise.
        </p>
      </div>
    </div>
  );
};

export default Section03DotCard;
