import React from 'react';
import {shallow} from 'enzyme';
import {DetectorEfficiencyCalculator} from '../../effcalculator/frontend/assets/js/routes/detectors/index';
import NavBarContainer from '../../effcalculator/frontend/assets/js/routes/NavbarContainer';

describe('DetectorEfficiencyCalculator', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<DetectorEfficiencyCalculator fetchData={jest.fn()}/>);
  });
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a <DetectorEfficiencyCalculator />', () => {
    expect(wrapper.find('.DetectorEfficiencyCalculator').length).toEqual(1);
  });
});