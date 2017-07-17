import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Detector extends Component {
  render () {
    return (
      <li><Link to={`/frontend/detectors/${this.props.id}`}>{this.props.name}</Link>
         - {this.props.single} - {this.props.angle} - {this.props.threshold}
      </li>
    );
  }
}

export default Detector;