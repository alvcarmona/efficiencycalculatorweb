/**
 * Created by alvarocbasanez on 13/07/17.
 */
import React, { Component } from 'react';

class DetectorDetail extends Component {
    constructor(props){
        for (var i = 0; i < this.props.detectors.length; i++) {
            if (this.props.detectors[i].id === parseInt(this.props.match.params.number, 10)){
                   this.state = {currentdetector: this.props.detectors[i]};
            }
        }
    };


    render() {
         if (!this.state.currentdetector) {
         return <div>Sorry, but the detector was not found</div>
        }
        return (
            <div className="DetectorDetail">
                <h2>Welcome to the detectorDetailsView this should work</h2>
            </div>
    );
  }
}

export default DetectorDetail;