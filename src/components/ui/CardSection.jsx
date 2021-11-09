import React, { Component } from "react";
// import "../../styles/components/scroll-card.scss";

class CardSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="section-card">
        <h1>{this.props.header}</h1>
        <p>{this.props.main}</p>
      </div>
    );
  }
}

export default CardSection;
