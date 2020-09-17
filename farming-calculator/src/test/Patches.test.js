import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { shallow, mount } from 'enzyme';


it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('Patches').length).to === 11;
});
 

test('Renders a Visual Component', () => {
  const { getByText } = render(<App />);

  expect(getByText('Special Patches')).toBeInTheDocument();
  expect(getByText('Special Trees')).toBeInTheDocument();
  expect(getByText('Allotments')).toBeInTheDocument();
  expect(getByText('Bushes')).toBeInTheDocument();
  expect(getByText('Cacti')).toBeInTheDocument();
  expect(getByText('Flowers')).toBeInTheDocument();
  expect(getByText('Fruit Trees')).toBeInTheDocument();
  expect(getByText('Herbs')).toBeInTheDocument();
  expect(getByText('Hops')).toBeInTheDocument();
  expect(getByText('Spirit Trees')).toBeInTheDocument();
  expect(getByText('Trees')).toBeInTheDocument();
});

test('handleClick', () => {
  const container = mount(<App />);
  let c = container.find('Patches');
  c.at(0).find('h5').simulate('click');
  container.update();
  c = container.find('Patches');
  expect(c.at(0).state()['visible']).toBe === true;
})
