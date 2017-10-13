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

    closest(array,num){
        let i=0;
        let minDiff=1000;
        let ans;
        for(i in array){
             let m=Math.abs(num-array[i]);
             if(m<minDiff){
                    minDiff=m;
                    ans=array[i];
                }
          }
        return ans;
    }


    componentDidMount(){
        if(this.refs.chart){
             let closestValue = this.closest(this.refs.chart.chart_instance.data.datasets[0].data,Number(this.props.detector.metadata.total_efficiency)/100)
        let i = this.refs.chart.chart_instance.data.datasets[0].data.indexOf(closestValue)
        this.refs.chart.chart_instance.data.datasets[0].backgroundColor[i] =  "red";
        this.refs.chart.chart_instance.data.datasets[0].pointRadius[i] = 3

        }
       }

    constructor(props) {
        super(props);
        let colors=[]
        let radius = []
        for(let j=0; j<this.props.detector.metadata.eff_vs_layer_thickness.x.length;j++){
            colors.push('#8cbbff')
            radius.push(0.5)
        }
        this.state = {
            data: {
                labels: this.props.detector.metadata.eff_vs_layer_thickness.x,
                datasets: [
                    {
                        label: 'EffVsThicknessPlot',
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
        return <Line ref='chart' data={this.state.data} width={400} height={300}/>
    }
}

class EffVsWavelengthPlot extends Component {

    closest(array,num){
        let i=0;
        let minDiff=1000;
        let ans;
        for(i in array){
             let m=Math.abs(num-array[i]);
             if(m<minDiff){
                    minDiff=m;
                    ans=array[i];
                }
          }
        return ans;
    }


    componentDidMount(){
        if(this.refs.chart) {
            let closestValue = this.closest(this.refs.chart.chart_instance.data.datasets[0].data, Number(this.props.detector.metadata.total_efficiency) / 100)
            let i = this.refs.chart.chart_instance.data.datasets[0].data.indexOf(closestValue)
            this.refs.chart.chart_instance.data.datasets[0].backgroundColor[i] = "red";
            this.refs.chart.chart_instance.data.datasets[0].pointRadius[i] = 3
        }
    }

    constructor(props) {
        super(props);
        let colors=[]
        let radius = []
        let tension = []
        for(let j=0; j<this.props.detector.metadata.eff_vs_wavelength.x.length;j++){
            colors.push('#8cbbff')
            radius.push(0.5)
        }
        this.state = {
            data: {
                labels: this.props.detector.metadata.eff_vs_wavelength.x,
                datasets: [
                    {
                        label: 'EffVsWavelengthPlot',
                        fill: false,
                        borderWidth: 1,
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
        return <Line ref='chart' data={this.state.data} width={400} height={300}/>
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
                        <Link to={`/detectors/` + this.props.detector.id + '/edit'}>Go to edit page</Link>
                    </Panel>

                </div>)

        }
        return (
            <div className="DetectorEfficiencyComponent">
                <Link to={`/detectors/`}> To detector list </Link>
                <Grid>
                    <RefreshDetectorsContainer/>
                    <Row>
                        <PageHeader> Detector configuration Information
                            <small> efficiency</small>
                        </PageHeader>
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
                                <EffVsThicknessPlot detector={this.props.detector}/>
                            </Row>
                            <Row>
                                <Button bsStyle="primary" onClick={this.props.optimizeDetectorThickness}> Optimize converter thickness</Button>
                            </Row>
                        </Col>
                        <Col xs={6}>
                            <Row>
                                <h3>Efficiency Vs. Blade Wavelength Plot</h3>
                            </Row>
                            <Row className="plotRow">
                                <EffVsWavelengthPlot detector={this.props.detector}/>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}


export default DetectorEfficiencyComponent;

