import React from 'react';
import CardSection from '../ui/CardSection';

const Section05Pie = () => {
    const text = {
        header: `Economic pressure on food security tends to influence migration desire. 
    `,
        main: `Further study is needed for analyzing the economic pressure impact on food insecurity. How many people have to work to ensure food security? 
    `,
    };

    return (
        <div className="section">
            <CardSection header={text.header} main={text.main} />
        </div>
    );
};

export default Section05Pie;
