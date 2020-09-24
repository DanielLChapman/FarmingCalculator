import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { shallow, mount } from 'enzyme';
import { experienceCalculation } from '../function';


it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('WhatsPlanted').length).to === 1;
});

test('mounting function', () => {
  const container = mount(<App />);
  expect(container.find('.what-was-planted-reveal').length).to === 1;
})

it('switches reveal text on click', () => {
  const container = mount(<App />);
  let c = container.find('.what-was-planted-reveal');
  expect(c.text()).toBe === 'View/Remove Whats Planted';
  c.simulate('click');
  container.update();
  c = container.find('.what-was-planted-reveal');
  expect(c.text()).toBe === 'Hide';
  expect(container.find('WhatsPlanted').state()['revealed']).toBe === true;
})

it('renders empty until something is added to planted', () => {
  const container = mount(<App />);
  expect(container.state()['planted']).toBe === {};
  expect(container.find('.what-was-planted ul').text()).toBe === "";

  let c = container.find('DropdownSelection').at(0);
  c.find('button').simulate('click');
  container.update();

  expect(container.state()['planted']).toBe !== {};
  expect(container.find('.what-was-planted ul').text()).toBe === "Trees Falador ParkX";
})