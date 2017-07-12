import React, { Component } from 'react';
import DetectorList from '../components/DetectorList';
import DetectorForm from '../components/DetectorForm';
import logo from '../../img/logo.svg';
import '../../styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
        detectors: [
            {id:1, name: 'detector1' ,single: true, threshold: 100,angle: 90},
            {id:2, name: 'detector1' ,single: false, threshold: 200,angle: 90},
            {id:3, name: 'detector1' ,single: true, threshold: 300,angle: 90},
            {id:4, name: 'detector1' ,single: false, threshold: 50,angle: 90},
            ]
    };
  }

    handleOnAddDetector (event) {
    event.preventDefault();
    let detector = {
        name: event.target.name.value,
        threshold: event.target.threshold.value,
        angle: event.target.angle.value,
    };
    this.setState({
      detectors: this.state.detectors.concat([detector])
    });
  }

  render() {
    console.log(this.state.users);
    return (
      <div className="App">
        <div className="App-header">
         <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the Neutron detector efficiency calculator</h2>
        </div>
        <div>
          <p><strong>Add some detectors</strong></p>
          <DetectorList detectors={this.state.detectors}/>
            <DetectorForm onAddDetector={this.handleOnAddDetector.bind(this)} />
        </div>
      </div>
    );
  }
}

export default App;