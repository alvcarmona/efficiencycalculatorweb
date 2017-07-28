/**
 * Created by alvarocbasanez on 27/07/17.
 */
import React, { Component } from 'react'
import GalleryComponent from './GalleryComponent'
import { ListGroup, Grid, Row } from 'react-bootstrap'


class DetectorlistComponent extends Component {
    constructor(props){
        super(props)
    }
  render () {
      if (!this.props.detectors || this.props.detectors.length == 0) {
          return (<div className="DetectorListComponent">No hay detectores</div>);
      }
    return (
        <div className="DetectorListComponent">
            <Grid>
                <Row>
                    <GalleryComponent detectors ={this.props.detectors}/>
                </Row>
            </Grid>
        </div>
    );
  }
}

export default DetectorlistComponent;