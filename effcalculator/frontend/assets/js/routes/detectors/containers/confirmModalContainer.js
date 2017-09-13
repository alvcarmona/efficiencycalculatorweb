import {connect} from 'react-redux';
import React, {Component} from 'react';
import ConfirmModalComponent from '../components/confirmModalComponent'
import {createDetector, openModal, closeModal} from '../../../modules/actions/index';
import {bindActionCreators} from 'redux';


function mapStateToProps(state) {
    return {showModal: state.example.showModal}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({closeModal}, dispatch)
}



class ConfirmModalContainer extends Component {
    close() {
        this.props.closeModal();
    }

    submit = function () {
        this.props.submit()
        this.props.closeModal();
    };

    render() {
        return (<ConfirmModalComponent showModal={this.props.showModal} submit={this.submit.bind(this)}
                                                close={this.close.bind(this)}/>)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModalContainer)