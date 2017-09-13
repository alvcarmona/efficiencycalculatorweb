/**
 * Created by alvarocbasanez on 11/08/17.
 */

import React, {Component} from 'react';
import {Modal, OverlayTrigger, Tooltip, MenuItem, Button, Row, Popover, Col, Grid} from 'react-bootstrap'
import {bindActionCreators} from 'redux';


class ConfirmModalComponent extends Component {


    close() {
        this.props.close()
    }


    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Grid>
                    <Col >
                        <Row>Are you sure you want to delete the configuration?</Row>
                        <Row></Row>
                    </Col>
                        </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="warning" onClick={this.props.close.bind(this)}>Cancel</Button>
                    <Button bsStyle="danger" onClick={this.props.submit.bind(this)}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ConfirmModalComponent
