/**
 * Created by alvarocbasanez on 13/07/17.
 */
import React, {Component} from 'react';
import {Blades} from './BladesComponent'
import Wavelength from './WavelengthComponent'
import SketchContainer from './sketchComponent'
import {Row, Col, PageHeader, small, Panel, Button} from 'react-bootstrap'
import DetectorFormContainer from '../containers/forms/DetectorForm'
import WavelengthFormContainer from '../containers/forms/WavelengthForm'
import BladeHandler from '../containers/BladeHandler'
import DetectorEfficiencyComponent from './DetectorEfficiencyComponent'
import Spinner from './Spinner'

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
            return <View className='handler-view' detector={this.props.detector}/>;
        } else if (this.state.mode === 'edit') {
            console.log('render edit')
            const Form = this.props.form
            return <Form className='handler-form' detector={this.props.detector}/>
        }
    }

    renderButton() {
        if (this.state.mode === 'view') {
            return (
                <div className='handler-button'>
                    <button className='handler-button-edit btn btn-warning' onClick={this.handleShow.bind(this)}>
                        edit
                    </button>
                </div>
            );
        } else {
            return (
                <div className='handler-button'>
                    <div>
                        <button  className='handler-button-cancel btn btn-danger' onClick={this.handleEdit.bind(this)}>
                            cancel
                        </button>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className='handler'>
                {this.renderButton()}
                {this.renderComponent()}
            </div>

        );
    }
}

class BasicInfoComponent extends React.Component {
  render () {
    return <div><p><b>Detector name: </b>{this.props.detector.name}</p>
                             <p><b>Angle: </b>{this.props.detector.angle}° </p>
                            <p><b>Threshold: </b>{this.props.detector.threshold} Kev</p>
                             <p>The converter material is <b>{this.props.detector.converter}</b></p>
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

class MetadataLoad extends React.Component {
  render () {
    return <div>
            <h5>Generating metadata, this may take some seconds</h5>
                <Spinner/>
            </div>
  }
}

class WavelengthInfoComponent extends React.Component {
  render () {



    return <Row>
                            {!this.props.detector.wavelength || this.props.detector.wavelength.length == 0 ?
                                <p>There is no wavelength </p> :
                                <div className='wavelength-info'>
                                    <Col sm={4}>
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
                                        </Panel>
                                    </Col>
                                    <Col sm={5} smOffset={2}>
                                        <div>
                                            <h4>Wavelength list</h4>
                                            <Wavelength wave={this.props.detector.wavelength}/>
                                        </div>
                                    </Col>
                                </div>}
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
        a.class = 'btn'

        var container = document.getElementById('download');
        container.appendChild(a);
    }
    export(){
        console.log('export button')
        document.getElementById('download').firstElementChild.click();
    }


    render() {


        return (
            <div>
                <Row>

                    <PageHeader> Detector configuration Information
                        <small> details</small>
                    </PageHeader>
                </Row>
                <Row>
                    <div className="card">
                        <Col className="delete-button">
                            <Button className="delete-button" onClick={(e) => {
                                         //this.props.openModal()
                                         this.props.deleteDetector(this.props.detector.id)
                                    }
                                    }   bsStyle="danger"> Delete detector
                            </Button>
                            <Button bsStyle="info" className="exportButton">
                               <div id="download"> </div>
                            </Button>
                        </Col>

                        <Col xs={4} md={4} lg={5} className='detectorInfoColumn'>
                            <EditHandler detector={this.props.detector} form={DetectorFormContainer} view={BasicInfoComponent}/>

                        </Col>
                        {this.props.detector.blades.length > 0?
                            <Col>
                                <SketchComponent detector={this.props.detector}/>
                            </Col>: <div></div>
                        }

                    </div>
                </Row>
                <Row>
                    <h3>Detector blade setup</h3>
                </Row>
                <Row>
                    <div className="card">
                        <EditHandler detector={this.props.detector} form={BladeHandler} view={BladeInfoComponent}/>
                    </div>
                </Row>
                <Row>
                    <h3>Neutron beam configuration</h3>
                </Row>
                <Row>
                    <div className="card">
                        <EditHandler detector={this.props.detector} form={WavelengthFormContainer} view={WavelengthInfoComponent}/>
                    </div>
                </Row>
                <h4>Efficiency information</h4>
                <Row>
                    <div className="card">
                        { this.props.detector.blades.length >0 && this.props.detector.wavelength.length >0 ?
                             <div>   { this.props.detector.metadata.calculated ?
                                    <DetectorEfficiencyComponent
                                        detector={this.props.detector}
                                        optimizeDetectorDiffThickness={this.props.optimizeDetectorDiffThickness}
                                        optimizeDetectorThickness={this.props.optimizeDetectorThickness}
                                    />
                                :
                                 <MetadataLoad/>

                                }
                                </div>
                            :
                            <div> add wavelength and blades </div>
                        }
                    </div>
                </Row>
                {/*

                 <ConfirmModalContainer submit={this.deleteDetector.bind(this)}/>*/}
            </div>

        );
    }
}


export default DetectorModuleDetailComponent;

