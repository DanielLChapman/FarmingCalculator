import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { shallow, mount } from 'enzyme';
import { experienceCalculation } from '../function';

test('Renders a Visual Component', () => {
    const { getByText } = render(<App />);
  
    expect(getByText('Enter Goal Expereince:')).toBeInTheDocument();
});

describe('it tests the experience UI', () => {
    
    const wrapper = mount(<App />);
    let container = wrapper.find('ExperienceView');

    it('renders without crashing', () => {
        expect(container.length).to === 1;
    });

    it ('features all 4 experience types, experience needed, and a submit button', () => {
        expect(container.find('.fbd').length).toBe === 4;
        expect(container.find('button').length).to === 1;
        expect(container.find('.experience-needed'));
        expect(container.find('.current-experience'));
    });

    it ('updates current level or experience when values are changed', () => {
        let c = container.find('.currentExperienceBox').find('input');
        c.simulate('change', { target: { value: 84, name: 'Experience'}});
        expect(container.find('.currentLevelBox').find('input').value).toBe === 2;
        expect(container.find('.experience-needed').text).toBe === " Experience Needed : 13034347";
        
        c = container.find('.currentLevelBox').find('input');
        c.simulate('change', { target: { value: 84, name: 'Level'}});
        expect(container.find('.currentLevelBox').find('input').value).toBe === 2951373;
    });
    
    it('makes sure the submit button works', () => {
        let c = container.find('.currentExperienceBox').find('input');
        c.simulate('change', { target: { value: 84, name: 'Experience'}});
        
        expect(container.find('.currentLevelBox').find('input').value).toBe === 2;

        container.setState({
            currentLevel: 2,
            currentExperience: 84,
            goalLevel: 99,
            goalExperience: 13034431,
            experienceNeeded: 84 
        })

        let button = container.find('button').at(0);
        button.simulate('click');

        wrapper.update();
        container = wrapper.find('ExperienceView');

        expect(container.props()['currentExperience']).toBe === 84;
        expect(container.find('.current-experience').text()).toBe === "Current Experience : 84";

    })

    it('makes sure goal experience and levels are changed', () => {
        let c = container.find('.goalExperienceBox').find('input');
        c.simulate('change', { target: { value: 84, name: 'Experience'}});
        expect(container.find('.goalLevelBox').find('input').value).toBe === 2;

        let button = container.find('button').at(0);
        button.simulate('click');

        wrapper.update();
        container = wrapper.find('ExperienceView');


        expect(container.find('.experience-needed').text).toBe === " Experience Needed : 83";
    
        c = container.find('.goalLevelBox').find('input');
        c.simulate('change', { target: { value: 3, name: 'Level'}});
        expect(container.find('.goalExperienceBox').find('input').value).toBe === 174;
    
    })
    
})
