import React from 'react';
import CardSection from '../ui/CardSection';

function SectionBreak01() {
  return (
    <div className="section-break">
      <CardSection
        header={<h1>Food Insecurity</h1>}
        main={
          <p>
            Inequality in food insecurity exists not only between but also but
            also within countries. People in the northern triangle area are
            experiencing severe food insecurity and the difference can also be
            very large between the rich and the poor.
          </p>
        }
      />
    </div>
  );
}

export default SectionBreak01;
