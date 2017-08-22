/**
 * Created by alvarocbasanez on 18/07/17.
 */
import React, {Component} from 'react';
import {Table, Row, Col} from 'react-bootstrap'
import {Scatter} from 'react-chartjs-2'

class BladeThicknessDepthPlot extends Component {
    constructor(props) {
        super(props);
        let dataList = [];
        let labels = [];
        let ymax = 0;
        this.props.blades.map(function (data, index) {
            dataList.push({x: index + 1, y: data.backscatter});
            if (data.backscatter > ymax) {
                ymax = data.backscatter + 1;
            }
            labels.push(String(index + 1))
        });

        this.state = {
            data: {
                labels: labels,
                datasets: [{
                    label: 'Blade converter thickness in depth',
                    data: dataList,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                showLines: false,
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom',
                        ticks: {
                            beginAtZero: true,
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
                },
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: ymax
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            }
        }
    }

    render() {
        return <Scatter data={this.state.data} options={this.state.options} width="500" height="250"/>
    }
}

class Blades extends Component {
    render() {
        let row = <p>There are no blades</p>
        if(this.props.blades != undefined){
            if (this.props.blades.length > 0) {
            row = this.props.blades.map((data, index) =>
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.backscatter} µm</td>
                    <td>{data.substrate} µm</td>
                </tr>
            );
        }
        }
        return (
            <Row>
                <Col md={12}>
                    <Col md={7}>
                        <BladeThicknessDepthPlot blades={this.props.blades}/>
                    </Col>
                    <Col md={4}>
                        <Table striped bordered condensed hover responsive>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Converter Thickness</th>
                                <th>Substrate</th>
                            </tr>
                            </thead>
                            <tbody>
                            {row}
                            </tbody>
                        </Table>
                    </Col>
                </Col>
            </Row>
        );
    }
}


export default Blades;