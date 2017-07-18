/**
 * Created by alvarocbasanez on 13/07/17.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Blades from './Blades'
import Wavelength from './Wavelength'
class DetectorDetail extends Component {

    constructor(props){
        super(props);
        this.state = {detectors : props.detectors, dummieDetector : {
  "name": "Detector1",
  "converter": "10B4C 2.24g/cm3",
  "angle": 90,
  "threshold": 100,
  "single": false,
  "wavelength": [{
    "angstrom": 1.8,
    "%": 100
  }
  ],
  "blades": [
    {
    "backscatter": 1.3,
    "transmission": 1.3,
    "substrate": 0,
    "inclination": 0
  },
  {
    "backscatter": 1.3,
    "transmission": 1.3,
    "substrate": 0,
    "inclination": 0
  },
  {
    "backscatter": 1.3,
    "transmission": 1.3,
    "substrate": 0,
    "inclination": 0
  },
  {
    "backscatter": 1.3,
    "transmission": 1.3,
    "substrate": 0,
    "inclination": 0
  },
  {
    "backscatter": 1.3,
    "transmission": 1.3,
    "substrate": 0,
    "inclination": 0
  },
  {
    "backscatter": 1.3,
    "transmission": 1.3,
    "substrate": 0,
    "inclination": 0
  },
  {
    "backscatter": 1.3,
    "transmission": 1.3,
    "substrate": 0,
    "inclination": 0
  }
  ]
}}
    };


    render() {
         if (!this.props.currentDetector) {
        return(
         <div className="DetectorDetail">
             <Link to={`/frontend/detectors/`}>atras</Link>
                <h2>Detector {this.props.routeProps.match.params.number} not found</h2>
            </div>)
        }
        return (
            <div className="DetectorDetail">
                <Link to={`/frontend/detectors/`}>atras</Link>
                <p><b>Detector name: </b>{this.state.dummieDetector.name}</p>
                <p><b>Angle: </b>{this.state.dummieDetector.angle}° </p>
                <p><b>Threshold: </b>{this.state.dummieDetector.threshold} Kev</p>
                <Blades blades={this.state.dummieDetector.blades}/>
                <Wavelength/>
            </div>
    );
  }
}


export default DetectorDetail;

