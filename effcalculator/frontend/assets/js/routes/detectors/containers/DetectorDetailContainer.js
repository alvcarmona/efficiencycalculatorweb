/**
 * Created by alvarocbasanez on 28/07/17.
 */
import {connect} from 'react-redux';
import React, {Component} from 'react';
import Spinner from '../components/Spinner';
import DetectorDetailComponent from '../components/DetectordetailComponent'

@connect(state => ({data: state.example.data, isloading: state.example.isloading}))
class DetectorDetailContainer extends Component {


    renderDetectorDetail() {
     let i = 0;
        let current = {};
        for (; i < this.props.data.length; i++) {
            if (this.props.data[i].id === this.props.match.params.number) {
                current = this.props.data[i]
            }
        }
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
export default  DetectorDetailContainer