/**
 * Created by alvarocbasanez on 28/07/17.
 */
import {connect} from 'react-redux';
import React, {Component} from 'react';
import Spinner from '../components/Spinner';
import DetectorDetailComponent from '../components/DetectordetailComponent'
import {setCurrentDetector} from '../../../modules/actions/index';
import {bindActionCreators} from 'redux';
function mapStateToProps(state) {
    return {data: state.example.data, isloading: state.example.isloading}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setCurrentDetector}, dispatch)
}

class DetectorDetailContainer extends Component {



    renderDetectorDetail() {
        let i = 0;
        let current = {};
        for (; i < this.props.data.length; i++) {
            if (this.props.data[i].id === this.props.match.params.number) {
                current = this.props.data[i]
            }
        }
        this.props.setCurrentDetector(current)
       return (<DetectorDetailComponent detector={current}/>)
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
