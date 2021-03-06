/**
 * Then, at the top-level, there exists a single reducers.js file which includes each <module-name>/reducers. This single reducers file can then be used to produce your Redux store./**
 * https://github.com/oviava/react-redux-axios-example/blob/master/src/reducers/index.js
 */


import * as types from './actions/actionTypes';
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'

function exampleReducer(state = {
                            isLoading: false,
                            data: [],
                            currentDetector: undefined,
                            detectorsSelected: {},
                            showModal: false,
                            error: false,
                            converters: []
                        },
                        action = null) {
    switch (action.type) {
        case types.RECV_ERROR:
            return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
        case types.RECV_DATA:
            return Object.assign({}, state, {isLoading: false, data: action.data, error: false});
        case types.REQUEST_CONVERTERS:
            return Object.assign({}, state, {converters: action.data});
        case types.RECV_NEW:
            console.log('renew')
            let newdetector = {
                angle: action.data.angle,
                threshold: action.data.threshold,
                name: action.data.name,
                single: action.data.single,
                id: action.data.id,
                blades: action.data.blades,
                converter: action.data.converter,
                wavelength: action.data.wavelength,
                metadata: {
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
            let newdata1 = []
            for (let i = 0; i < state.data.length; i++) {
                newdata1.push(state.data[i])
            }
            newdata1.push(newdetector);
            return Object.assign({}, state, {isLoading: false, data: newdata1, error: false});
        case types.RECV_EDIT:
            console.log('rec edit')
            let editDetector = {
                angle: action.data.angle,
                threshold: action.data.threshold,
                name: action.data.name,
                single: action.data.single,
                id: action.data.id,
                blades: action.data.blades,
                converter: action.data.converter,
                wavelength: action.data.wavelength,
                metadata: action.data.metadata
            }
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === action.data.id){
                    state.data[i] = action.data
                }
            }
            state.detectorsSelected[action.data.id]= editDetector
            let obj ={}
            obj[action.data.id]=action.data
            const data = state.data
            const detectorsSelected = state.detectorsSelected
            return Object.assign({}, state, {isLoading: false,detectorsSelected: {...obj},data:[...data] ,currentDetector: action.data, error: false});
        case types.REQ_DATA:
            return Object.assign({}, state, {isLoading: true, error: false});
        case types.SET_CURRENT:
            return Object.assign({}, state, {currentDetector: action.currentDetector, isLoading: false});
        case types.SELECT_DETECTORS:
            const selected = action.payload.detectorsSelected
            return Object.assign({}, state, {detectorsSelected: {...selected}});
        case types.OPEN_MODAL:
            return Object.assign({}, state, {showModal: true});
        case types.CLOSE_MODAL:
            return Object.assign({}, state, {showModal: false});
        case types.DELETE_ERROR:
            return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
        case types.OPTIMIZE_WAVE:
            return Object.assign({}, state, {isLoading: false, currentDetector: action.data, error: false});
        case types.OPTIMIZE_DIFF:
            return Object.assign({}, state, {isLoading: false, currentDetector: action.data, error: false});
        case types.RECV_META:
            let newdata2 = []
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === action.data._id.$oid) {
                    action.data.id = action.data._id.$oid
                    newdata2.push(action.data)
                } else {
                    newdata2.push(state.data[i])
                }
            }
            console.log('recvEdit')
            return Object.assign({}, state, {isLoading: false, data: newdata2, error: false});
        case types.DELETE_SUCCESS:
            let newdata = []
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id != action.data) {
                    newdata.push(state.data[i])
                }
            }
            const detectorlist = newdata
            const sel = {}
            console.log('delete success')
            return Object.assign({}, state, {isLoading: false, data: [...detectorlist],detectorsSelected:sel, error: false});
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    example: exampleReducer,
    form: formReducer
});

export default rootReducer;