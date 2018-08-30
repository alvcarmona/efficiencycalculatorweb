/**
 * Created by alvarocbasanez on 13/07/17.
 */
import React, {Component} from 'react';
import {Button, Row, Col, Panel, small} from 'react-bootstrap'
import {Line, Doughnut} from 'react-chartjs-2';
import {createDownloadLink, closest} from '../../../utils.js'

class DetectorEfficiencyComponent extends Component {

    constructor(props) {
        super(props);
    };

    componentDidMount() {
    }

    render() {
        if (this.props.detector.wavelength.length === 0 || this.props.detector.blades.length === 0) {
            return (
                <div className="DetectorEfficiencyComponent">
                    <Col sm={4}>
                        <Panel bsStyle="danger">
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">Incomplete configuration</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>wavelenght and blades to
                                calculate efficiency.</Panel.Body>
                        </Panel>
                    </Col>
                </div>)
        }
        return (
            <DetectorEfficiencyCompleteComponent detector={this.props.detector}/>
        );
    }
}

class DetectorEfficiencyCompleteComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalColor: '#8cbbff',
            bsColor: '#ff3c79',
            tsColor: '#bc1aff'
        }
    };

    componentDidMount() {
        this.createExports()
    }

    createExports() {
        console.log('debug me')
        const obj = {
            name: this.props.detector.name,
            angle: this.props.detector.angle,
            converter: this.props.detector.converter,
            single: this.props.detector.single,
            threshold: this.props.detector.threshold,
            blades: this.props.detector.blades,
            wavelength: this.props.detector.wavelength
        };
        const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
        createDownloadLink(data, 'detector.json', 'downloadThickPlot')
        createDownloadLink(data, 'detector.json', 'downloadWavePlot')
    }

    render() {
        return (
            <div>
                <Row>
                    <h5> Optimization options:</h5>
                    {this.props.detector.single && this.props.detector.metadata.eff_vs_layer_thickness.x.length > 0 ?
                        <div></div> :
                        <Button bsStyle="primary" onClick={this.props.optimizeDetectorDiffThickness}>
                            Optimize different thickness
                        </Button>
                    }
                    {this.props.detector.metadata.eff_vs_layer_thickness.x.length > 0 ?

                        <Button bsStyle="primary" onClick={this.props.optimizeDetectorThickness}> Optimize
                            converter
                            thickness</Button>
                        :
                        <div></div>
                    }
                </Row>
                <Row><h5>Efficiency plots</h5></Row>
                <Row className='plot-row plot-row-total'>
                    <Col md={6} smOffset={2} mdOffset={3}>
                        <div className='plot-row-element'>
                            <TotalEfficiencyPlot data={this.props.detector.metadata.total_efficiency}/>
                        </div>

                    </Col>
                </Row>
                <Row className='plot-row plot-row-meta'>
                    <Col sm={8} smOffset={1} mdOffset={2}>

                        <div>
                            <Row>
                                <b>Efficiency Vs. Blade Thickness Plot</b>
                            </Row>
                            <Row className='plot-row-element'>
                                <EffVsThickPlotHandler detector={this.props.detector}/>
                                <div id='downloadThickPlot'></div>
                            </Row>
                        </div>
                        <div>
                            <Row>
                                <b>Efficiency Vs. Blade Wavelength Plot</b>
                            </Row>
                            <Row className='plot-row-element'>
                                {this.props.detector.single ?
                                    <LinePlotHandler
                                        efficiency={this.props.detector.metadata.total_efficiency}
                                        x={this.props.detector.metadata.eff_vs_wavelength.x}
                                        values={[
                                            {
                                                y: this.props.detector.metadata.eff_vs_wavelength.y,
                                                name: 'Total eff',
                                                color: this.state.totalColor
                                            },
                                            {
                                                y: this.props.detector.metadata.eff_vs_wavelength_ts.y,
                                                name: 'Transmission eff',
                                                color: this.state.tsColor
                                            },
                                            {
                                                y: this.props.detector.metadata.eff_vs_wavelength_bs.y,
                                                name: 'Backscattering eff',
                                                color: this.state.bsColor
                                            }
                                        ]
                                        }
                                    />
                                    :
                                    <LinePlotHandler
                                        efficiency={this.props.detector.metadata.total_efficiency}
                                        x={this.props.detector.metadata.eff_vs_wavelength.x}
                                        values={[
                                            {
                                                y: this.props.detector.metadata.eff_vs_wavelength.y,
                                                name: 'Total eff',
                                                color: this.state.totalColor
                                            },
                                        ]}

                                    />
                                }
                                <div id='downloadWavePlot'></div>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

class TotalEfficiencyPlot extends Component {
    constructor(props) {
        super(props);


    }

    render() {
        const config = {
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
        return <Doughnut data={config.data}/>
    }
}

class EffVsThickPlotHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalColor: '#8cbbff',
            bsColor: '#ff3c79',
            tsColor: '#bc1aff'
        }
    };

    componentDidMount() {

    }
    shouldComponentUpdate(){
        console.log('upda')
    }

    componentWillReceiveProps(){
         this.forceUpdate();
    }

    render() {
        if (this.props.detector.single) {
            return (<LinePlotHandler
                efficiency={this.props.detector.metadata.total_efficiency}
                x={this.props.detector.metadata.eff_vs_layer_thickness.x}
                values={[
                    {
                        y: this.props.detector.metadata.eff_vs_layer_thickness.y,
                        name: 'Total eff',
                        color: this.state.totalColor
                    },
                    {
                        y: this.props.detector.metadata.eff_vs_tslayer_thickness.y,
                        name: 'Transmission eff',
                        color: this.state.tsColor
                    },
                    {
                        y: this.props.detector.metadata.eff_vs_bslayer_thickness.y,
                        name: 'Backscattering eff',
                        color: this.state.bsColor
                    }
                ]
                }
            />)
        } else {
            return (<LinePlotHandler
                efficiency={this.props.detector.metadata.total_efficiency}
                x={this.props.detector.metadata.eff_vs_layer_thickness.x}
                values={[
                    {
                        y: this.props.detector.metadata.eff_vs_layer_thickness.y,
                        name: 'Total eff',
                        color: this.state.totalColor
                    },
                ]}

            />)
        }

    }
}

class EffVsWavePlotHandler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalColor: '#8cbbff',
            bsColor: '#ff3c79',
            tsColor: '#bc1aff'
        }
    };

    componentDidMount() {
    }


    render() {
        if (this.props.detector.single) {
            return ( <LinePlotHandler
                                        efficiency={this.props.detector.metadata.total_efficiency}
                                        x={this.props.detector.metadata.eff_vs_wavelength.x}
                                        values={[
                                            {
                                                y: this.props.detector.metadata.eff_vs_wavelength.y,
                                                name: 'Total eff',
                                                color: this.state.totalColor
                                            },
                                            {
                                                y: this.props.detector.metadata.eff_vs_wavelength_ts.y,
                                                name: 'Transmission eff',
                                                color: this.state.tsColor
                                            },
                                            {
                                                y: this.props.detector.metadata.eff_vs_wavelength_bs.y,
                                                name: 'Backscattering eff',
                                                color: this.state.bsColor
                                            }
                                        ]
                                        }
                                    />)
        } else {
            return ( <LinePlotHandler
                                        efficiency={this.props.detector.metadata.total_efficiency}
                                        x={this.props.detector.metadata.eff_vs_wavelength.x}
                                        values={[
                                            {
                                                y: this.props.detector.metadata.eff_vs_wavelength.y,
                                                name: 'Total eff',
                                                color: this.state.totalColor
                                            },
                                        ]}

                                    />)
        }

    }
}

class LinePlotHandler extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        if (this.refs.chart.chart_instance) {
            let closestValue = closest(this.refs.chart.chart_instance.data.datasets[0].data, Number(this.props.efficiency))
            let i = this.refs.chart.chart_instance.data.datasets[0].data.indexOf(closestValue)
            this.refs.chart.chart_instance.data.datasets[0].backgroundColor[i] = "red";
            this.refs.chart.chart_instance.data.datasets[0].pointRadius[i] = 3
        }
    }

    getPlotData(values, label, radius, colors) {
        console.log('debug colors')
        return {
            label: label,
            fill: false,
            borderColor: colors,
            backgroundColor: colors,
            pointBackgroundColor: colors,
            pointBorderColor: colors,
            lineTension: 0.1,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointRadius: radius,
            radius: radius,
            pointHitRadius: 1,
            data: values
        }
    }

    getChartData(labels, dataset) {
        return {
            data: {
                labels: labels,
                datasets: dataset
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

    getXConf(x) {
        let labels = [];
        let colors = [];
        let radius = [];
        x.forEach((element) => {
            labels.push(Math.round(element * 100) / 100);
            colors.push('#8cbbff');
            radius.push(0.5);
        });
        return [labels, radius, colors];
    }

    generateConfig(x, values) {
        let xconf = this.getXConf(x);
        let colors = xconf[2];
        let radius = xconf[1];
        let xlabels = xconf[0];
        let dataset = [];
        values.map((elem) => {
            dataset.push(this.getPlotData(elem.y, elem.name, radius, elem.color));
        });
        return this.getChartData(xlabels, dataset);
    }

    render() {
        let config = this.generateConfig(this.props.x, this.props.values);
        return <Line ref='chart' data={config.data} width={400} height={300}/>
    }
}

export default DetectorEfficiencyComponent;

