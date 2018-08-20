import {connect} from 'react-redux';
import {selectDetectors} from '../../../modules/actions/index';
import React, {Component} from 'react'
import {ListGroup, ListGroupItem, Row, Glyphicon, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import CreateDetectorButtonContainer from '../containers/CreateDetectorButtonContainer'
import DetectorAnimatedlistComponent from '../components/DetectorAnimatedList'

const mapDispatchToProps = dispatch => {
    return {
        selectDetectors: detectors => dispatch(selectDetectors(detectors))
    };
};

export class DetectorAnimatedlistContainer extends Component {


    render() {
        const headerStyle = {
            fontSize: '20px',
            textAlign: 'left',
            display: 'inline-flex'
        };


        return (
            <div>
                <Row style={headerStyle}> <b>Detector list</b> <CreateDetectorButtonContainer/></Row>
                <Row>
                    <DetectorAnimatedlistComponent detectors={this.props.detectors} selectDetectors={this.props.selectDetectors}/>
                </Row>
            </div>
        );
    }

}

export default connect(null, mapDispatchToProps)(DetectorAnimatedlistContainer)