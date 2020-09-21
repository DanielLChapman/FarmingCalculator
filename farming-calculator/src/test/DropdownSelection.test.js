import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import DropdownSelection from '../components/DropdownSelection';
import { shallow, mount } from 'enzyme';
import { experienceCalculation } from '../function';


it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('DropdownSelection'));
});
 

test('Renders a Dropdown Component', () => {
  const getByText = shallow(<DropdownSelection />)

  expect(getByText.find('td').at(0).text()).toBe === 'Loading...';
});

test('has all tree options but defaults to first option, correctly changes when a new option is selected', () => {
  const container = mount(<App />);
  let c = container.find('DropdownSelection').at(0).find('td');

  expect(c.at(0).find('option').at(0).text()).toBe === 'Oak';
  expect(c.at(0).find('option').at(1).text()).toBe === 'Willow';
  expect(c.at(0).find('option').at(2).text()).toBe === 'Maple';
  expect(c.at(0).find('option').at(3).text()).toBe === 'Yew';
  expect(c.at(0).find('option').at(4).text()).toBe === 'Magic';

  //expect the next 4 to equal to level, planting exp, checking exp, and cutting exp

  expect(c.at(1).text()).toBe === '15';
  expect(c.at(2).text()).toBe === '14';
  expect(c.at(3).text()).toBe === '467.2';
  expect(c.at(4).text()).toBe === '37.5';

  expect(c.at(5).find('option').length).toBe === 10;


  //Change Selection

  c.at(0).find('select').simulate('change', { target: { value: "Magic"}});
  container.update();

  c = container.find('DropdownSelection').at(0).find('td');

  expect(c.at(5).find('option').length).toBe === 3;
})

it('handles submitting', () => {
  const container = mount(<App />);
  let c = container.find('DropdownSelection').at(0);
  c.find('button').simulate('click');
  container.update();
  
  expect(Object.keys(container.state()['planting']).length).toBe === 1;
  expect(Object.keys(container.state()['planting'])).toBe === 'trees';
  expect(Object.keys(container.state()['planting']['trees'])).toBe === 'patches';
  expect(Object.keys(container.state()['planting']['trees']['patches'])).toBe === 'falador_park';
})
