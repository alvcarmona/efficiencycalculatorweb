/**
 * Created by alvarocbasanez on 13/07/17.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Grid, Button, Row, Col, Panel, PageHeader, small} from 'react-bootstrap'
import {Line, Doughnut} from 'react-chartjs-2';
import RefreshDetectorsContainer from '../containers/RefreshDetectorsContainer'


class TotalEfficiencyPlot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                labels: [
                    'Total Efficiency: ' + this.props.data.toString() + ' %'
                ],
                datasets: [{
                    data: [this.props.data, 100 - this.props.data],
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
                }
            }
        }
    }

    render() {
        return <Line data={this.state.data} width={400} height={300}/>
    }
}

class EffVsWavelengthPlot extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            data: {
                labels: this.props.data.x,
                datasets: [
                    {
                        label: 'EffVsWavelengthPlot',
                        fill: false,
                        borderWidth: 1,
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
                        pointRadius: 0,
                        pointHitRadius: 1,
                        data: this.props.data.y
                    }
                ]
            },
            options: {
                showLines: true,
                scales: {
                    xAxes: [{
                        type: 'linear',
                        scaleLabel: {
                            display: true,
                            labelString: 'Wavelength (KeV)'
                        },
                        position: 'bottom',
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                            max: 10
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Total efficiency %'
                        },
                        ticks: {
                            beginAtZero: true,
                            max: 1
                        }
                    }]
                }
            }
        }
    }

    render() {
        return <Line data={this.state.data} width={400} height={300}/>
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
                    <Link to={`/detectors/`}>atras</Link>
                </div>)
        }
        if (this.props.detector.wavelength.length === 0 || this.props.detector.blades.length === 0) {
            return (
                <div className="DetectorEfficiencyComponent">
                    <Link to={`/detectors/`}> To detector list </Link>

                    <Panel header={'Incomplete configuration'} bsStyle="danger" className={'danger-config'}> Configure
                        wavelenght and blades to
                        calculate efficiency.
                    <Link to={`/detectors/`+this.props.detector.id+'/edit'}>Go to edit page</Link>
                    </Panel>

                </div>)

        }
        return (
            <div className="DetectorEfficiencyComponent">
                <Link to={`/detectors/`}> To detector list </Link>
                <Grid>
                    <RefreshDetectorsContainer/>
                    <Row>
                         <PageHeader> Detector configuration Information <small> efficiency </small></PageHeader>
                    </Row>

                    <Row>
                        <Col xs={6} xsOffset={3}>
                            <TotalEfficiencyPlot data={this.props.detector.metadata.total_efficiency}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <Row>
                                <h3>Efficiency Vs. Blade Thickness Plot</h3>
                            </Row>
                            <Row className="plotRow">
                                <EffVsThicknessPlot data={this.props.detector.metadata.eff_vs_layer_thickness}/>
                            </Row>
                        </Col>
                        <Col xs={6}>
                            <Row>
                                <h3>Efficiency Vs. Blade Wavelength Plot</h3>
                            </Row>
                            <Row className="plotRow">
                                <EffVsWavelengthPlot data={this.props.detector.metadata.eff_vs_wavelength}/>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}


export default DetectorEfficiencyComponent;

