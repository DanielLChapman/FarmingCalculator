import React, { Component } from 'react';
import Trees from './plants/Trees';


class TimeCalculation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentExperience: 0,
            goalExperience: 13034431
        }
        
    }

    static getDerivedStateFromProps(props, state) {
        try {
            return {
                currentExperience: props.currentExperience,
                goalExperience: props.goalExperience,
            }
        } catch (error) {
            return null;
        }
        
        
        return null;
    }

    render() {
        return (
            <div>
               <br />
               Current Experience: {this.state.currentExperience}<br />
               Goal Experience: {this.state.goalExperience}<br />
            
            </div>
        );
    }
}

export default TimeCalculation;