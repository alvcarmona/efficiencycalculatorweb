
import React, {Component} from 'react'
import {ListGroup, ListGroupItem, Glyphicon} from 'react-bootstrap'


export default class DetectorAnimatedlistComponent extends Component {

    // Stiles in **** Detector list **** section App.css

    constructor(props) {
        super(props)
        this.state = {multipleSelectMode: false, selected: {}}
        ///adesfasdf
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
        let selected = {}
        if (this.state.selected[d.id]) {
            document.getElementById('list' + d.id).style.backgroundColor = 'white';
            document.getElementById('list' + d.id).style.width = "100%"
            this.props.selectDetectors({})
        } else {
            let c = document.getElementById('detectorList').children
            for (let it of c){
                it.style.backgroundColor = 'white';
                it.style.width = "100%"
            }
            selected[d.id] = d
            document.getElementById('list' + d.id).style.backgroundColor = '#ceeff5';
            document.getElementById('list' + d.id).style.width = "110%"
            this.props.selectDetectors(selected)
        }
    }

    render() {
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
             <ListGroup id={"detectorList"}>
                    {childElements}
                </ListGroup>
        );
    }

}
