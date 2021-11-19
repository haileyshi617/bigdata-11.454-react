import React from 'react';
import CardSection from '../ui/CardSection';

const SectionBreak03 = () => {
  const text = {
    header: `For those who suffer food insecurity tend to make solid plan and preparation to migrate than those don’t have food issue. 
    To answer this, we need to study the how many people have to work to ensure food security and understand how economic status impact migration plan and action. `,
    main: `It’s believed that lower proportion of food expenditure indicate a better off living condition because more money could be spared on improving quality of life beside food. In 2020, U.S. consumers spent an average of 8.6 percent of their disposable personal income on food. 
    `,
  };

  return (
    <div className="section-break">
      <CardSection header={text.header} main={text.main} />
    </div>
  );
};

export default SectionBreak03;
