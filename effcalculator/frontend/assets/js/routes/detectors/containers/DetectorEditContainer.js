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
import {Grid} from 'react-bootstrap'

function mapStateToProps(state) {
    return {data: state.example.data, isloading: state.example.isloading}
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
        let i = 0;
        let current = {};
        if(this.props.data){
        for (; i < this.props.data.length; i++) {
            if (this.props.data[i].id === this.props.match.params.number) {
                current = this.props.data[i]
            }
        }}
        this.props.setCurrentDetector(current)
        return (
            <DetectorEditComponent detector={current} submit={this.submit.bind(this)} addBlades={this.addBlades.bind(this)} addWavelength={this.addWavelength.bind(this)}/>
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
