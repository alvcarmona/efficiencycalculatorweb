/**
 * Created by alvarocbasanez on 13/07/17.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class DetectorDetail extends Component {

    constructor(props){
        super(props);
        this.state = {detectors : props.detectors}
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
                <h2>Welcome to the detectorDetailsView this should work</h2>
            </div>
    );
  }
}

export default DetectorDetail;