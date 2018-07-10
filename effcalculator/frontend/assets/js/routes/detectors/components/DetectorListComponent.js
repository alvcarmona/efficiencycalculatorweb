/**
 * Created by alvarocbasanez on 27/07/17.
 */
import React, {Component} from 'react'
import GalleryComponent from './GalleryComponent'
import atom from '../../../../img/atom.png'
import CreateDetectorButtonContainer from '../containers/CreateDetectorButtonContainer'
import {Grid, Row, OverlayTrigger, ListGroup, ListGroupItem, Col, Glyphicon} from 'react-bootstrap'
import RefreshDetectorsContainer from '../containers/RefreshDetectorsContainer'
import {Link} from 'react-router-dom'

class DetectorlistComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (!this.props.detectors || this.props.detectors.length == 0) {
            return (<div className="DetectorListComponent"><CreateDetectorButtonContainer/>No hay detectores</div>);
        }
        return (
            <div className="DetectorListComponent">
                <Grid>
                    <Row>
                        <CreateDetectorButtonContainer/>
                        <RefreshDetectorsContainer/>
                    </Row>
                    {/*<Row>
                        <GalleryComponent detectors={this.props.detectors}/>
                    </Row>*/}
                    <Row>
                        <Col xs={4} md={3}>
                            <DetectorAnimatedlistComponent detectors={this.props.detectors}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

}

class DetectorAnimatedlistComponent extends Component {

    // Stiles in **** Detector list **** section App.css

    constructor(props) {
        super(props)
    }

    componentDidUpdate() {
        // adds show class to trigger animation
        let element = document.getElementById('detectorList').lastChild
        setTimeout(function () {
            element.className = element.className + " show";
        }, 10);

    }

    componentDidMount() {
        // adds show class in first renderization
        let elements = document.getElementById('detectorList').childNodes
        for (let i = 0; i < elements.length; i++) {
            elements[i].className = elements[i].className + " show"
        }
    }

    render() {
        const headerStyle = {
          fontSize: '20px',
          textAlign: 'left'
        };
        const elementStyle = {
          fontSize: '15px',
          textAlign: 'left'
        };
        const childElements = this.props.detectors.map(u => {
            return (

                <ListGroupItem className='detectorlistElement' href='/detectors/' key={u.id} style={elementStyle}>
                     <Glyphicon glyph="tag"/> {u.name}

                        <Link to={`/detectors/${u.id}`}><Glyphicon
                                    glyph="list-alt"/></Link>
                </ListGroupItem>

            );
        });

        return (
            <div>
                <p style={headerStyle}><b>Dector list</b></p>
                <ListGroup id={"detectorList"}>
                    {childElements}
                </ListGroup>
            </div>
        );
    }

}

export default DetectorlistComponent
