import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Blades from './BladesComponent'
import Wavelength from './WavelengthComponent'
import {Grid, DropdownButton, MenuItem, Row, Col, FormGroup} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import SingleInput from './SingleInput';

class DetectorEditComponent extends Component {

    constructor(props) {
        super(props);
    };

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }


    render() {
        if (!this.props.detector) {
            return (
                <div className="DetectorEdit">
                    <Link to={`/frontend/detectors/`}>atras</Link>
                </div>)
        }
        return (
            <div className="DetectorEdit">
                <Link to={`/frontend/detectors/`}> To detector list </Link>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={6} xsOffset={8}>
                            {/*
                             <DropdownButton bsStyle='warning' title='Options' className="optionbutton">
                             <LinkContainer to={"/frontend/Detectors/"+this.props.detector.id+"/edit"}>
                             <MenuItem eventKey="1">Edit detector</MenuItem>
                             </LinkContainer>
                             <MenuItem eventKey="2">Delete detector</MenuItem>
                             </DropdownButton> */}
                        </Col>
                    </Row>
                    <Row>
                        <h2>Detector Information</h2>
                    </Row>
                    <Row>
                        <p><b>Detector name: </b>{this.props.detector.name}</p>
                        <p><b>Angle: </b>{this.props.detector.angle}° </p>
                        <p> The Detector has
                            <b>{this.props.detector.single ? 'single coated' : 'double coated'}</b> blades</p>
                        <p>The converter material is <b>{this.props.detector.converter}</b></p>
                        <p><b>Threshold: </b>{this.props.detector.threshold} Kev</p>
                    </Row>
                    <Row>
                        {!this.props.detector.blades ? <p>There are no blades</p> :
                            <Blades blades={this.props.detector.blades}/>}
                    </Row>
                    <Row>
                        {!this.props.detector.wavelength ? <p>There is no wavelength </p> :
                            <Wavelength wave={this.props.detector.wavelength}/>}
                    </Row>
                    <form className="container">
                        <SingleInput/>
                    </form>
                </Grid>

            </div>
        );
    }
}


export default DetectorEditComponent;

