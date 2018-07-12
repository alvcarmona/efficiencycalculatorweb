/**
 * Created by alvarocbasanez on 27/07/17.
 */

import {connect} from 'react-redux';
import React, {Component} from 'react';
import Spinner from '../components/Spinner'
import DetectorModuleComponent from '../components/DetectorModuleComponent'
import {fetchData} from '../../../modules/actions/index';
import {bindActionCreators} from 'redux';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchData, }, dispatch)
}


function mapStateToProps(state) {
    return {data: state.example.data, isloading: state.example.isloading}
}

class DetectorModuleContainer extends Component {

    render() {

        return (
            <div className='DetectorListContainer'>
                {this.props.isLoading ? <Spinner /> : <DetectorModuleComponent fetchData={this.props.fetchData}  detectors={this.props.data}/>}
            </div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetectorModuleContainer)
