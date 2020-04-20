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
        if (props.currentExperience && props.goalExperience) {
            return {
                currentExperience: props.currentExperience,
                goalExperience: props.goalExperience,
            }
        }
    }

    render() {
        return (
            <div>
                <Trees 
                    minutes= {this.props.minutes}
                    hours= {this.props.hours}
                    days= {this.props.days}
                    />
               <br />
               Current Experience: {this.state.currentExperience}<br />
               Goal Experience: {this.state.goalExperience}<br />
            
            </div>
        );
    }
}

export default TimeCalculation;