import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import DetectorForm from '../containers/DetectorForm'
import BladesForm from '../containers/BladesForm'
import WavelengthForm from '../containers/WavelengthForm'
import Blades from './BladesComponent'
import Wavelength from './WavelengthComponent'
import {Grid, DropdownButton, MenuItem, Row, Col, FormGroup} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import SingleInput from './SingleInput';

class DetectorEditComponent extends Component {

    render() {
        if (!this.props.detector) {
            return (
                <div className="DetectorEdit">
                    <Link to={`/frontend/detectors/`}>atras</Link>
                </div>)
        }
        return (
            <div className="DetectorEditComponent">
                 <Link to={`/frontend/detectors/`+this.props.detector.id}> To detector detail view </Link>
                <Grid>
                    <DetectorForm onSubmit={this.props.submit} initialValues={this.props.current}/>
                    <BladesForm onSubmit={this.props.addBlades}/>
                    <WavelengthForm onSubmit={this.props.addWavelength}/>
                </Grid>
            </div>
        );
    }
}


export default DetectorEditComponent;

