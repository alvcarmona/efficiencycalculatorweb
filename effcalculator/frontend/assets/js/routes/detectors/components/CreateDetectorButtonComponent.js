/**
 * Created by alvarocbasanez on 11/08/17.
 */

import React, {Component} from 'react';
import ReactDOM from 'react';
import {
    Modal,
    OverlayTrigger,
    Tooltip,
    MenuItem,
    Button,
    Row,
    Popover,
    Col,
    Grid,
    FormControl,
    FormGroup,
    HelpBlock,
    ControlLabel,
    Glyphicon
} from 'react-bootstrap'
import DetectorForm from '../containers/DetectorForm'
import {bindActionCreators} from 'redux';


class CreateDetectorButton extends Component {


    close() {
        this.props.close()
    }

    open() {
        this.props.open()
    }


    handleFileSelect(submit) {
        event.preventDefault();
        var files = document.getElementById('formControlsFile').files; // FileList object

        // files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
            var reader = new FileReader();

            // Closure to capture the file information.
            console.log('abre archivo')
            let json
            reader.onload = (function (theFile) {
                return function (e) {
                    console.log('e readAsText = ', e);
                    console.log('e readAsText target = ', e.target);
                    try {
                        json = JSON.parse(e.target.result);
                        submit(json)
                    } catch (ex) {
                        alert('Unable to read as JSON' + ex);
                    }
                }
            })(f);
            reader.readAsText(f);
        }

    }


    render() {
        let initialValues = {
            "name": "New detector",
            "angle": 90,
            "threshold": 100,
        };
        return (
            <div className="createButton">
                <Button className="createButtonIn"
                    bsStyle="success"
                    onClick={this.open.bind(this)}
                >
                <Glyphicon  glyph="plus"/>
                </Button>

                <Modal show={this.props.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Detector</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Grid>
                            <Col md={2}>
                                <DetectorForm onSubmit={this.props.submit} initialValues={initialValues}/>
                            </Col>
                            <Col md={2} mdOffset={1}>
                                <form onSubmit={this.handleFileSelect.bind(this,this.props.submit)}>
                                    <FormGroup controlId={"formControlsFile"}>
                                        <ControlLabel>{"Import"}</ControlLabel>
                                        <FormControl type="file" accept="*.json"/>
                                        <HelpBlock>{"path to detector json file"}</HelpBlock>
                                        <Button type="submit">Submit</Button>
                                    </FormGroup>

                                </form>
                            </Col>
                        </Grid>
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
