import React from "react";
import CardSection from '../ui/CardSection';
import MapWrapper from '../charts/MapWrapper'

const SectionBreak01 = () => {
  const text = {
    header: `Migration status in the Northern Triangle Region`,
    main: 'Migration from Central America to the U.S. began rising notably in the 1980s, and continued to increase in subsequent decades. More recently, the number of immigrants – lawful and unauthorized – from the three Northern Triangle nations rose by 25% between 2007 and 2015. During that same period, the immigrant population from Mexico, the largest birth country for U.S. immigrants, declined 6%.'
  };

  return (
    <div className="section-break">

      <CardSection
        header={text.header}
        main={text.main}
      />
      <MapWrapper />
    </div>
  );

}

export default SectionBreak01;
