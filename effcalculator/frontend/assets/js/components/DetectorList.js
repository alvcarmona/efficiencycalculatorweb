/**
 * Created by alvarocbasanez on 11/07/17.
 */
import React, { Component } from 'react'
import Detector from '../components/Detector'
import axios from 'axios';

class DetectorList extends Component {

  render () {
        console.log('renderList')
      if (!this.props.detectors) {
          return (<div className="DetectorList">No hay detectores</div>);
      }
    return (
        <div className="DetectorList">
            <ul>
              {this.props.detectors.map(u => {
                  return (
                      <div key={u.id}>
                          <Detector
                              id={u.id}
                              name={u.name}
                              single={u.single}
                              threshold={u.threshold}
                              angle={u.angle}
                          />
                      </div>
                  );
              })}
            </ul>
        </div>
    );
  }
}

export default DetectorList;