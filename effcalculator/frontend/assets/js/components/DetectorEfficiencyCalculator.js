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
          <DetectorForm onAddDetector={this.handleOnAddDetector.bind(this)} />
      </div>
    );
  }
}

class RoutesHandler extends Component{
    constructor(props) {
        super(props);
        this.state        = { detectors: props.detectors  } ;
    }
    componentWillReceiveProps(nextProps) {
        this.setState({detectors:nextProps.detectors})
        this.forceUpdate()
    }
      render() {
    return (
      <div className="RoutesHandler">
          {/* <Switch>
              <Route exact path='/frontend/Detectors' component={DetectorList} detectors={this.props.detectors}/>
              <Route  path='/frontend/Detectors/:number' component={DetectorDetail} detectors={this.props.detectors}/>
          </Switch>
          <p><strong>Add some detectors</strong></p>*/}
          <Switch>
            <Route path='/frontend/Detectors' component={DetectorList} detectors={this.state.detectors}/>
              <Route  path='/frontend/Detectors/:number' component={DetectorDetail} detectors={this.state.detectors}/>
          </Switch>
          <DetectorList detectors={this.state.detectors}/>
      </div>
    );
  }

}



export default DetectorEfficiencyCalculator;

