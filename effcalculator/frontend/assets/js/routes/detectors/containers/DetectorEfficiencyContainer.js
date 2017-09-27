/**
 * Created by alvarocbasanez on 28/07/17.
 */
import {connect} from 'react-redux';
import React, {Component} from 'react';
import Spinner from '../components/Spinner';
import FetchDetectorsButtonContainer from './FetchDetectorsButtonContainer'
import DetectorEfficiencyComponent from '../components/DetectorEfficiencyComponent'
import {setCurrentDetector, deleteDetector, setMetadata, fetchData} from '../../../modules/actions/index';
import {bindActionCreators} from 'redux';
function mapStateToProps(state) {
    return {data: state.example.data, isLoading: state.example.isLoading, current: state.example.currentDetector}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setCurrentDetector, deleteDetector, setMetadata, fetchData}, dispatch)
}

class DetectorEfficiencyContainer extends Component {

    redirect(){
         this.props.history.push('/detectors')
    }

    componentWillMount(){
        if (this.props.current === undefined || this.props.current.id!== this.props.match.params.number){
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

            if (current.wavelength.length > 0 && current.blades.length > 0 && !current.detector.metadata){
                console.log("No metadata, re-fetch")
                this.props.fetchData()
            }

        }
    }
    renderDetectorDetail() {
        let i = 0;
        let current = {};
        if(this.props.data){
        for (; i < this.props.data.length; i++) {
            if (this.props.data[i].id === this.props.match.params.number) {
                current = this.props.data[i]
            }
        }}
        console.log("renderDetector")
        if (Object.keys(current).length === 0){
           this.redirect()
        }else{
          return (  <DetectorEfficiencyComponent delete={this.props.deleteDetector} detector={current} redirect={this.redirect.bind(this)} setMetadata={this.props.setMetadata}/>)
        }

    }

    render() {
        return (
            <div className='DetectorEfficiencyContainer' >
                 {this.props.isLoading ? <Spinner /> :  this.renderDetectorDetail()}
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DetectorEfficiencyContainer)
