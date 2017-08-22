/**
 * Created by alvarocbasanez on 31/07/17.
 */
import {connect} from 'react-redux';
import React, {Component} from 'react';
import Spinner from '../components/Spinner';
import DetectorEditComponent from '../components/DetectorEditComponent'
import {setCurrentDetector, editCurrentDetector} from '../../../modules/actions/index';
import {bindActionCreators} from 'redux';
import DetectorForm from './DetectorForm'
import BladesForm from './BladesForm'
import WavelengthForm from './WavelengthForm'

function mapStateToProps(state) {
    return {data: state.example.data, isloading: state.example.isloading, current: state.example.currentDetector}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setCurrentDetector, editCurrentDetector}, dispatch)
}


class DetectorEditContainer extends Component {
    constructor() {
        super()
    }

    submit = (values) => {
        // print the form values to the console
        this.props.current.name = values.name
        this.props.current.angle = values.angle
        this.props.current.threshold = values.threshold
        // this.props.editCurrentDetector(this.props.current)
        // context.history.push('/new-location')
        this.props.setCurrentDetector(this.props.current)
        this.props.history.push('/frontend/detectors/' + this.props.current.id.toString())
        this.props.editCurrentDetector(this.props.current)
    }

    addBlades = (values) => {
        // print the form values to the console
        let blades = [];
        let i = 0;
        for (; i < values.nb; i++) {
            blades.push({backscatter: parseFloat(values.thickness), substrate: 0, transmission: 0})
        }
        this.props.current.blades = blades
        console.log(this.props.current)
        this.props.setCurrentDetector(this.props.current)
        this.props.editCurrentDetector(this.props.current)
        this.props.history.push('/frontend/detectors/' + this.props.current.id.toString())

    }

    addWavelength = (values) => {
        // print the form values to the console
        let wavelength = [];
        wavelength.push({weight:100, angstrom:parseFloat(values.Wavelength) })
        this.props.current.wavelength = wavelength
        console.log(this.props.current)
        this.props.setCurrentDetector(this.props.current)
        this.props.editCurrentDetector(this.props.current)
        this.props.history.push('/frontend/detectors/' + this.props.current.id.toString())

    }


    renderDetectorEdit() {
        return (
            <div>
                <DetectorForm onSubmit={this.submit.bind(this)} initialValues={this.props.current}/>
                <BladesForm onSubmit={this.addBlades.bind(this)}/>
                <WavelengthForm onSubmit={this.addWavelength.bind(this)}/>
            </div>
        )
    }


    render() {
        return (
            <div className='DetectorDetailContainer'>
                {this.props.isLoading ? <Spinner/> : this.renderDetectorEdit()}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetectorEditContainer)
