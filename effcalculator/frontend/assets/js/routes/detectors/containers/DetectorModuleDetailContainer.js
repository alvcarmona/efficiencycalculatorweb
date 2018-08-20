import {connect} from 'react-redux';
import React, {Component} from 'react';
import {fetchData} from '../../../modules/actions/index';
import {Button, Glyphicon} from 'react-bootstrap'
import DetectorModuleDetailComponent from '../components/DetectorModuleDetailComponent'
import Spinner from '../components/Spinner';
import {bindActionCreators} from 'redux';
import {
    setCurrentDetector,
    deleteDetector,
    openModal,
    setMetadata,
    editCurrentDetector,
    requestConverters,
    optimizeWave,
    optimizeDiffThickness
} from '../../../modules/actions/index';


function mapStateToProps(state) {
    return {data: state.example.data, isLoading: state.example.isLoading}
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setCurrentDetector,
        requestConverters,
        deleteDetector,
        setMetadata,
        openModal,
        editCurrentDetector,
        optimizeWave,
        optimizeDiffThickness
    }, dispatch)
}


export class DetectorModuleDetailContainer extends Component {
    constructor(props) {
        super(props)
    }

    submit = (values) => {
        // print the form values to the console
        this.props.current.name = values.name
        this.props.current.angle = values.angle
        this.props.current.threshold = values.threshold
        this.props.current.converter = values.converter
        this.props.setCurrentDetector(this.props.current)
        this.props.history.push('/detectors/' + this.props.current.id.toString())
        this.props.editCurrentDetector(this.props.current)
    }
    addBlades = (values) => {
        // print the form values to the console
        let blades = [];
        let i = 0;
        for (; i < values.nb; i++) {
            blades.push({
                backscatter: parseFloat(values.thickness),
                substrate: parseFloat(values.subThickness),
                transmission: 0
            })
        }
        this.props.current.blades = blades
        this.props.current.single = values.single
        console.log(this.props.current)
        this.props.setCurrentDetector(this.props.current)
        this.props.editCurrentDetector(this.props.current)
        this.props.history.push('/detectors/' + this.props.match.params.number.toString())

    }
    dummyFunc = (values) => {
        return values
    }
    addWavelength = (values) => {
        // print the form values to the console
        let wavelength = [];
        wavelength.push({weight: 100, angstrom: parseFloat(values.Wavelength)})
        this.props.detector.wavelength = wavelength
        console.log(this.props.detector)
        this.props.setCurrentDetector(this.props.current)
        this.props.editCurrentDetector(this.props.detector)
    }
     indexOfMax(arr) {
        if (arr.length === 0) {
            return -1;
        }

        var max = arr[0];
        var maxIndex = 0;

        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }

        return maxIndex;
    }

     optimizeDetectorThickness = () => {
        // print the form values to the console
        console.log("optimize detector Thickness")
        let index = this.indexOfMax(this.props.detector.metadata.eff_vs_layer_thickness.y);
        let optival = this.props.detector.metadata.eff_vs_layer_thickness.x[index]
        let blades = [];
        let i = 0;
        for (; i < this.props.detector.blades.length; i++) {
            blades.push({backscatter: optival, substrate: 0, transmission: 0})
        }
        this.props.detector.blades = blades
        console.log(this.props.detector)
        this.props.editCurrentDetector(this.props.detector)
    }

    optimizeDetectorDiffThickness = () => {
        // print the form values to the console
        console.log("optimize detector Diff thickness")
        this.props.optimizeDiffThickness(this.props.detector)
    }

    render() {
        if(this.props.detector.metadata){

        }
        console.log("render module")
        return (<DetectorModuleDetailComponent detector={this.props.detector} deleteDetector={this.props.deleteDetector}
                                               openModal={this.props.openModal}
                                               setMetadata={this.props.setMetadata} submit={this.submit.bind(this)}
                                               addBlades={this.addBlades.bind(this)}
                                               addWavelength={this.addWavelength.bind(this)} optimizeDetectorDiffThickness={this.optimizeDetectorDiffThickness}
                                                 optimizeDetectorThickness={this.optimizeDetectorThickness}/>)
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(DetectorModuleDetailContainer)
