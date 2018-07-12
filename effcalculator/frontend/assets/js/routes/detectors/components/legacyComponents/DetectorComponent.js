import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import {Glyphicon, Jumbotron, Col, OverlayTrigger, Tooltip} from 'react-bootstrap'

class DetectorComponent extends Component {

    render() {
        const vtooltip = (<Tooltip id="tooltip">Go to <strong> detail </strong> page </Tooltip>);
        const edtooltip = (<Tooltip id="tooltip">Go to <strong> edit </strong> page </Tooltip>);
        const eftooltip = (<Tooltip id="tooltip">Go to <strong> efficiency </strong> page </Tooltip>);
        return (
                <Jumbotron className="detectorListItem">

                    <div className="masonryElement">
                        <p><b>Detector: {this.props.name}</b></p>
                        <p>{this.props.single}</p>
                        <p></p>
                        <p className="DetectorLinks">
                            <OverlayTrigger placement="bottom" overlay={vtooltip}>
                                <Link to={`/detectors/${this.props.id}`}><Glyphicon glyph="eye-open"/></Link>
                            </OverlayTrigger>
                            <OverlayTrigger placement="bottom" overlay={edtooltip}>
                                <Link to={`/detectors/${this.props.id}/edit`}><Glyphicon glyph="edit"/></Link>
                            </OverlayTrigger>
                            <OverlayTrigger placement="bottom" overlay={eftooltip}>
                                <Link to={`/detectors/${this.props.id}/efficiency`}><Glyphicon
                                    glyph="list-alt"/></Link>
                            </OverlayTrigger>
                        </p>
                    </div>
                </Jumbotron>
        );
    }
}

export default DetectorComponent;