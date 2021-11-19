import React from 'react';
import GlobalWrapper from '../charts/FoodGlobalWrapper';
import CardSection from '../ui/CardSection';

const Section02FoodGlobal = () => {
  const text = {
    header: `Food security of the Northern Triangle Region in the global context.`,
    main: '',
  };

  return (
    <div className="section start">
      <CardSection header={text.header} main={text.main} />
      <GlobalWrapper />
    </div>
  );
};

export default Section02FoodGlobal;
