import React, { Component } from 'react';

import {generateLevel } from '../function';

class ExperienceView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentExperience: 0,
            currentLevel: 1,
            goalExperience: 13034431,
            goalLevel: 99,
            experienceNeeded: 13034431,
        }
    }

    static getDerivedStateFromProps(props, state) {
        let currentExperience = props.currentExperience;
        let currentLevel = generateLevel(currentExperience, false).currentLevel;
        let a = state.goalExperience - currentExperience;
        a >= 0 ? a =  state.goalExperience - currentExperience  : a = 0;

        return {
            currentExperience,
            currentLevel,
            experienceNeeded: a,
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

    handleSubmit = () => {
        let eO = {
            currentLevel: this.state.currentLevel,
            currentExperience: this.state.currentExperience,
            goalLevel: this.state.goalLevel,
            goalExperience: this.state.goalExperience,
            experienceNeeded: this.state.experienceNeeded,
        }

        this.props.updateGoals(eO);
    }

    render() {
        return (
            <section>
                <label>
                    Enter Current Experience:
                    <input type="number" 
                        name="currentExperience" 
                        value={this.state.currentExperience} 
                        onChange={this.handleChange}
                        min="0"
                        max="200000000" />
                </label><br />
                <label>
                    Enter Current Level:
                    <input type="number" 
                        name="currentLevel" 
                        value={this.state.currentLevel} 
                        onChange={this.handleChange}
                        min="1"
                        max="200" />
                </label><br />
                <label>
                    Enter Goal Expereince:
                    <input type="number" 
                        name="goalExperience" 
                        value={this.state.goalExperience} 
                        onChange={this.handleChange}
                        min="0"
                        max="200000000" />
                </label><br />
                <label>
                    Enter Goal Level:
                    <input type="number" 
                        name="goalLevel" 
                        value={this.state.goalLevel} 
                        onChange={this.handleChange}
                        min="2"
                        max="200" />
                </label><br />
                <button onClick={
                    this.handleSubmit
                }>Submit</button>

                <br />
                Experience Needed : {this.state.experienceNeeded}
                <br />
                Current Experience : {this.props.currentExperience}
            </section>
        );
    }
}

export default ExperienceView;