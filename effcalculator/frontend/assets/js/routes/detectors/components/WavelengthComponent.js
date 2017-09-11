/**
 * Created by alvarocbasanez on 18/07/17.
 */
/**
 * Created by alvarocbasanez on 18/07/17.
 */
import React, {Component} from 'react';
import {Table} from 'react-bootstrap'

class Wavelength extends Component {

    render() {
        if (this.props.wave.length !== 0) {
            const row = this.props.wave.map((data, index) =>
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.angstrom} Å</td>
                    <td>100 %</td>
                </tr>
            );
            return (

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

            );
        } else {
            return (<p>There is no wavelength </p>)
        }
    }
}

export default Wavelength;