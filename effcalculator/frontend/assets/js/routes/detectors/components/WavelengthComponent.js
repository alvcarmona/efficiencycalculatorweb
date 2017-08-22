/**
 * Created by alvarocbasanez on 18/07/17.
 */
/**
 * Created by alvarocbasanez on 18/07/17.
 */
import React, { Component } from 'react';
import { Table, Row, Col} from 'react-bootstrap'

class Wavelength extends Component {

  render () {
      if (this.props.wave.length !== 0) {
          const row = this.props.wave.map((data, index) =>
              <tr>
                  <td>{index + 1}</td>
                  <td>{data.angstrom} Å</td>
                  <td>100 %</td>
              </tr>
          );
          return (
              <Row><Col md={4} mdPush={4}>
                  <h3>Wavelength</h3>
                  <Table striped bordered condensed hover responsive>
                      <thead>
                      <tr>
                          <th>#</th>
                          <th>Angstrom</th>
                          <th>Weight</th>
                      </tr>
                      </thead>
                      <tbody>
                      {row}
                      </tbody>
                  </Table>
              </Col>
              </Row>
          );
      }else{
          return(<p>There is no wavelength </p>)
      }
  }
}

export default Wavelength;