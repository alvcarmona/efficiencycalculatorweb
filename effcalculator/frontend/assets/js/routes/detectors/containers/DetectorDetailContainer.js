/**
 * Created by alvarocbasanez on 28/07/17.
 */
import {connect} from 'react-redux';
import React, {Component} from 'react';
import Spinner from '../components/Spinner';
import DetectorDetailComponent from '../components/DetectordetailComponent'
import {setCurrentDetector, deleteDetector} from '../../../modules/actions/index';
import {bindActionCreators} from 'redux';
function mapStateToProps(state) {
    return {data: state.example.data, isloading: state.example.isloading}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setCurrentDetector, deleteDetector}, dispatch)
}

class DetectorDetailContainer extends Component {

    redirect(){
         this.props.history.push('/frontend/detectors')
    }

    renderDetectorDetail() {
        let i = 0;
        let current = {};
        for (; i < this.props.data.length; i++) {
            if (this.props.data[i].id === this.props.match.params.number) {
                current = this.props.data[i]
            }
        }
        this.props.setCurrentDetector(current)
       return (<DetectorDetailComponent delete={this.props.deleteDetector} detector={current} redirect={this.redirect.bind(this)}/>)
    }

    render() {
        {/* <div className='DetectorListContainer'>
         {this.props.isLoading ? <Spinner /> :  <DetectorDetailComponent detectors={this.props.data}/>}
         </div>*/
        }
        return (
            <div className='DetectorListContainer' >
                 {this.props.isLoading ? <Spinner /> :  this.renderDetectorDetail()}
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DetectorDetailContainer)
