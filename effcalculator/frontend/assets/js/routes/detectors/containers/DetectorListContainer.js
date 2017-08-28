/**
 * Created by alvarocbasanez on 27/07/17.
 */

import {connect} from 'react-redux';
import React, {Component} from 'react';
import Spinner from '../components/Spinner'
import DetectorlistComponent from '../components/DetectorListComponent'

function mapStateToProps(state) {
    return {data: state.example.data, isloading: state.example.isloading}
}

class DetectorlistContainer extends Component {

    render() {

        return (
            <div className='DetectorListContainer'>
                {this.props.isLoading ? <Spinner /> : <DetectorlistComponent  detectors={this.props.data}/>}
            </div>);
    }
}

export default connect(mapStateToProps)(DetectorlistContainer)
