import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { shallow, mount } from 'enzyme';
import { experienceCalculation } from '../function';


it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('CalculatorView').length).to === 1;
});

it('has 11 patches', () => {
    const wrapper = mount(<App />);
    let container = wrapper.find('CalculatorView');
    expect(container.find('Patches').length).to === 11;
});

it('updates state on load', () => {
    const wrapper = mount(<App />);
    let container = wrapper.find('CalculatorView');

    expect(container.state()['patches']).to !== {};
    expect(container.state()['plants']).to !== {};
})