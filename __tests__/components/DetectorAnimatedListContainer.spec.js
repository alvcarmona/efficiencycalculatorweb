import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components
import DetectorAnimatedlistContainer from '../../effcalculator/frontend/assets/js/routes/detectors/containers/DetectorAnimatedListContainer';
const mockStore = configureStore();

describe('DetectorAnimatedlistComponent', () => {
  let wrapper;
  beforeEach(() => {
    let wrapper = shallow(<DetectorAnimatedlistContainer store ={mockStore({})}
        detectors={[{
    "_id": "5b60738a3d6c27e01058a135",
    "name" : "sadgafg",
    "angle" : 3,
    "threshold" : 3,
    "converter" : "10B4C 2.20g/cm3",
    "blades" : [],
    "wavelength" : [],
    "metadata" : {
        "eff_vs_layer_thickness" : {
            "x" : [],
            "y" : []
        },
        "eff_vs_bslayer_thickness" : {
            "x" : [],
            "y" : []
        },
        "eff_vs_tslayer_thickness" : {
            "x" : [],
            "y" : []
        },
        "eff_vs_wavelength" : {
            "x" : [],
            "y" : []
        },
        "eff_vs_wavelength_bs" : {
            "x" : [],
            "y" : []
        },
        "eff_vs_wavelength_ts" : {
            "x" : [],
            "y" : []
        },
        "total_efficiency" : 0.0,
        "phs_alpha_06" : {
            "x" : [],
            "y" : []
        },
        "phs_alpha_94" : {
            "x" : [],
            "y" : []
        },
        "phs_li_06" : {
            "x" : [],
            "y" : []
        },
        "phs_li_94" : {
            "x" : [],
            "y" : []
        }
    },
    "single" : false
},  {
    "_id" : "5b6183ba3d6c27e01058a136",
    "name" : "mygawd",
    "angle" : 3,
    "threshold" : 3,
    "converter" : "10B4C 2.20g/cm3",
    "blades" : [],
    "wavelength" : [],
    "metadata" : {
        "eff_vs_layer_thickness" : {
            "x" : [],
            "y" : []
        },
        "eff_vs_bslayer_thickness" : {
            "x" : [],
            "y" : []
        },
        "eff_vs_tslayer_thickness" : {
            "x" : [],
            "y" : []
        },
        "eff_vs_wavelength" : {
            "x" : [],
            "y" : []
        },
        "eff_vs_wavelength_bs" : {
            "x" : [],
            "y" : []
        },
        "eff_vs_wavelength_ts" : {
            "x" : [],
            "y" : []
        },
        "total_efficiency" : 0.0,
        "phs_alpha_06" : {
            "x" : [],
            "y" : []
        },
        "phs_alpha_94" : {
            "x" : [],
            "y" : []
        },
        "phs_li_06" : {
            "x" : [],
            "y" : []
        },
        "phs_li_94" : {
            "x" : [],
            "y" : []
        }
    },
    "single" : false
}]}
    />);
  });
  it('should render correctly', () => {

    expect(wrapper).toMatchSnapshot();
  });
});

