import React from 'react';
import CardSection from '../ui/CardSection';

const Section03Dot = () => {
  const text = {
    header: `Is food security a solution
    to migration issue?`,
    main: 'Since those three countries are having food security issues and contribute to a large proportion of migration in the US, it is tempting to say that maybe increasing food security is a solution to migration. However, the survey suggests otherwise.',
  };

  return (
    <div className="section">
      <CardSection header={text.header} main={text.main} />
    </div>
  );
};

export default Section03Dot;
