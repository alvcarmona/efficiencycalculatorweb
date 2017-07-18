/**
 * Created by alvarocbasanez on 18/07/17.
 */
import React, { Component } from 'react';
import { Table} from 'react-bootstrap'



class TableRow extends React.Component {
  render() {
    /* the ES6 version of const data = this.props.data */
    const {data} = this.props;
    /*
    use map to perform the same function on
    each element in the obj array
    */
    const row = data.map((data) =>
    <tr>
       <td>1</td>
        <td>{data.backscatter}</td>
        <td>{data.substrate}</td>
    </tr>
    );
    return (
      <div>{row}</div>
    );
  }
}

class Blades extends Component {
  render () {
      const row = this.props.blades.map((data) =>
            <tr>
               <td>1</td>
                <td>{data.backscatter}</td>
                <td>{data.substrate}</td>
            </tr>
    );
        return (
            <Table striped bordered condensed hover responsive>
    <thead>
      <tr>
        <th>#</th>
        <th>Backscattering</th>
        <th>Substrate</th>
      </tr>
    </thead>
    <tbody>
    {row}
    </tbody>
  </Table>
    );
  }
}

export default Blades;