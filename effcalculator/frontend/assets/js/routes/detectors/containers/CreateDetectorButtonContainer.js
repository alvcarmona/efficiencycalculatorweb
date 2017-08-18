import {connect} from 'react-redux';
import React, {Component} from 'react';
import CreateDetectorButtonComponent from '../components/CreateDetectorButtonComponent'
import {createDetector, openModal, closeModal} from '../../../modules/actions/index';
import {bindActionCreators} from 'redux';


function mapStateToProps(state) {
    return {showModal: state.example.showModal}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({createDetector, openModal, closeModal}, dispatch)
}

class CreateDetectorButtonContainer extends Component {
    close() {
        this.props.closeModal();
    }

    open() {
       this.props.openModal();
    }
    submit = function(values){
        if(!values.threshold)
            values.append
        this.props.createDetector(values)
        this.props.closeModal();
    };

    render() {
        return (<CreateDetectorButtonComponent showModal={this.props.showModal} submit={this.submit.bind(this)} open={this.open.bind(this)} close={this.close.bind(this)} />)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateDetectorButtonContainer)
