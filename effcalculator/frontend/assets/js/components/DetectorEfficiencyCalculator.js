/**
 * Created by alvarocbasanez on 12/07/17.
 */
import React, { Component } from 'react';
import DetectorList from '../components/detectorList/DetectorList';
import DetectorForm from '../components/DetectorForm';
import DetectorDetail from './detectorDetail/DetectorDetail'
import axios from 'axios';
import { Route, Switch } from 'react-router-dom'

class DetectorEfficiencyCalculator extends Component {
  constructor(props) {
    super(props);
        this.state = {
        detectors: []
    };

  }
   componentDidMount(){
    const self = this;
        axios.get(`/api/detectors`)
      .then(res => {
         self.setState({ detectors : res.data });
      });
  }



    handleOnAddDetector (event) {
    event.preventDefault();
    axios.post(`/api/detectors/`,{
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
      <div className="DetectorEfficiencyCalculator">
          <RoutesHandler detectors={this.state.detectors} onAddDetector={this.handleOnAddDetector.bind(this)}/>

          {/*
          <DetectorForm onAddDetector={this.handleOnAddDetector.bind(this)} />
          */}
      </div>
    );
  }
}

class RoutesHandler extends Component{
    constructor(props) {
        super(props);
        this.state        = { detectors: props.detectors  } ;
        this.RenderDetectorList = (props) => {
            return (
                <DetectorList detectors={this.props.detectors}/>
                );
            };
        this.RenderDetectorDetail = (props) => {
            return (
                <DetectorDetail detectors={this.props.detectors}/>
            );
    };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({detectors:nextProps.detectors})
        this.forceUpdate()
    }


      render() {
    return (
      <div className="RoutesHandler">
          <Switch>
          <Route  exact path='/frontend/Detectors' render={this.RenderDetectorList} />
          <Route  path='/frontend/Detectors/:number'
                  render={ routeProps => {
                             let i = 0;
                             let current = {};
              for (;i < this.props.detectors.length; i++) {
            if (this.props.detectors[i].id === routeProps.match.params.number) {
                current = this.props.detectors[i]
            }
        }
                      return (
                <DetectorDetail detectors={this.props.detectors} routeProps={routeProps} currentDetector={current}/>)}}/>
              </Switch>
      </div>
    );
  }

}




export default DetectorEfficiencyCalculator;

