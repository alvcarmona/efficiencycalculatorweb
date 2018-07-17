
import React, {Component} from 'react'
import {connect} from 'react-redux';
import DetectorModuleDetailContainer from '../containers/DetectorModuleDetailContainer'
import ExplanationComponent from '../../ExplanationComponent'

function mapStateToProps(state) {
    return {detectorsSelected: state.example.detectorsSelected }
}

@connect(mapStateToProps)
class MiddlePanel extends Component {
  constructor(props) {
    super(props);

  }
    componentWillUpdate(){
      let panel = document.getElementById('middlePanel').firstElementChild
        panel.className = panel.className + "fadeOut"
    }
    componentDidUpdate(){
      let panel = document.getElementById('middlePanel').firstElementChild
            panel.className = panel.className + "fadeIn animated"
    }
  render() {
    const detectorsSelected = this.props.detectorsSelected;
    let middlepanel
    if (Object.keys(detectorsSelected).length >1) {
      middlepanel = <b>More than one selected, comparison coming soon</b>;
    } else if (Object.keys(detectorsSelected).length === 0){
      middlepanel =<div> <b>Select a detector</b><ExplanationComponent/></div>
    }else if (Object.keys(detectorsSelected).length === 1){
        middlepanel = <DetectorModuleDetailContainer detector={this.props.detectorsSelected[Object.keys(detectorsSelected)[0]]}/>
    }
    return (
      <div id={'middlePanel'}>
        {middlepanel}
      </div>
    );
  }
}

class DetectorDetailsComponent extends Component {

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
        if (this.state.selected[d.id]) {
            delete this.state.selected[d.id]
            document.getElementById('list' + d.id).style.backgroundColor = 'white';
            this.props.selectDetectors(this.state.selected)
        } else {
            this.state.selected[d.id] = d
            document.getElementById('list' + d.id).style.backgroundColor = '#ceeff5';
            this.props.selectDetectors(this.state.selected)
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
                <ListGroupItem id={'list' + u.id} className='detectorlistElement' key={u.id} style={elementStyle}
                               onClick={() => this.onItemClick(u)}>
                    <Glyphicon glyph="tag"/> {u.name}
                    <Link to={`/detectors/${u.id}`}>
                        <Glyphicon glyph="list-alt"/></Link>
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

export default MiddlePanel
