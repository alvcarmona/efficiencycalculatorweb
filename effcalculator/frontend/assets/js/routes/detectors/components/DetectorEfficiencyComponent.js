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

class EffVsThicknessPlot extends Component {

    closest(array, num) {
        let i = 0;
        let minDiff = 1000;
        let ans;
        for (i in array) {
            let m = Math.abs(num - array[i]);
            if (m < minDiff) {
                minDiff = m;
                ans = array[i];
            }
        }
        return ans;
    }


    componentDidMount() {
        if (this.refs.chart.chart_instance) {
            let closestValue = this.closest(this.refs.chart.chart_instance.data.datasets[0].data, Number(this.props.detector.metadata.total_efficiency))
            let i = this.refs.chart.chart_instance.data.datasets[0].data.indexOf(closestValue)
            this.refs.chart.chart_instance.data.datasets[0].backgroundColor[i] = "red";
            this.refs.chart.chart_instance.data.datasets[0].pointRadius[i] = 3
        }
    }

    constructor(props) {
        super(props);
    }

    render() {
        console.log("render EffVSthick     .................")
        let xlabels = []
        this.props.detector.metadata.eff_vs_layer_thickness.x.forEach((element) => {
            xlabels.push(Math.round(element * 100) / 100)
        })

        let colors = []
        let radius = []
        for (let j = 0; j < this.props.detector.metadata.eff_vs_layer_thickness.x.length; j++) {
            colors.push('#8cbbff')
            radius.push(0.5)
        }

        let dataset = [{
            label: 'Total eff',
            fill: false,
            lineTension: 0.1,
            backgroundColor: colors,
            borderColor: '#8cbbff',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: colors,
            pointBackgroundColor: '#ff0011',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#8cbbff',
            pointHoverBorderColor: '#8cbbff',
            pointHoverBorderWidth: 2,
            pointRadius: radius,
            radius: radius,
            pointHitRadius: 1,
            data: this.props.detector.metadata.eff_vs_layer_thickness.y
        }]
        if (this.props.detector.single) {
            dataset.push({
                    label: 'Transmission eff',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#ff3c79',
                    borderColor: '#ff3c79',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#ff3c79',
                    pointBackgroundColor: '#ff3c79',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#ff3c79',
                    pointHoverBorderColor: '#ff3c79',
                    pointHoverBorderWidth: 2,
                    pointRadius: radius,
                    radius: radius,
                    pointHitRadius: 1,
                    data: this.props.detector.metadata.eff_vs_tslayer_thickness.y
                },
                {
                    label: 'Backscattering eff',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#bc1aff',
                    borderColor: '#bc1aff',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#bc1aff',
                    pointBackgroundColor: '#bc1aff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#bc1aff',
                    pointHoverBorderColor: '#bc1aff',
                    pointHoverBorderWidth: 2,
                    pointRadius: radius,
                    radius: radius,
                    pointHitRadius: 1,
                    data: this.props.detector.metadata.eff_vs_bslayer_thickness.y
                })
        }
        const config = {
            data: {
                labels: xlabels,
                datasets: dataset
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
        return <Line ref='chart' data={config.data} width={400} height={300}/>
    }
}

class EffVsWavelengthPlot extends Component {

    closest(array, num) {
        let i = 0;
        let minDiff = 1000;
        let ans;
        for (i in array) {
            let m = Math.abs(num - array[i]);
            if (m < minDiff) {
                minDiff = m;
                ans = array[i];
            }
        }
        return ans;
    }
    

    componentDidMount() {
        if (this.refs.chart.chart_instance) {
            let closestValue = this.closest(this.refs.chart.chart_instance.data.datasets[0].data, Number(this.props.detector.metadata.total_efficiency))
            let i = this.refs.chart.chart_instance.data.datasets[0].data.indexOf(closestValue)
            this.refs.chart.chart_instance.data.datasets[0].backgroundColor[i] = "red";
            this.refs.chart.chart_instance.data.datasets[0].pointRadius[i] = 3
        }
    }

    constructor(props) {
        super(props);
    }
    generateConfig(){
         let colors = []
        let radius = []
        for (let j = 0; j < this.props.detector.metadata.eff_vs_wavelength.x.length; j++) {
            colors.push('#8cbbff')
            radius.push(0.5)
        }
        let xlabels = []
        this.props.detector.metadata.eff_vs_wavelength.x.forEach((element) => {
            xlabels.push(Math.round(element * 100) / 100)
        })
        let dataset = [{
            label: 'Total eff',
            fill: false,
            lineTension: 0.1,
            backgroundColor: colors,
            borderColor: '#8cbbff',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: colors,
            pointBackgroundColor: '#ff0011',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#8cbbff',
            pointHoverBorderColor: '#8cbbff',
            pointHoverBorderWidth: 2,
            pointRadius: radius,
            radius: radius,
            pointHitRadius: 1,
            data: this.props.detector.metadata.eff_vs_wavelength.y
        }]
        if (this.props.detector.single) {
            dataset.push({
                    label: 'Transmission eff',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#ff3c79',
                    borderColor: '#ff3c79',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#ff3c79',
                    pointBackgroundColor: '#ff3c79',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#ff3c79',
                    pointHoverBorderColor: '#ff3c79',
                    pointHoverBorderWidth: 2,
                    pointRadius: radius,
                    radius: radius,
                    pointHitRadius: 1,
                    data: this.props.detector.metadata.eff_vs_wavelength_ts.y
                },
                {
                    label: 'Backscattering eff',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#bc1aff',
                    borderColor: '#bc1aff',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#bc1aff',
                    pointBackgroundColor: '#bc1aff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#bc1aff',
                    pointHoverBorderColor: '#bc1aff',
                    pointHoverBorderWidth: 2,
                    pointRadius: radius,
                    radius: radius,
                    pointHitRadius: 1,
                    data: this.props.detector.metadata.eff_vs_wavelength_bs.y
                })
        }
        return {
            data: {
                labels: xlabels,
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
    render() {
        let config = this.generateConfig()
        return <Line ref='chart' data={config.data} width={400} height={300}/>
    }
}

class PhsPlot extends Component {

    componentDidMount() {

    }

    constructor(props) {
        super(props);
        let xlabels = []
        console.log('phs plot')
        props.detector.metadata.phs_alpha_94.x.forEach((element) => {
            xlabels.push(Math.round(element * 100) / 100)
        })
        let dataset = []
        dataset.push({
                label: 'Li 06',
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#ff3c79',
                borderColor: '#ff3c79',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#ff3c79',
                pointBackgroundColor: '#ff3c79',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#ff3c79',
                pointHoverBorderColor: '#ff3c79',
                pointHoverBorderWidth: 2,
                // pointRadius: radius,
                //radius: radius,
                pointHitRadius: 1,
                data: props.detector.metadata.phs_li_06.y
            },
            {
                label: 'Li 94',
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#bc1aff',
                borderColor: '#bc1aff',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#bc1aff',
                pointBackgroundColor: '#bc1aff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#bc1aff',
                pointHoverBorderColor: '#bc1aff',
                pointHoverBorderWidth: 2,
                //pointRadius: radius,
                //radius: radius,
                pointHitRadius: 1,
                data: props.detector.metadata.phs_li_94.y
            },
            {
                label: 'alpha 06',
                fill: false,
                lineTension: 0.1,
                //backgroundColor: '#bc1aff',
                //borderColor: '#bc1aff',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                // pointBorderColor: '#bc1aff',
                // pointBackgroundColor: '#bc1aff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                // pointHoverBackgroundColor: '#bc1aff',
                // pointHoverBorderColor: '#bc1aff',
                pointHoverBorderWidth: 2,
                //pointRadius: radius,
                //radius: radius,
                pointHitRadius: 1,
                //data: props.detector.metadata.phs_alpha_06.y
            },
            {
                label: 'alpha 94',
                fill: false,
                lineTension: 0.1,
                //backgroundColor: '#bc1aff',
                //borderColor: '#bc1aff',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                //pointBorderColor: '#bc1aff',
                //pointBackgroundColor: '#bc1aff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                //pointHoverBackgroundColor: '#bc1aff',
                //pointHoverBorderColor: '#bc1aff',
                pointHoverBorderWidth: 2,
                // pointRadius: radius,
                // radius: radius,
                pointHitRadius: 1,
                data: props.detector.metadata.phs_alpha_94.y
            })
        this.state = {
            data: {
                labels: xlabels,
                datasets: dataset
            },
            options: {
                showLines: true,
                scales: {
                    xAxes: [{
                        type: 'linear',
                        scaleLabel: {
                            display: true,
                            labelString: 'X'
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
                            labelString: 'Y'
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
        return <Line ref='chart' data={this.state.data} width={400} height={300}/>
    }
}

class DetectorEfficiencyComponent extends Component {

    constructor(props) {
        super(props);
    };


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
            <div>
                <Row>
                    <h5> Optimization options:</h5>
                {this.props.detector.single && this.props.detector.metadata.eff_vs_layer_thickness.x.length>0 ?
                        <div></div> :
                            <Button bsStyle="primary" onClick={this.props.optimizeDetectorDiffThickness}>
                                Optimize different thickness
                            </Button>
                    }
                    {this.props.detector.metadata.eff_vs_layer_thickness.x.length > 0?

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
                                    <EffVsThicknessPlot detector={this.props.detector}/>
                                </Row>
                            </div>


                    {/*
                            <Row>
                                <Button bsStyle="primary" onClick={this.props.optimizeDetectorWavelength}> Optimize wavelength</Button>
                            </Row>
                            */}
                            <div>
                                        <Row>
                                    <b>Efficiency Vs. Blade Wavelength Plot</b>
                                </Row>
                                <Row className='plot-row-element'>
                                    <EffVsWavelengthPlot detector={this.props.detector}/>
                                </Row>
                            </div>


                        </Col>
                    {/* <Row>
                         <PhsPlot detector={this.props.detector}/>
                       </Row> */}
                </Row>
            </div>
        );
    }
}


export default DetectorEfficiencyComponent;

