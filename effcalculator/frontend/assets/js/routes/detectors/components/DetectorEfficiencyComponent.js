/**
 * Created by alvarocbasanez on 13/07/17.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Grid, Button,Row, Col} from 'react-bootstrap'
import {Line, Doughnut} from 'react-chartjs-2';

class TotalEfficiencyPlot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                labels: [
                    'Total Efficiency: '+this.props.data.toString()+' %'
                ],
                datasets: [{
                    data: [this.props.data, 100-this.props.data],
                    backgroundColor: [
                        '#8cbbff',
                        '#d3d7d2',
                    ],
                    hoverBackgroundColor: [
                        '#8cbbff',
                        '#d3d7d2',
                    ]
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
        return <Doughnut data={this.state.data}/>
    }
}

class EffVsThicknessPlot extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            data: {
                labels: this.props.data.x,
                datasets: [
                    {
                        label: 'EffVsThicknessPlot',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.props.data.y
                    }
                ]
            },
            options: {
                showLines: true,
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
        return <Line data={this.state.data}/>
    }
}

class DetectorEfficiencyComponent extends Component {

    constructor(props) {
        super(props);
    };


    render() {
        if (!this.props.detector) {
            return (
                <div className="DetectorEfficiencyComponent">
                    <Link to={`/frontend/detectors/`}>atras</Link>
                </div>)
        }
        return (
            <div className="DetectorEfficiencyComponent">
                <Link to={`/frontend/detectors/`}> To detector list </Link>
                <Grid>
                    <Row>
                        <h2>Detector Efficiency Information</h2>
                    </Row>
                    <Row>
                        <Button onClick={(e) => {this.props.setMetadata(this.props.detector);}}>
                            Calculate Efficiency
                        </Button>
                    </Row>
                    <Row>
                        <Col xs={6} xsOffset={3}>
                            <TotalEfficiencyPlot data={this.props.detector.metadata.total_efficiency}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <Row>
                                <h2>Efficiency Vs. Blade Thickness Plot</h2>
                            </Row>
                            <Row className="plotRow">
                                <EffVsThicknessPlot data={this.props.detector.metadata.eff_vs_layer_thickness}/>
                            </Row>
                        </Col>
                        <Col xs={6}>
                            <Row>
                                <h2>Efficiency Vs. Blade Wavelength Plot</h2>
                            </Row>
                            <Row className="plotRow">
                                 <EffVsThicknessPlot data={this.props.detector.metadata.eff_vs_wavelength}/>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}


export default DetectorEfficiencyComponent;
