/**
 * Created by alvarocbasanez on 13/07/17.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Blades from './BladesComponent'
import Wavelength from './WavelengthComponent'
import {Grid, DropdownButton, MenuItem, Row, Col} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'

class DetectorDetail extends Component {

    constructor(props) {
        super(props);
    };


    render() {
        if (!this.props.detector) {
            return (
                <div className="DetectorDetail">
                    <Link to={`/frontend/detectors/`}>atras</Link>
                </div>)
        }
        return (
            <div className="DetectorDetail">
                <Link to={`/frontend/detectors/`}> To detector list </Link>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={6} xsOffset={8}>
                             <DropdownButton id="1" bsStyle='warning' title='Options' className="optionbutton">
                                <LinkContainer to={"/frontend/Detectors/"+this.props.detector.id+"/edit"}>
                                    <MenuItem eventKey="1">Edit detector</MenuItem>
                                </LinkContainer>
                                <MenuItem onSelect={(e) => {this.props.delete(this.props.detector);
                                    this.props.redirect()}
                                } eventKey="2">Delete detector</MenuItem>
                            </DropdownButton>
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
                       {!this.props.detector.blades ? <p>There are no blades</p> :<Blades blades={this.props.detector.blades}/>}
                    </Row>
                    <Row>
                           {!this.props.detector.wavelength ? <p>There is no wavelength </p> : <Wavelength wave={this.props.detector.wavelength}/>}
                    </Row>
                </Grid>
            </div>
        );
    }
}


export default DetectorDetail;

