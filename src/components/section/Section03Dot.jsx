import React from 'react';
import CardSection from '../ui/CardSection';

const Section03Dot = () => {
  return (
    <div className="section">
      {/* <CardSection header={text.header} main={text.main} /> */}
      <div className="section-card no-hover">
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

export default Section03Dot;
