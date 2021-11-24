import React, { Component } from 'react';

const CardSection = ({ header, main }) => {
  return (
    <div className="section-card">
      <h1>{header}</h1>
      <p>{main}</p>
    </div>
  );
};

export default CardSection;
