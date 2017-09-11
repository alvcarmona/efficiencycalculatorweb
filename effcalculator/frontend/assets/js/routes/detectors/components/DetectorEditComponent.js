import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import DetectorForm from '../containers/DetectorForm'
import BladesForm from '../containers/BladesForm'
import WavelengthForm from '../containers/WavelengthForm'
import {BladeTable} from './BladesComponent'
import Wavelength from './WavelengthComponent'
import {Grid, Row, Col} from 'react-bootstrap'


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
                <Link to={`/frontend/detectors/` + this.props.detector.id}> To detector detail view </Link>
                <Grid>
                    <Row>
                        <h2>Detector Information</h2>
                    </Row>
                    <Row>
                        <DetectorForm onSubmit={this.props.submit}/>
                    </Row>
                    <Row>
                        <h3>Detector blade setup</h3>
                    </Row>
                    <Row>
                        <Col md={2} mdOffset={3}>
                            <BladesForm onSubmit={this.props.addBlades}/>
                        </Col>
                        <Col md={4} mdOffset={2}>
                            <h4>Blade list</h4>
                            <BladeTable blades={this.props.detector.blades}/>
                        </Col>
                    </Row>
                    <Row>
                        <h3>Neutron beam configuration</h3>
                    </Row>
                    <Row><Col md={2} mdOffset={3}>
                        <WavelengthForm onSubmit={this.props.addWavelength}/>
                    </Col>
                        <Col md={3} mdOffset={2} >
                             <h4>Wavelength list</h4>
                            {this.props.detector.wavelength ?   <Wavelength wave={this.props.detector.wavelength}/> : 'No wavelength added'}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}


export default DetectorEditComponent;

