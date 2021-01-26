import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import DropdownWindow  from '../components/DropdownWindow';
import { shallow, mount } from 'enzyme';
import { experienceCalculation } from '../function';


it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('DropdownWindow').length).to === 1;
  let newWrapper = shallow(<DropdownWindow />);
  expect(newWrapper.find('thead').length).to === 1;
});
 


test('Renders a Visual Component', () => {
    const getByText = shallow(<DropdownWindow />);

    expect(getByText.find('th').at(0).text()).toBe === 'Option';
    expect(getByText.find('th').at(1).text()).toBe === 'Level';
    expect(getByText.find('th').at(2).text()).toBe === 'Planting Exp';
    expect(getByText.find('th').at(3).text()).toBe === 'Checking Exp';
    expect(getByText.find('th').at(4).text()).toBe === 'Harvest Exp';
    expect(getByText.find('th').at(5).text()).toBe === '# Per Day';
    expect(getByText.find('th').at(6).text()).toBe === 'Submit';

    expect(getByText.find('DropdownSelection'));

});
