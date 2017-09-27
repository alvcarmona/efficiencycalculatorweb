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
        case types.RECV_NEW:
            console.log('renew')
            let newdetector = {
                angle: action.data.angle,
                threshold: action.data.threshold,
                name: action.data.name,
                id: action.data.id,
                blades: action.data.blades,
                converter: action.data.converter,
                wavelength: action.data.wavelength,
                metadata: {
                    eff_vs_layer_thickness: {},
                    eff_vs_wavelength: {},
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
            return Object.assign({}, state, {isLoading: false, currentDetector: action.data, error: false});
        case types.REQ_DATA:
            return Object.assign({}, state, {isLoading: true, error: false});
        case types.SET_CURRENT:
            return Object.assign({}, state, {currentDetector: action.currentDetector});
        case types.OPEN_MODAL:
            return Object.assign({}, state, {showModal: true});
        case types.CLOSE_MODAL:
            return Object.assign({}, state, {showModal: false});
        case types.DELETE_ERROR:
            return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
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
                if (state.data[i].id != action.data.id) {
                    newdata.push(state.data[i])
                }
            }
            return Object.assign({}, state, {isLoading: false, data: newdata, error: false});
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    example: exampleReducer,
    form: formReducer
});

export default rootReducer;