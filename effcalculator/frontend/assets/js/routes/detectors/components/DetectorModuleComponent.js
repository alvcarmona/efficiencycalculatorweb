/**
 * Created by alvarocbasanez on 27/07/17.
 */
import React, {Component} from 'react'

import DetectorAnimatedListContainer from '../containers/DetectorAnimatedListContainer'
import {Row, Col} from 'react-bootstrap'
import MiddlePanel from '../containers/MiddlePanelContainer'
import CreateDetectorButtonContainer from '../containers/CreateDetectorButtonContainer'

class DetectorModuleComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (!this.props.detectors || this.props.detectors.length == 0) {
            return (<Col sm={2} md={2}>
                            <Row><CreateDetectorButtonContainer detectors={this.props.detectors}/></Row>

                        </Col>);
        }
        return (
            <div className="DetectorModuleComponent">
                <Col>
                    <Row className={'DetectorModuleContent'}>
                        <Col xs={2}>
                            <DetectorAnimatedListContainer detectors={this.props.detectors}/>
                        </Col>
                        <Col xs={9} md={9} lg={9} className={'middleColumn'}>
                            <MiddlePanel detectors={this.props.detectors} />
                        </Col>
                    </Row>
                </Col>
            </div>
        );
    }

}


export default DetectorModuleComponent
