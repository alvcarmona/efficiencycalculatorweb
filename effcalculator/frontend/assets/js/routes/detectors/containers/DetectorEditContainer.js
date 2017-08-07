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
        console.log(this.props.current)
    }

    addBlades = (values) => {
        // print the form values to the console
        let blades = [];
        let i=0;
        for (;i<values.nb;i++){
            blades.push({backscatter:values[i].thickness})
        }
        this.props.current.blades = values
        this.props.setCurrentDetector(this.props.current)
        this.props.history.push('/frontend/detectors/' + this.props.current.id.toString())
        console.log(this.props.current)
    }


    renderDetectorEdit() {
        return (
            <div>
                <DetectorForm onSubmit={this.submit} initialValues={this.props.current}/>
                <BladesForm onSubmit={this.addBlades()}/>
            </div>
        )
    }


    render() {
        return (
            <div className='DetectorDetailContainer'>
                {this.props.isLoading ? <Spinner /> : this.renderDetectorEdit()}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetectorEditContainer)
