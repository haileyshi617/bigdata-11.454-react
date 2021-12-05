// import { Transition, animated } from 'react-spring';
import React, { useState, useEffect, useRef } from 'react';

import Layout from './components/layout/Layout';
import Intro from './components/section/Intro';
import Outro from './components/section/Outro';

import Section01Map from './components/section/Section01Map';

import Section02Scroll from './components/section/Section02Scroll';

import Section03DotCard from './components/section/Section03DotCard';
import Section03Scroll from './components/section/Section03Scroll';

import Section04GridCard from './components/section/Section04GridCard';
import Section04Scroll from './components/section/Section04Scroll';

import Section05PieCard from './components/section/Section05PieCard';
import Section05Pie from './components/section/Section05Pie';
import Footer from './components/layout/Footer';

export default function App() {
  const ref = useRef(null);
  const [preloader, setPreload] = useState(true);

  // useLocoScroll(!preloader);

  useEffect(() => {
    if (!preloader && ref) {
      if (typeof window === 'undefined' || !window.document) {
        return;
      }
    }
  }, [preloader]);

  const [timer, setTimer] = React.useState(2);

  const id = React.useRef(null);

  const clear = () => {
    window.clearInterval(id.current);
    setPreload(false);
  };

  React.useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);
    return () => clear();
  }, []);

  React.useEffect(() => {
    if (timer === 0) {
      clear();
    }
  }, [timer]);

  if (typeof window === 'undefined' || !window.document) {
    return null;
  }

  return (
    <>
      {preloader ? (
        <div className="section regular loader-wrapper absolute">
          <h1>Is Food Security a Solution to Migration?</h1>
        </div>
      ) : (
        <Layout
          className="main-container"
          id="main-container"
          data-scroll-container
          ref={ref}
        >
          <Intro />

          <Section01Map />

          <Section02Scroll />

          <Section03DotCard />
          <Section03Scroll />

          <Section04GridCard />
          <Section04Scroll />

          <Section05PieCard />
          <Section05Pie />

          <Outro />
        </Layout>
      )}
    </>
  );
}
