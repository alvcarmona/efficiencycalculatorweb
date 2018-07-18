/**
 * Created by alvarocbasanez on 27/07/17.
 */
import React, {Component} from 'react'

import {Grid, Row, Col} from 'react-bootstrap'
import RefreshDetectorsContainer from '../containers/RefreshDetectorsContainer'
import MiddlePanel from '../containers/MiddlePanelContainer'
import CreateDetectorButtonContainer from '../containers/CreateDetectorButtonContainer'
class DetectorModuleComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (!this.props.detectors || this.props.detectors.length == 0) {
            return (<Col sm={2} md={2}>
                            <Row><DetectorAnimatedListComponent detectors={this.props.detectors}/></Row>

                        </Col>);
        }
        return (
            <div className="DetectorModuleComponent">

                <Col>

                    <Row className={'DetectorModuleContent'}>

                        <Col xs={2}>
                            <DetectorAnimatedListComponent detectors={this.props.detectors}/>
                        </Col>
                        <Col xs={8} md={8} lg={8} className={'middleColumn'}>
                            <MiddlePanel detectors={this.props.detectors} />
                        </Col>
                        {/* <div>
                                            <DetectorModuleDetailComponent detector={this.props.detectorsSelected[Object.keys(this.props.detectorsSelected)[0]]}/>
                                        </div>*/}

                    </Row>

                </Col>

            </div>
        );
    }

}

import DetectorAnimatedListComponent from './DetectorAnimatedlist'

export default DetectorModuleComponent
