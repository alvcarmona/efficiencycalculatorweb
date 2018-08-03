import React from 'react';
import {shallow} from 'enzyme';
import App from '../../effcalculator/frontend/assets/js/routes/App';
import NavBarContainer from '../../effcalculator/frontend/assets/js/routes/NavbarContainer';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a <div />', () => {
    expect(wrapper.find('.App').length).toEqual(1);
  });
  it('should render the NavBar Component', () => {
    expect(wrapper.containsMatchingElement(<NavBarContainer />)).toEqual(true);
  });
});