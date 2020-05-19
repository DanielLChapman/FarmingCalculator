import React, {Component} from 'react';
import './css/App.css';

import {generateLevel, experienceCalculation, initialization} from './function';

//plants
import TimeCalculations from './components/TimeCalculation';
import ExperienceView from './components/ExperienceView';

import {fruittrees, fruittreepatches} from './data/FruitTrees';
import {trees, treepatches} from './data/Trees';


//Dont forget farming outfit
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      hours: 0, 
      days: 0,
      initialized: false,
      finalUpdate: false,
      startCounting: false,
      currentExperience: 0,
      goalExperience: 13034431,
      currentLevel: 1,
      goalLevel: 99,
      experienceNeeded: 13034431,
      timeModifier: 5,

      //should be added to when a plant is added to teh calculator
      planting: {
        trees: {
          patches: {
            /*
            lumbridge: {
              numberPlanted: 0,
              maxNumberPlanted: 2,
              type: 'magic',
              growth: trees['magic'].growth,
              planted: false

            },*/
          }
        },
        fruittrees: {
          patches: {
            /*
            stronghold: {
              numberPlanted: 0,
              maxNumberPlanted: 2,
              type: 'dragonfruit',
              growth: fruittrees['dragonfruit'].growth,
              planted: false

            },*/
          }
        },
      },
      //data holders
      plants: {
        trees,
        fruittrees
      },

      patches: {
        treepatches,
        fruittreepatches
      }
    }
  }

  componentDidMount() {
    let state = this.state;


    if (!state.initialized) {
      initialization(state.patches);
      state.initialized = true;
    }

    this.setState({
      ...state
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    let state = this.state;

    let newDay = false;

    if (state.startCounting) {
      state.minutes += state.timeModifier;
      if (state.minutes >= 60) {

          state.minutes = state.minutes - 60;
          state.hours++;
      }
      if (state.hours === 24) {
          state.hours = 0;
          state.days++;
          newDay = true;
      }
  
      //Calculations for each one


      //trees
      state.currentExperience = experienceCalculation(state.currentExperience, state.planting, state.plants, newDay, state.timeModifier);

      if (state.days < 50) {
          setTimeout(() => {
              this.setState({...state});
          }, 1);
      } 
      if ((state.days >= 50 && !state.finalUpdate) || (state.currentExperience >= state.goalExperience) ) {
          state.finalUpdate = true;
          state.startCounting = false;
          console.log(generateLevel(90, false));
          this.setState({
              ...state
          });
      }
    }
    
  }

  setExperience = (experienceObject) => {
    let state = this.state;

    state.currentExperience = experienceObject.currentExperience;
    state.currentLevel = experienceObject.currentLevel;
    state.goalExperience = experienceObject.goalExperience;
    state.goalLevel = experienceObject.goalLevel;

    this.setState({
      ...state
    });
  
  }
  /*
  setExperience = (type, amount, level = false) => {
    let state = this.state;

    let a = amount;
    let l = level;

    if (level) {
      //need to find experience value
      generateLevel()
    }

    state[type + 'Experience'] = amount;
    state[type + 'Level'] = level;


    this.setState({...state});
  }
*/
  startTimer = () => {
    let state = this.state;
    
    if (!state.startCounting) {
      state.minutes = 0;
      state.hours = 0;
      state.days = 0;
    }
    state.startCounting = !state.startCounting
    this.setState({...state});
  }

  handleChange = (e) => {
    let state = this.state;
    switch (e.target.name) {
      case 'time':
        state.timeModifier = parseInt(e.target.value, 10);
        break;
      default:
        console.log(e.target.name);
    }
    this.setState({...state});
  }
  render() {

    return (
      <div className="App">
        <main className="App-content">
          <section className="timer">
            Minutes: {this.state.minutes} <br />
            Hours: {this.state.hours} <br />
            Days: {this.state.days} <br />
            <button onClick={this.startTimer}>Start Calculation</button>
            <label>
              Time Increment:
              <input type="number" name="time" value={this.state.timeModifier}  onChange={this.handleChange} max="60" min="1" />
            </label>
            
          </section>
          
          <section className="content-view">
            <TimeCalculations 
              days={this.state.days}
              minutes={this.state.minutes}
              hours={this.state.hours}
              currentExperience={this.state.currentExperience}
              goalExperience={this.state.goalExperience}
              />

            <ExperienceView 
            
              updateGoals={this.setExperience}/>
          </section>
        </main> 
  
        
  
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </div>
  
    );
  }
  
}

export default App;
