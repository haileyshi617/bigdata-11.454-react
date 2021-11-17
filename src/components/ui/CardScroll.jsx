import React from 'react';
import { Scrollama, Step } from 'react-scrollama';

function CardScroll (value,text){
  return (
    <Step data={value} key={value}>
      <div className='step'>
        {text}
      </div>
    </Step>
  )
}

export default CardScroll;
