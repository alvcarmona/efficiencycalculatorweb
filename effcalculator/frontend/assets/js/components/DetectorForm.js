import React, { Component } from 'react'

export default class DetectorForm extends Component{
  render(){
    return (
      <form onSubmit={this.props.onAddDetector}>
          <input type="text" placeholder="Name" name="name" />
          <input type="number" name="angle" min="1" max="90"/>
          <input type="threshold" name="threshold" min="1" max="800"/>
          <input type="submit" value="Guardar" />
      </form>
    );
  }
}
