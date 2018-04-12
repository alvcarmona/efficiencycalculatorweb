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

    submit = function (values) {
        console.log("submmit")
        let newDetector = {
            name: values.name,
            angle: values.angle,
            threshold: values.threshold,
            blades: [],
            converter: "10B4C 2.24g/cm3",
            wavelength: [],
            metadata:{
                eff_vs_layer_thickness: {},
                eff_vs_wavelength: {},
                eff_vs_bslayer_thickness: {},
                eff_vs_tslayer_thickness: {},
                eff_vs_wavelength_bs: {},
                eff_vs_wavelength_ts: {},
                phs_alpha_06: {},
                phs_alpha_94: {},
                phs_li_06: {},
                phs_li_94: {},
                total_efficiency: 0
            }
        }
        this.props.createDetector(newDetector)
        this.props.closeModal();
    };

    render() {
        return (<CreateDetectorButtonComponent showModal={this.props.showModal} submit={this.submit.bind(this)}
                                               open={this.open.bind(this)} close={this.close.bind(this)}/>)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateDetectorButtonContainer)
