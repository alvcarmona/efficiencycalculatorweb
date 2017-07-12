import React, { Component } from 'react';

class Detector extends Component {
  render () {
    return (
      <li>
        {this.props.name} - {this.props.single} - {this.props.angle} - {this.props.threshold}
      </li>
    );
  }
}

export default Detector;