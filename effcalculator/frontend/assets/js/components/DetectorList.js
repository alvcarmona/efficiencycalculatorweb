/**
 * Created by alvarocbasanez on 11/07/17.
 */
import React, { Component } from 'react'
import Detector from '../components/Detector'

class DetectorList extends Component {
  render () {
      if (!this.props.detectors) {
          return null;
      }
    return (
      <ul>
          {this.props.detectors.map(u => {
              return (
                  <Detector
                      key={u.id}
                      name={u.name}
                      single={u.single}
                      threshold={u.threshold}
                      angle={u.angle}
                  />
              );
          })}
      </ul>
    );
  }
}

export default DetectorList;