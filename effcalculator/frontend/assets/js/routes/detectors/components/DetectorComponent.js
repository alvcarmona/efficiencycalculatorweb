import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { Glyphicon, Jumbotron, Button } from 'react-bootstrap'

class DetectorComponent extends Component {

  render () {
    return (
      <Jumbotron className="detectorListItem">
          <div className="masonryElement">
              <p><b>Detector: {this.props.name}</b></p>
              <p>{this.props.single}</p>
              {/* <p><b>Angle:</b> {this.props.angle}°</p>*/}
              {/* <p><b>Threshold:</b> {this.props.threshold}</p>*/}
             <p></p>
              <p className="DetectorLinks">
                  <Link to={`/frontend/detectors/${this.props.id}`}><Glyphicon glyph="eye-open" /></Link>
                  <Link to={`/frontend/detectors/${this.props.id}/edit`}><Glyphicon glyph="edit" /></Link>
                  <Link to={`/frontend/detectors/${this.props.id}/efficiency`}><Glyphicon glyph="list-alt"/></Link>
              </p>
          </div>
      </Jumbotron>
    );
  }
}

export default DetectorComponent;