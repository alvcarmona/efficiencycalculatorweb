/**
 * Then, at the top-level, there exists a single reducers.js file which includes each <module-name>/reducers. This single reducers file can then be used to produce your Redux store./**
 * https://github.com/oviava/react-redux-axios-example/blob/master/src/reducers/index.js
 */


import * as types from './actions/actionTypes';
import { combineReducers } from 'redux'; //might need to remove
import { reducer as formReducer } from 'redux-form'

function exampleReducer(
    state = {
        isLoading: false,
        data:[],
        data2:[
            {"id":1,
                    "name": "Detector1",
                    "converter": "10B4C 2.24g/cm3",
                    "angle": 90,
                    "threshold": 100,
                    "single": false,
                    "wavelength": [{
                        "angstrom": 1.8,
                        "weight": 100
                    }
                    ],
                    "blades": [
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        }
                    ]
                },
                {"id":2,
                    "name": "Detector2",
                    "converter": "10B4C 2.24g/cm3",
                    "angle": 90,
                    "threshold": 100,
                    "single": false,
                    "wavelength": [{
                        "angstrom": 1.8,
                        "weight": 100
                    }
                    ],
                    "blades": [
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        }
                    ]
                },
            {"id":3,
                    "name": "Detector3",
                    "converter": "10B4C 2.24g/cm3",
                    "angle": 90,
                    "threshold": 100,
                    "single": false,
                    "wavelength": [{
                        "angstrom": 1.8,
                        "weight": 100
                    }
                    ],
                    "blades": [
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        }
                    ]
                },
            {"id":4,
                    "name": "Detector4",
                    "converter": "10B4C 2.24g/cm3",
                    "angle": 90,
                    "threshold": 100,
                    "single": false,
                    "wavelength": [{
                        "angstrom": 1.8,
                        "weight": 100
                    }
                    ],
                    "blades": [
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        },
                        {
                            "backscatter": 1.3,
                            "transmission": 1.3,
                            "substrate": 0,
                            "inclination": 0
                        }
                    ]
                }],
        currentDetector: undefined,
        showModal: false,
        error: false
    },
    action = null) {
	switch(action.type) {
		case types.RECV_ERROR:
			return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
		case types.RECV_DATA:
			return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
		case types.RECV_NEW:
		    console.log('renew')
            let newdetector= {angle: action.data.angle, threshold:action.data.threshold, name:action.data.name, id:action.data._id.$oid}
		    let newdata1=[]
            for( let i =0;i<state.data.length;i++){
                    newdata1.push(state.data[i])
            }
            newdata1.push(newdetector);
			return Object.assign({}, state, {isLoading: false, data: newdata1, error: false });
		case types.REQ_DATA:
			return Object.assign({}, state, {isLoading: true, error: false });
        case types.SET_CURRENT:
			return Object.assign({}, state, {currentDetector: action.currentDetector});
        case types.OPEN_MODAL:
			return Object.assign({}, state, {showModal: true});
        case types.CLOSE_MODAL:
			return Object.assign({}, state, {showModal: false});
        case types.DELETE_ERROR:
			return Object.assign({}, state, { data: action.data, error:true});
        case types.DELETE_SUCCESS:
           let newdata=[]
            for( let i =0;i<state.data.length;i++){
                if (state.data[i].id != action.data.id){
                    newdata.push(state.data[i])
                }
            }
			return Object.assign({}, state, {data: newdata, error:false});
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	example: exampleReducer,
     form: formReducer
});

export default rootReducer;