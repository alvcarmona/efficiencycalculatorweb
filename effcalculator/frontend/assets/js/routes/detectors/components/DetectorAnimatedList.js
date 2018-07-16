
import {connect} from 'react-redux';
import {selectDetectors} from '../../../modules/actions/index';
import React, {Component} from 'react'
import {ListGroup, ListGroupItem, Row, Glyphicon, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import CreateDetectorButtonContainer from '../containers/CreateDetectorButtonContainer'


const mapDispatchToProps = dispatch => {
  return {
    selectDetectors: detectors => dispatch(selectDetectors(detectors))
  };
};

class DetectorAnimatedlistComponent extends Component {

    // Stiles in **** Detector list **** section App.css

    constructor(props) {
        super(props)
        this.state = {multipleSelectMode: false, selected: {}}
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

    onItemClick(d) {
        console.log("selected " + d)
        let selected = this.state.selected
        if (this.state.selected[d.id]) {
            delete selected[d.id]
            document.getElementById('list' + d.id).style.backgroundColor = 'white';
            document.getElementById('list' + d.id).style.width = "100%"
            this.props.selectDetectors(selected)
        } else {
            selected[d.id] = d
            document.getElementById('list' + d.id).style.backgroundColor = '#ceeff5';
            document.getElementById('list' + d.id).style.width = "110%"
            this.props.selectDetectors(selected)
        }
    }

    render() {
        const headerStyle = {
            fontSize: '20px',
            textAlign: 'left',
            display: 'inline-flex'
        };
        const elementStyle = {
            fontSize: '15px',
            textAlign: 'left',


        };
        const childElements = this.props.detectors.map(u => {
            return (
                <ListGroupItem id={'list' + u.id} className='detectorlistElement' key={u.id} style={elementStyle}
                               onClick={() => this.onItemClick(u)}>
                    <Glyphicon glyph="tag"/> {u.name}
                    {/* <Link to={`/detectors/${u.id}`}>
                        <Glyphicon glyph="list-alt"/></Link>*/}
                </ListGroupItem>

            );
        });

        return (
            <div>


                    <Row style={headerStyle}> <b>Dector list</b> <CreateDetectorButtonContainer/></Row>


                <Row> <ListGroup id={"detectorList"}>
                    {childElements}
                </ListGroup></Row>
            </div>
        );
    }

}

export default connect(null,mapDispatchToProps)(DetectorAnimatedlistComponent)