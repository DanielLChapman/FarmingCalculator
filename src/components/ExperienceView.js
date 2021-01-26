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
            updated: false,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let r;
        let state = this.state;
        if (nextProps.currentExperience !== this.state.currentExperience) {
            r = generateLevel(nextProps.currentExperience, false);
            state.currentExperience = r.currentExperience;
            state.currentLevel = r.currentLevel;
            let a = state.goalExperience - state.currentExperience;
            a >= 0 ? state.experienceNeeded = a : state.experienceNeeded = 0;

            this.setState({...state});

        };
        
    }

    handleChange = (e) => {
        
        let state = this.state;
        let target = parseInt(e.target.value, 10);
        state[e.target.name] = target;
        let r;

        if (e.target.name && e.target.name.includes('Experience')) {
            r = generateLevel(target, false);
        } else {
            r = generateLevel(target, true);
        }

        if (e.target.name && e.target.name.includes('current')) {
            state.currentExperience = r.currentExperience;
            state.currentLevel = r.currentLevel;
        } else {
            state.goalExperience = r.currentExperience;
            state.goalLevel = r.currentLevel;
        }

        

        let a = state.goalExperience - state.currentExperience;
        a >= 0 ? state.experienceNeeded = a : state.experienceNeeded = 0;

        state.updated = true;


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
            <section className="experience-view">
                <div className="form-boxes">
                <div className="fbd currentExperienceBox">
                    <input type="number" 
                            name="currentExperience" 
                            value={this.state.currentExperience} 
                            onChange={this.handleChange}
                            min="0"
                            max="200000000" />
                    <label>
                        Enter Current Experience:
                        
                    </label>
                </div>

                <div className="fbd currentLevelBox">
                 <input type="number" 
                            name="currentLevel" 
                            value={this.state.currentLevel} 
                            onChange={this.handleChange}
                            min="1"
                            max="200" />    
                    <label>
                        Enter Current Level:
                        
                    </label>
                </div>
                <div className="fbd goalExperienceBox">
                <input type="number" 
                            name="goalExperience" 
                            value={this.state.goalExperience} 
                            onChange={this.handleChange}
                            min="0"
                            max="200000000" />
                    <label>
                        Enter Goal Expereince:
                        
                    </label>
                </div>
                <div className="fbd goalLevelBox">
                    <input type="number" 
                            name="goalLevel" 
                            value={this.state.goalLevel} 
                            onChange={this.handleChange}
                            min="2"
                            max="200" />
                    <label>
                        Enter Goal Level:
                        
                    </label>
                </div>
                </div>
                <button onClick={
                    this.handleSubmit
                }>Submit</button>


                <span className="experience-needed">
                    Experience Needed : {this.state.experienceNeeded}
                </span>
                <span className="current-experience">
                    Current Experience : {this.props.currentExperience}
                </span>

                
            </section>
        );
    }
}

export default ExperienceView;