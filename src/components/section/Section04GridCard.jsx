import React from 'react';
import CardSection from '../ui/CardSection';

const Section04GridCard = () => {
  const text = {
    header: `Food security may have some impact on people's desire and action on migration. What kind of relationship could we see from this survey? `,
    main: `From the previous data, we can see a larger proportion of people suffering food insecurity. How many of these people may want to migrate as opposed of those who have adequate food? 
    `,
  };

  return (
    <div className="section">
      <CardSection header={text.header} main={text.main} />
    </div>
  );
};

export default Section04GridCard;
