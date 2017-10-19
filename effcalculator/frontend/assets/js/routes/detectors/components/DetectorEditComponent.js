import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import DetectorForm from '../containers/DetectorForm'
import BladesForm from '../containers/BladesForm'
import WavelengthForm from '../containers/WavelengthForm'
import ConverterForm from '../containers/ConverterForm'
import {BladeTable} from './BladesComponent'
import Wavelength from './WavelengthComponent'
import {Grid, Row, Col, Panel, small, PageHeader} from 'react-bootstrap'


class DetectorEditComponent extends Component {

    render() {
        if (!this.props.detector || Object.keys(this.props.detector).length === 0) {
            return (
                <div className="DetectorEdit">
                    <Link to={`/detectors/`}>atras</Link>
                </div>)
        }
        return (
            <div className="DetectorEditComponent">
                <Link to={`/detectors/` + this.props.detector.id}> To detector detail view </Link>
                <Grid>
                    <Row>
                        <PageHeader> Detector configuration Information
                            <small> edit</small>
                        </PageHeader>
                    </Row>
                    <Row>
                        <div className={'edit-form'}>
                            <DetectorForm onSubmit={this.props.submit}/>
                        </div>
                    </Row>
                    <Row>
                        <ConverterForm onSubmit={this.props.submit}/>
                    </Row>
                    <Row>
                        <h3>Detector blade setup</h3>
                    </Row>
                    <Row>
                        <div className={'edit-form'}>
                            <Col sm={4} md={4} mdOffset={3} smOffset={4}>
                                <Row>
                                <Panel header='Blade information' bsStyle="info">
                                    <p>This detector configuration contains {this.props.detector.blades.length > 0 ?
                                        <span> {this.props.detector.blades.length} B10 double coated blades whithout substrate</span> :
                                        <span>no blades</span>}
                                    </p>
                                </Panel>
                                    </Row>
                                <Row>
                                <BladesForm onSubmit={this.props.addBlades}/>
                                </Row>
                            </Col>
                        </div>
                        <Col sm={4} md={4} mdOffset={1} smOffset={4}>
                            {this.props.detector.blades.length > 0 ?
                                <div>
                                    <h4>Blade list</h4>
                                    <BladeTable blades={this.props.detector.blades}/>
                                </div> :
                                <Panel header={'Warning'} bsStyle="warning">
                                    Blades needed to calculate detector efficiency
                                </Panel>
                            }

                        </Col>
                    </Row>
                    <Row>
                        <h3>Neutron beam configuration</h3>
                    </Row>
                    <Row>
                        <div className={'edit-form'}>
                            <Col sm={5} md={3} mdOffset={3}>
                                <Row>
                                <Panel header='Wavelength information' bsStyle="info">
                                    <p>This neutron beam configuration contains {this.props.detector.wavelength.length > 1 ?
                                        <span> Polichromatic wavelength</span> :
                                        <span>Monochromatic wavelength</span>}
                                    </p>
                                </Panel>
                                    </Row>
                                <Row sm={4}>
                                     <WavelengthForm onSubmit={this.props.addWavelength}/>
                                </Row>
                            </Col>
                        </div>
                        <Col sm={5} md={3} mdOffset={2} smOffset={1}>
                            {this.props.detector.wavelength.length > 0 ?
                                <div><h4>Wavelength list</h4>
                                    <Wavelength wave={this.props.detector.wavelength}/>
                                </div> :
                                <Panel header={'Warning'} bsStyle="warning">
                                    Wavelength needed to calculate detector efficiency
                                </Panel>
                            }
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}


export default DetectorEditComponent;

