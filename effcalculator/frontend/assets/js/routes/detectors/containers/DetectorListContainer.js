/**
 * Created by alvarocbasanez on 27/07/17.
 */

import {connect} from 'react-redux';
import React, {Component} from 'react';
import Spinner from '../components/Spinner'
import DetectorlistComponent from '../components/DetectorListComponent'
import {bindActionCreators} from 'redux';
import {createDetector} from '../../../modules/actions/index';

function mapStateToProps(state) {
    return {data: state.example.data, isloading: state.example.isloading}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({createDetector}, dispatch)
}



class DetectorlistContainer extends Component {
    createDetector() {
        console.log('creo un detector')
        this.props.createDetector()
    }

    render() {

        return (
            <div className='DetectorListContainer'>
                {this.props.isLoading ? <Spinner /> : <DetectorlistComponent createDetector={this.createDetector} detectors={this.props.data}/>}
            </div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetectorlistContainer)
