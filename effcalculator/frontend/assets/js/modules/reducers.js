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
        error: false
    },
    action = null) {
	switch(action.type) {
		case types.RECV_ERROR:
			return Object.assign({}, state, {isLoading: false, data: action.data, error: true});
		case types.RECV_DATA:
			return Object.assign({}, state, {isLoading: false, data: action.data, error: false });
		case types.REQ_DATA:
			return Object.assign({}, state, {isLoading: true, error: false });
        case types.SET_CURRENT:
			return Object.assign({}, state, {currentDetector: action.currentDetector});
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	example: exampleReducer,
     form: formReducer
});

export default rootReducer;