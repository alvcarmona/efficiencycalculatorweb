/**
 * Created by alvarocbasanez on 11/08/17.
 */

import React, {Component} from 'react';
import {Modal, OverlayTrigger, Tooltip, MenuItem, Button, Row, Popover, Col} from 'react-bootstrap'
import DetectorForm from '../containers/DetectorForm'
import {bindActionCreators} from 'redux';



class CreateDetectorButton extends Component {


    close() {
        this.props.close()
    }

    open() {
        this.props.open()
    }

    render() {
        let initialValues = {
            "name": "New detector",
            "angle": 90,
            "threshold": 100,
        };
        return (
            <div className="createButton">
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open.bind(this)}
                >
                    Create Detector
                </Button>

                <Modal show={this.props.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Detector</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DetectorForm onSubmit={this.props.submit} initialValues={initialValues}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default CreateDetectorButton
