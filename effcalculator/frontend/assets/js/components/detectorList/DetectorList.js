/**
 * Created by alvarocbasanez on 11/07/17.
 */
import React, { Component } from 'react'
import Detector from './Detector'
import Gallery from './Gallery'
import axios from 'axios';
import { ListGroup } from 'react-bootstrap'
class DetectorList extends Component {

  render () {

        console.log('renderList')
      if (!this.props.detectors) {
          return (<div className="DetectorList">No hay detectores</div>);
      }
    return (
        <div className="DetectorList">
            <Gallery detectors ={this.props.detectors}/>
        </div>
    );
  }
}

export default DetectorList;