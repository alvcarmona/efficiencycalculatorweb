/**
 * Created by alvarocbasanez on 12/07/17.
 */
import React, { Component } from 'react';
import DetectorList from '../components/DetectorList';
import DetectorForm from '../components/DetectorForm';
import DetectorDetail from './DetectorDetail'
import axios from 'axios';
import { Route, Switch } from 'react-router-dom'

class DetectorEfficiencyCalculator extends Component {
  constructor() {
    super();
        this.state = {
        detectors: []
    };
        axios.get(`/detectors`)
      .then(res => {
          console.log('answer from server')
        const detectors = res.data;
        this.setState({ detectors });
      });
  }

    componentDidMount() {
    }

    handleOnAddDetector (event) {
    event.preventDefault();
    axios.post(`/detectors/`,{
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
    console.log(this.state.detectors);
    return (
      <div className="DetectorEfficiencyCalculator">
          <Switch>
            <Route exact path='/frontend/Detectors' component={DetectorList} detectors={this.state.detectors}/>
          </Switch>
          <p><strong>Add some detectors</strong></p>
        <div>
            <DetectorList detectors={this.state.detectors}/>
            <DetectorForm onAddDetector={this.handleOnAddDetector.bind(this)} />
        </div>
      </div>
    );
  }
}

export default DetectorEfficiencyCalculator;