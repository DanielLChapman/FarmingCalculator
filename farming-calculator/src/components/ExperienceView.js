import React, { Component } from 'react';

import {generateLevel } from '../function';

class ExperienceView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentExperience: 0,
            currentLevel: 1,
            goalExperience: 83,
            goalLevel: 2,
            experienceNeeded: 83,
        }
    }

    handleChange = (e) => {
        let state = this.state;
        let target = parseInt(e.target.value, 10);
        state[e.target.name] = target;
        let r;

        if (e.target.name.includes('Experience')) {
            r = generateLevel(target, false);
        } else {
            r = generateLevel(target, true);
        }

        if (e.target.name.includes('current')) {
            state.currentExperience = r.currentExperience;
            state.currentLevel = r.currentLevel;
        } else {
            state.goalExperience = r.currentExperience;
            state.goalLevel = r.currentLevel;
        }

        let a = state.goalExperience - state.currentExperience;
        a >= 0 ? state.experienceNeeded = a : state.experienceNeeded = 0;

        console.log(state.experienceNeeded);

        this.setState({...state});
        
    }

    render() {
        return (
            <section>
                <label>
                    Current Experience:
                    <input type="number" 
                        name="currentExperience" 
                        value={this.state.currentExperience} 
                        onChange={this.handleChange}
                        min="0"
                        max="200000000" />
                </label><br />
                <label>
                    Current Level:
                    <input type="number" 
                        name="currentLevel" 
                        value={this.state.currentLevel} 
                        onChange={this.handleChange}
                        min="1"
                        max="200" />
                </label><br />
                <label>
                    Goal Expereince:
                    <input type="number" 
                        name="goalExperience" 
                        value={this.state.goalExperience} 
                        onChange={this.handleChange}
                        min="0"
                        max="200000000" />
                </label><br />
                <label>
                    Goal Level:
                    <input type="number" 
                        name="goalLevel" 
                        value={this.state.goalLevel} 
                        onChange={this.handleChange}
                        min="2"
                        max="200" />
                </label><br />
                <button>Submit</button>

                <br />
                Experience Needed : {this.state.experienceNeeded}
            </section>
        );
    }
}

export default ExperienceView;