import { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';

export default function Intro() {
  // *Spring transition
  // ===
  // const [items, setItems] = useState([]);
  // const transition = useTransition(items, {
  //   from: { x: -100, y: 800, opacity: 0 },
  //   enter: (item) => async (next) => {
  //     await next({ y: item.y, opacity: 1, delay: item.delay });
  //     await next({ x: 0 });
  //   },
  //   leave: (item) => (next) =>
  //     next({ x: 100, y: 800, opacity: 0, delay: item.delay }),
  // });
  // const [offset, setOffset] = useState(0);

  // *Page scroll
  // ===
  // useEffect(() => {
  //   window.onscroll = () => {
  //     setOffset(window.pageYOffset);
  //   };
  // }, []);

  // console.log(offset);

  return (
    <div className="section center intro">
      {/* <button
        onClick={() => {
          setItems((v) =>
            v.length
              ? []
              : [
                  { y: 0, delay: 200 },
                  { y: 50, delay: 400 },
                  { y: 100, delay: 600 },
                ]
          );
        }}
      >
        {items.length ? 'un-mount' : 'mount'}
      </button>

      {transition((style, item) =>
        item ? <animated.h1 style={style}>Hi</animated.h1> : ''
      )} */}

      {/* ACTUAL CODE BELOW */}
      <div className="header-container">
        <h1>Food Security and Migration</h1>
        <p className="subtitle">
          A Data Visualization Story on Food Security and Migration in Northern
          Triangle Region
        </p>
      </div>
      <small>SCROLL TO CONTINUE</small>
    </div>
  );
}
