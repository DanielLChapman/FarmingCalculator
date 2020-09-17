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

    expect(getByText.find('Option'));
    expect(getByText.find('Level'));
    expect(getByText.find('Planting Exp'));
    expect(getByText.find('Checking Exp'));
    expect(getByText.find('Harvest Exp'));
    expect(getByText.find('Per Day'));
    expect(getByText.find('Submit'));

});
