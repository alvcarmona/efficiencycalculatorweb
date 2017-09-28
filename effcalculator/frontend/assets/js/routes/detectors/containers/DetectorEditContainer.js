/**
 * Created by alvarocbasanez on 31/07/17.
 */
import {connect} from 'react-redux';
import React, {Component} from 'react';
import Spinner from '../components/Spinner';
import DetectorEditComponent from '../components/DetectorEditComponent'
import {setCurrentDetector, editCurrentDetector, requestConverters} from '../../../modules/actions/index';
import {bindActionCreators} from 'redux';

function mapStateToProps(state) {
    return {
        data: state.example.data,
        isLoading: state.example.isLoading,
        current: state.example.currentDetector,
        converters: state.example.converters
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setCurrentDetector, editCurrentDetector, requestConverters}, dispatch)
}


class DetectorEditContainer extends Component {
    constructor(props) {
        super(props)
    }
    redirect(){
         this.props.history.push('/detectors')
    }
    componentWillMount() {
        if (this.props.converters.length === 0){
            this.props.requestConverters()
        }
        if (this.props.current === undefined || this.props.current.id !== this.props.match.params.number) {
            console.log("Nuevo current")
            let i = 0;
            let current = {};
            if (this.props.data) {
                for (; i < this.props.data.length; i++) {
                    if (this.props.data[i].id === this.props.match.params.number) {
                        current = this.props.data[i]
                    }
                }
            }
            this.props.setCurrentDetector(current)
        }
    }

    submit = (values) => {
        // print the form values to the console
        this.props.current.name = values.name
        this.props.current.angle = values.angle
        this.props.current.threshold = values.threshold
        this.props.setCurrentDetector(this.props.current)
        this.props.history.push('/detectors/' + this.props.current.id.toString())
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
        this.props.history.push('/detectors/' + this.props.match.params.number.toString())

    }

    addWavelength = (values) => {
        // print the form values to the console
        let wavelength = [];
        wavelength.push({weight: 100, angstrom: parseFloat(values.Wavelength)})
        this.props.current.wavelength = wavelength
        console.log(this.props.current)
        this.props.setCurrentDetector(this.props.current)
        this.props.editCurrentDetector(this.props.current)
        this.props.history.push('/detectors/' + this.props.match.params.number.toString())

    }



    renderDetectorEdit() {
        if (!this.props.current){
           this.redirect()
        }
        return (
            <DetectorEditComponent detector={this.props.current} submit={this.submit.bind(this)}
                                   addBlades={this.addBlades.bind(this)} addWavelength={this.addWavelength.bind(this)} converters={this.props.converters}/>
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
