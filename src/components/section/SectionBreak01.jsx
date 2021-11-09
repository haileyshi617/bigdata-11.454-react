import React, { Component } from "react";
import CardSection from '../ui/CardSection';


class SectionBreak01 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: 'Food Insecurity',
      main: 'Inequality in food insecurity exists not only between but also but also within countries. People in the northern triangle area are experiencing severe food insecurity and the difference can also be very large between the rich and the poor.'
    };
  }

  render() {
    return (
      <div className="section-break">
        <CardSection
          header={this.state.header}
          main={this.state.main}
        />
      </div>
    );
  }
}

export default SectionBreak01;
