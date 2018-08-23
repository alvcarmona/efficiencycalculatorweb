/**
 * Created by alvarocbasanez on 18/07/17.
 */
import React, {Component} from 'react';
import {Table, Row, Col} from 'react-bootstrap'
import {Scatter} from 'react-chartjs-2'

class BladeThicknessDepthPlot extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let dataList = [];
        let labels = [];
        let ymax = 0;
        this.props.blades.map(function (data, index) {
            dataList.push({x: index + 1, y: Math.round(data.backscatter*1000)/1000});
            if (data.backscatter > ymax) {
                ymax = data.backscatter + 1;
            }
            labels.push(String(index + 1))
        });
        const data =  {
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
            }
        const options = {
                showLines: false,
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom',
                        scaleLabel: {
                            display: true,
                            labelString: 'Blade position'
                        },
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                            max: this.props.blades.length + 1

                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Blade thickness'
                        },

                        ticks: {
                            beginAtZero: true,
                            max: ymax
                        }
                    }]
                }
            }
        return <Scatter ref='chart' data={data} options={options} width={400} height={250}/>
    }
}


class BladeTable extends Component {
    render() {
        let row = <p>There are no blades</p>
        if (this.props.blades != undefined) {
            if (this.props.blades.length > 0) {
                row = this.props.blades.map((data, index) =>
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{(Math.round(data.backscatter * 1000) / 1000)} µm</td>
                        <td>{data.substrate} mm</td>
                    </tr>
                );
            }
        }
        return (

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
        );
    }
}


class Blades extends Component {
    render() {
        let row = <p>There are no blades</p>
        if (this.props.blades != undefined) {
            if (this.props.blades.length > 0) {
                row = this.props.blades.map((data, index) =>
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{(Math.round(data.backscatter * 100) / 100)} µm</td>
                        <td>{data.substrate} mm</td>
                    </tr>
                );
            }
        }
        return (
            <Row>
                    <Col xs={8}  md={6}  className="BladeThicknessPlot">
                        <h4>Blade position VS converter thickness Plot</h4>
                        <BladeThicknessDepthPlot blades={this.props.blades}/>
                    </Col>
                    <Col sm={6} md={4} className="BladeThicknessTable">
                        <h4>Blade list</h4>
                        <BladeTable blades={this.props.blades}/>
                    </Col>
            </Row>
        );
    }
}


export {Blades, BladeTable};
