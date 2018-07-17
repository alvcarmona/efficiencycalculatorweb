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
import DetectorFormContainer from '../containers/forms/DetectorForm'
import WavelengthFormContainer from '../containers/forms/WavelengthForm'
import BladeHandler from '../containers/BladeHandler'
import DetectorEfficiencyComponent from './DetectorEfficiencyComponent'



class EditHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {text: '', inputText: '', mode: 'view'};
    }

    handleChange(e) {
        this.setState({inputText: e.target.value});
    }

    handleShow() {
        this.setState({ mode: 'edit'});
    }

    handleEdit() {
        this.setState({mode: 'view'});
    }

    componentWillReceiveProps(){
        this.handleEdit()
    }
    renderComponent() {
        if (this.state.mode === 'view') {
            const View = this.props.view
            return <View detector={this.props.detector}/>;
        } else if (this.state.mode === 'edit') {
            console.log('render edit')
            const Form = this.props.form
            return <Form detector={this.props.detector}/>
        }
    }

    renderButton() {
        if (this.state.mode === 'view') {
            return (
                <div>
                    <button onClick={this.handleShow.bind(this)}>
                        edit
                    </button>
                </div>
            );
        } else {
            return (
                <div>

                    <div>
                        <button onClick={this.handleEdit.bind(this)}>
                            cancel
                        </button>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderButton()}
                {this.renderComponent()}
              </div>

        );
    }
}

class BasicInfoComponent extends React.Component {
  render () {
    return <div><p><b>Detector
                            name: </b>{this.props.detector.name}</p>
                            <p>The converter material is <b>{this.props.detector.converter}</b></p>
                            <p><b>Threshold: </b>{this.props.detector.threshold} Kev</p>
                            <p><b>Angle: </b>{this.props.detector.angle}° </p>
                            </div>
  }
}

class BladeInfoComponent extends React.Component {
  render () {
    return <Row>{!this.props.detector.blades || this.props.detector.blades.length === 0 ?
                            <p>There are no blades</p> :
                            <div>
                                <p> The Detector has {this.props.detector.blades.length}
                                    <b>{this.props.detector.single ? ' single coated' : ' double coated'}</b> blades
                                </p>
                                <Blades blades={this.props.detector.blades}/>
                            </div>
                        }</Row>
  }
}

class WavelengthInfoComponent extends React.Component {
  render () {



    return <Row>
                            {!this.props.detector.wavelength || this.props.detector.wavelength.length == 0 ?
                                <p>There is no wavelength </p> :
                                <div><Col xs={3} sm={3} md={4}>
                                    <Panel bsStyle="info">
                                        <Panel.Heading>
                                            <Panel.Title componentClass="h3">Wavelength information</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body>
                                            <p>This neutron beam configuration
                                                contains {this.props.detector.wavelength.length > 1 ?
                                                    <span> Polichromatic wavelength</span> :
                                                    <span>Monochromatic wavelength</span>}
                                            </p>
                                        </Panel.Body>
                                    </Panel> </Col>
                                    <Col sm={3} md={4}><h4>Wavelength list</h4>
                                        <Wavelength
                                            wave={this.props.detector.wavelength}/> </Col></div>}
                        </Row>
  }
}

class SketchComponent extends React.Component {
    componentWillReceiveProps(){
        console.log('props component')
        this.forceUpdate()
    }

  render () {
    return <SketchContainer detector={this.props.detector}/>
  }
}

class DetectorModuleDetailComponent extends Component {

    constructor(props) {
        super(props);
    };

    deleteDetector() {
        this.props.delete(this.props.detector)
        this.props.redirect()
    }


    componentDidMount() {
        const obj = {
            name: this.props.detector.name,
            angle: this.props.detector.angle,
            converter: this.props.detector.converter,
            single: this.props.detector.single,
            threshold: this.props.detector.threshold,
            blades: this.props.detector.blades,
            wavelength: this.props.detector.wavelength
        };
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
                        <Col xs={4} md={4} lg={5}><EditHandler detector={this.props.detector} form={DetectorFormContainer} view={BasicInfoComponent}/>
                            {/*<DetectorForm onSubmit={this.props.submit}/>*/}
                        </Col>

                        <Col>
                            <SketchComponent detector={this.props.detector}/>
                        </Col>
                    </div>
                    <div className="card">

                    </div>
                </Row>
                <Row>
                    <h3>Detector blade setup</h3>
                </Row>
                <Row>
                    <div className="card">
                        <EditHandler detector={this.props.detector} form={BladeHandler} view={BladeInfoComponent}/>
                        <Row>
                            {/*<BladeHandler onSubmit={this.props.addBlades}/>*/}
                        </Row>
                    </div>
                </Row>
                <Row>
                    <h3>Neutron beam configuration</h3>
                </Row>
                <Row>
                    <div className="card">
                        <h4>Neutron Wavelength</h4>
                        <EditHandler detector={this.props.detector} form={WavelengthFormContainer} view={WavelengthInfoComponent}/>
                    </div>
                </Row>
                <h4>Efficiency information</h4>
                <Row>
                    <div className="card">
                       <DetectorEfficiencyComponent detector={this.props.detector} optimizeDetectorDiffThickness={this.props.optimizeDetectorDiffThickness} optimizeDetectorThickness={this.props.optimizeDetectorThickness}/>
                    </div>
                </Row>
            </div>

        );
    }
}


export default DetectorModuleDetailComponent;

