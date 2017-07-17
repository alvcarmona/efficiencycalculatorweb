/**
 * Created by alvarocbasanez on 11/07/17.
 */
import React, { Component } from 'react'
import Detector from '../components/Detector'
import axios from 'axios';

class DetectorList extends Component {
    constructor(props){
        super(props);
        this.state = {detectors : [props.detectors]};
    }
    componentWillReceiveProps(nextProps){
        this.setState( {detectors : nextProps.detectors});
        console.log(nextProps)
    }

  render () {
        console.log('renderList')
      if (!this.props.detectors) {
          return (<div>No hay detectores</div>);
      }
    return (
      <ul>
          {this.props.detectors.map(u => {
              return (
                  <Detector
                      id={u.id}
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