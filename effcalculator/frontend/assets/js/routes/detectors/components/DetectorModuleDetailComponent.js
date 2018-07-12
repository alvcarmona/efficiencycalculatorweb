/**
 * Created by alvarocbasanez on 13/07/17.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Blades} from './BladesComponent'
import Wavelength from './WavelengthComponent'
import SketchContainer from './sketchComponent'
import ConfirmModalContainer from './../containers/confirmModalContainer'
import {Grid, DropdownButton, MenuItem, Row, Col, PageHeader, small, Panel, Modal} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

class DetectorModuleDetailComponent extends Component {

    constructor(props) {
        super(props);
    };

    deleteDetector() {
        this.props.delete(this.props.detector)
        this.props.redirect()
    }


    componentDidMount() {
        const obj = {name:this.props.detector.name, angle:this.props.detector.angle,converter:this.props.detector.converter,single:this.props.detector.single,threshold:this.props.detector.threshold, blades:this.props.detector.blades,wavelength:this.props.detector.wavelength};
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

        var a = document.createElement('a');
        a.href = 'data:' + data;
            a.download = 'detector.json';
        a.innerHTML = 'Export';

        var container = document.getElementById('download');
        container.appendChild(a);
    }

    render() {


        return (
            <div>
                    <Row>

                        <PageHeader> Detector configuration Information
                            <small> details</small>
                            <div id="download"></div>
                        </PageHeader>
                    </Row>
                    <Row>
                        <div className="card">
                        <Col xs={4} md={4} lg={5} ><p><b>Detector
                            name: </b>{this.props.detector.name}</p>
                            <p>The converter material is <b>{this.props.detector.converter}</b></p>
                            <p><b>Threshold: </b>{this.props.detector.threshold} Kev</p>
                            <p><b>Angle: </b>{this.props.detector.angle}° </p>
                        </Col>

                        <Col >
                            <SketchContainer angle={this.props.detector.angle} blades={this.props.detector.blades}
                                             detector={this.props.detector}/>
                        </Col>
                        </div>
                    </Row>
                    <Row>
                        <h3>Detector blade setup</h3>
                    </Row>
                    <Row>
                        <div className="card">
                        {!this.props.detector.blades || this.props.detector.blades.length === 0 ?
                            <p>There are no blades</p> :
                            <div>
                                <p> The Detector has {this.props.detector.blades.length}
                                    <b>{this.props.detector.single ? ' single coated' : ' double coated'}</b> blades
                                </p>
                                <Blades blades={this.props.detector.blades}/>
                            </div>
                        }
                        </div>
                    </Row>
                    <Row>
                        <h3>Neutron beam configuration</h3>
                    </Row>
                    <Row>
                            <div className="card">

                            <h4>Neutron Wavelength</h4>
                            <Row>
                                {!this.props.detector.wavelength || this.props.detector.wavelength.length == 0 ?
                                    <p>There is no wavelength 1 </p> :
                                    <div><Col >
                                        <Panel header='Wavelength information' bsStyle="info">
                                            <p>This neutron beam configuration
                                                contains {this.props.detector.wavelength.length > 1 ?
                                                    <span> Polichromatic wavelength</span> :
                                                    <span>Monochromatic wavelength</span>}
                                            </p>
                                        </Panel> </Col>
                                        <Col sm={3} md={4} smOffset={1}><h4>Wavelength list</h4> <Wavelength
                                            wave={this.props.detector.wavelength}/> </Col></div>}
                            </Row>
                            </div>
                    </Row>
            </div>

        );
    }
}


export default DetectorModuleDetailComponent;

