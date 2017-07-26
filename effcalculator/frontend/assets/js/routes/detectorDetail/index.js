/**
 * Created by alvarocbasanez on 25/07/17.
 */
/**
 * Created by alvarocbasanez on 12/07/17.
 */
import React, {Component} from 'react';
import axios from 'axios';
import {Route, Switch} from 'react-router-dom'
import {DetectorDetailContainer} from './containers/DetectorDetailContainer'
import {DetectorEditorContainer} from './containers/DetectorEditorContainer'

class detectorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detectors: []
        };

    }

    componentDidMount() {
        const self = this;
        axios.get(`/api/detectors`)
            .then(res => {
                self.setState({detectors: res.data});
            });
    }


    handleOnAddDetector(event) {
        event.preventDefault();
        axios.post(`/api/detectors/`, {
            name: event.target.name.value,
            threshold: event.target.threshold.value,
            angle: event.target.angle.value,
        })
            .then(res => {
                const detector = res.data;
                this.setState({
                    detectors: this.state.detectors.concat(detector)
                });
            });
    }

    render() {
        return (
            <div className="DetectorEfficiencyCalculatorContainer">
                <RoutesHandler detectors={this.state.detectors} onAddDetector={this.handleOnAddDetector.bind(this)}/>

                {/*
                 <DetectorForm onAddDetector={this.handleOnAddDetector.bind(this)} />
                 */}
            </div>
        );
    }
}

class RoutesHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {detectors: props.detectors};
        this.RenderDetectorList = (props) => {
            return (
                <DetectorList detectors={this.props.detectors}/>
            );
        };
        this.RenderDetectorDetail = (props) => {
            return (
                <DetectorDetailContainer detectors={this.props.detectors}/>
            );
        };
        this.RenderDetectorEditor = (props) => {
            return (
                <DetectorEditorContainer detectors={this.props.detectors}/>
            );
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({detectors: nextProps.detectors})
        this.forceUpdate()
    }


    render() {
        return (
            <div className="RoutesHandler">
                <Switch>
                    <Route path='/frontend/Detectors/:number/edit' render={this.RenderDetectorEditor}/>
                    <Route path='/frontend/Detectors/:number'
                           render={ routeProps => {
                               let i = 0;
                               let current = {};
                               for (; i < this.props.detectors.length; i++) {
                                   if (this.props.detectors[i].id === routeProps.match.params.number) {
                                       current = this.props.detectors[i]
                                   }
                               }
                               return (
                                   <DetectorDetail detectors={this.props.detectors} routeProps={routeProps}
                                                   currentDetector={current}/>)
                           }}/>
                </Switch>
            </div>
        );
    }

}


export default DetectorDetail;

