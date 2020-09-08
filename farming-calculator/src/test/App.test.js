import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { shallow, mount } from 'enzyme';


it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('Visuals').length).to === 1;
});
 

test('Renders a Visual Component', () => {
  const { getByText } = render(<App />);

  expect(getByText('Farming Simulator')).toBeInTheDocument();
});

test('mounting function', () => {
  const container = mount(<App />);
  expect(container.state().organizedPatches).to !== {};
})