import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import OutputView from '../components/OutputView';
import { shallow, mount } from 'enzyme';
import { experienceCalculation } from '../function';


it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('OutputView').length).to === 1;
});
 

it('renders an empty total', () => {
  const container = mount(<OutputView />);
  expect(container.text()).toBe === "Totals";
})

it('renders a total field of magic: 1 when state is updated', () => {
    const container = mount(<App />);
    container.state()['whatWasPlanted'] = {magic: 1};
    container.update();
    let c = container.find('OutputView');
    expect(c.text()).toBe === "TotalsMagic: 1";
})