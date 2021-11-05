import React from 'react';

function CardSection(props) {
  return (
    <div className="section-card">
      <header>{props.header}</header>
      <main>{props.main}</main>
    </div>
  );
}

export default CardSection;
