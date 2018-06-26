/**
 * Created by alvarocbasanez on 28/07/17.
 */
import {connect} from 'react-redux';
import React, {Component} from 'react';
import Spinner from '../components/Spinner';
import FetchDetectorsButtonContainer from './FetchDetectorsButtonContainer'
import DetectorEfficiencyComponent from '../components/DetectorEfficiencyComponent'
import {
    setCurrentDetector,
    deleteDetector,
    setMetadata,
    fetchData,
    editCurrentDetector,
    optimizeWave,
    optimizeDiffThickness
} from '../../../modules/actions/index';
import {bindActionCreators} from 'redux';

function mapStateToProps(state) {
    return {data: state.example.data, isLoading: state.example.isLoading, current: state.example.currentDetector}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setCurrentDetector,
        deleteDetector,
        setMetadata,
        fetchData,
        editCurrentDetector,
        optimizeWave,
        optimizeDiffThickness
    }, dispatch)
}

class DetectorEfficiencyContainer extends Component {

    redirect() {
        this.props.history.push('/detectors')
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
        let index = this.indexOfMax(this.props.current.metadata.eff_vs_layer_thickness.y);
        let optival = this.props.current.metadata.eff_vs_layer_thickness.x[index]
        let blades = [];
        let i = 0;
        for (; i < this.props.current.blades.length; i++) {
            blades.push({backscatter: optival, substrate: 0, transmission: 0})
        }
        this.props.current.blades = blades
        console.log(this.props.current)
        this.props.setCurrentDetector(this.props.current)
        this.props.editCurrentDetector(this.props.current)
        this.props.history.push('/detectors/' + this.props.match.params.number.toString())
    }

    optimizeDetectorWavelength = () => {
        // print the form values to the console
        console.log("optimize detector Wavelength")
        this.props.optimizeWave(this.props.current)
       /* let index = this.indexOfMax(this.props.current.metadata.eff_vs_layer_thickness.y);
        let optival = this.props.current.metadata.eff_vs_layer_thickness.x[index]
        let blades = [];
        let i = 0;
        for (; i < this.props.current.blades.length; i++) {
            blades.push({backscatter: optival, substrate: 0, transmission: 0})
        }
        this.props.current.blades = blades
        console.log(this.props.current)
        this.props.setCurrentDetector(this.props.current)
        this.props.editCurrentDetector(this.props.current)
        this.props.history.push('/detectors/' + this.props.match.params.number.toString())*/
    }
    optimizeDetectorDiffThickness = () => {
        // print the form values to the console
        console.log("optimize detector Diff thickness")
        this.props.optimizeDiffThickness(this.props.current)
    }

    componentWillMount() {
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
                if ("id" in current) {
                    if (current.wavelength.length > 0 && current.blades.length > 0 && !("metadata" in current)) {
                        console.log("No metadata, re-fetch")
                        this.props.fetchData()
                    }
                }
            }
            this.props.setCurrentDetector(current)


        }
    }

    renderDetectorDetail() {
        let i = 0;
        let current = {};
        if (this.props.data) {
            for (; i < this.props.data.length; i++) {
                if (this.props.data[i].id === this.props.match.params.number) {
                    current = this.props.data[i]
                }
            }
        }
        console.log("renderDetector")
        if (Object.keys(current).length === 0) {
            this.redirect()
        } else {
            return (<DetectorEfficiencyComponent optimizeDetectorWavelength={this.optimizeDetectorWavelength}
                                                 optimizeDetectorDiffThickness={this.optimizeDetectorDiffThickness}
                                                 optimizeDetectorThickness={this.optimizeDetectorThickness}
                                                 delete={this.props.deleteDetector} detector={current}
                                                 redirect={this.redirect.bind(this)}
                                                 setMetadata={this.props.setMetadata}/>)
        }

    }

    render() {
        return (
            <div className='DetectorEfficiencyContainer'>
                {this.props.isLoading ? <Spinner/> : this.renderDetectorDetail()}
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DetectorEfficiencyContainer)
