import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { ListGroupItem, Jumbotron, Button } from 'react-bootstrap'

class DetectorComponent extends Component {

  render () {
    return (
      <Jumbotron>
          <div className="masonryElement">
              <p><b>Name: {this.props.name}</b></p>
              <p>{this.props.single}</p>
              <p><b>Angle:</b> {this.props.angle}°</p>
              <p><b>Threshold:</b> {this.props.threshold}</p>
              <p><Link to={`/frontend/detectors/${this.props.id}`}>Open detector</Link></p>
          </div>
      </Jumbotron>
    );
  }
}

export default DetectorComponent;