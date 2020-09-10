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

  it('should update state when clicked on openRight', () => {

    let c = container.find('.openRight');
    expect(c.text()).toEqual('Close');
    container.find('.openRight').simulate('click');
    expect(c.text()).toEqual('Start Window');
  });

  it('should alert if nothing is planted when starting calculation', () => {
    global.alert = jest.fn();
    let c = container.find('.startTimer');
    expect(c.text()).toEqual('Start Calculation');

    container.find('.startTimer').simulate('click');

    expect(c.text()).toEqual('Start Calculation');

  });

  it('should be able to click on pause to pause', () => {
    expect(container.props()['pause']).toBe === false;
    container.find('.pause').simulate('click');
    expect(container.props()['pause']).toBe === true;

  });

  it('changes the time modifier', () => {
    expect(container.props()['timeModifier']).toBe === 15;
    let c = container.find('.increment').find('input');
    c.simulate('change', { target: { value: 5}});
    expect(container.props()['timeModifier']).toBe === 5;
  });

  it('starts timer', () => {
    
    //bonus of making sure add to planting works!
    let temp = mount((<App />)   );
    let c = temp.find('Visuals');
    let buttons = c.find('.special-button').at(0);
    buttons.simulate('click');

    let p = c.find('.startTimer');
    expect(p.text()).toEqual('Start Calculation');

    c.find('.startTimer').simulate('click');

    expect(p.text()).toEqual('Restart Calculation');
    expect(c.find('#timer-minutes')).toBe !== 0;

    c.find('.startTimer').simulate('click');
    

  })

})