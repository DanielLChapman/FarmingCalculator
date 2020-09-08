import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import Visuals from '../components/Visuals';
import { shallow, mount } from 'enzyme';


test('Renders a Visual Component', () => {
  const { getByText } = render(<App />);

  expect(getByText('Farming Simulator')).toBeInTheDocument();
});

describe('<Visuals /> UI', () => {
  const initialProps = {
      currentExperience: 0,
      setExperience: jest.fn(),
      organizedPatches: {},
      plants: {},
      level: 0,
      addToPlanting: jest.fn(),
      minutes: 0,
      hours: 0,
      days: 0,
      startTimer: jest.fn(), 
      startCounting: false,
      timeModifier: 5,
      handleChange: jest.fn(),
      pause: false, 
      planting: jest.fn(), 
      updateAllPlanting: jest.fn(),
      whatWasPlanted: {},
  };

  const container = mount(<Visuals {...initialProps} />);

  it('should have props for timer', () => {
    container.find('h6').length == 3;
    expect(container.find('#timer-minutes').text()).toEqual(`Minutes: ${initialProps.minutes}`);
    expect(container.find('#timer-hours').text()).toEqual(`Hours: ${initialProps.hours}`);
    expect(container.find('#timer-days').text()).toEqual(`Days: ${initialProps.days}`);
  });

  it('should conditional render in timer', () => {
    let c = container.find('.timer');
    expect(c.find('button').length.to == 1);
    expect(c.find('button').text()).toEqual('Start Calculation');
    let tempProps = initialProps;
    tempProps.startCounting = true;
    let tempContainer = mount(<Visuals {...tempProps} />);
    expect(tempContainer.find('.timer').find('button').text()).toEqual('Restart Calculation');
  })

  it('should conditional render in openRight', () => {
    let c = container.find('.openRight');
    expect(c.text()).toEqual('Start Window');
    container.setState({rightOpen: true});
    c = container.find('.openRight');
    expect(c.text()).toEqual('Close');
    container.setState({openRight: false});
  })

  it('should conditional render on pause', () => {
    let c = container.find('.pause');
    expect(c.text()).toEqual('Pause');
    container.setProps({ pause: true });
    c = container.find('.pause');
    expect(c.text()).toEqual('Paused');
    container.setProps({ pause: false });
  })

  it('has has the necessary content', () => {
    expect(container.find('ExperienceView').length.to == 1);
    expect(container.find('CalculatorView').length.to == 1);
    expect(container.find('WhatsPlanted').length.to == 1);
    expect(container.find('OutputView').length.to == 1);
  })

})