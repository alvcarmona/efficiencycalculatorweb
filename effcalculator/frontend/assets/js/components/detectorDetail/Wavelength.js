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
      const row = this.props.wave.map((data, index) =>
            <tr>
               <td>{index+1}</td>
                <td>{data.angstrom} Å</td>
                <td>{data.weight} %</td>
            </tr>
    );
        return (
            <Row><Col md={4} mdPush={4}>
                <h2>Wavelength</h2>
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
  }
}

export default Wavelength;