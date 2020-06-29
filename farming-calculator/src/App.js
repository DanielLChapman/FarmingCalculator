import React, {Component} from 'react';
import './css/App.css';

import {experienceCalculation, initialization} from './function';

//plants
import ExperienceView from './components/ExperienceView';
import CalculatorView from './components/CalculatorView';


import {fruittrees, fruittreepatches} from './data/FruitTrees';
import {trees, treepatches} from './data/Trees';
import {spirittrees, spirittreepatches} from './data/SpiritTrees';
import {allotments, allotmentpatches} from './data/Allotments';
import {bushes, bushpatches} from './data/Bushes';
import {cacti, cactipatches} from './data/Cactus';
import {flowers, flowerpatches} from './data/Flowers';
import {herbs, herbpatches} from './data/Herbs';
import {hops, hoppatches} from './data/Hops';
import {calquattrees, calquattreepatches} from './data/Special_Trees/Calquat';
import {celastrustrees, celastrustreepatches} from './data/Special_Trees/Celastrus';
import {crystaltrees, crystaltreepatches} from './data/Special_Trees/Crystal';
import {hardwoodtrees, hardwoodtreepatches} from './data/Special_Trees/Hardwood';
import {redwoodtrees, redwoodtreepatches} from './data/Special_Trees/Redwood';
import {belladonnas, belladonnapatches} from './data/Special_Patches/Belladonna';
import {grapes, grapepatches} from './data/Special_Patches/Grapes';
import {hesporis, hesporipatches} from './data/Special_Patches/Hespori';
import {mushrooms, mushroompatches} from './data/Special_Patches/Mushroom';
import {seaweeds, seaweedpatches} from './data/Special_Patches/Seaweed';



//Spirit Tree level requirements, 1, 2, infinite
//Farming Guild Level Requirements
//Maybe offer a way for a single placement, not multiple

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
      pause: false,
      timerUpdating: false,

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
              planted: false,
              singlePlant: false,

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
              planted: false,
              singlePlant: false

            },*/
          }
        },
      },

      //data holders
      plants: {
        trees,
        fruittrees,
        spirittrees,
        allotments,
        bushes,
        cacti,
        flowers,
        herbs,
        hops,
        special_trees: {
          calquattrees,
          celastrustrees,
          crystaltrees,
          hardwoodtrees,
          redwoodtrees,
        },
        special_patches: {
          belladonnas,
          grapes,
          hesporis,
          mushrooms,
          seaweeds,
        }
      },

      patches: {
        treepatches,
        fruittreepatches,
        spirittreepatches,
        allotmentpatches,
        bushpatches,
        cactipatches,
        flowerpatches,
        herbpatches,
        hoppatches,
        special_trees: {
          calquattreepatches,
          celastrustreepatches,
          crystaltreepatches,
          hardwoodtreepatches,
          redwoodtreepatches,
        },
        special_patches: {
          belladonnapatches,
          grapepatches,
          hesporipatches,
          mushroompatches,
          seaweedpatches,
        }
      },
      organizedPatches: {
      },
    }
  }

  componentDidMount() {
    let state = this.state;


    if (!state.initialized) {
      let a = initialization(state.patches);
      state.initialized = true;
      state.organizedPatches = a;
    }

    this.setState({
      ...state
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    let state = this.state;

    let newDay = false;


    if (state.startCounting && !state.pause) {
      state.timerUpdating = true;
      state.minutes += state.timeModifier;
      if (state.minutes >= 60) {
          state.hours += Math.floor(state.minutes/60);
          state.minutes = state.minutes%60;
      }
      if (state.hours === 24) {
          state.hours = 0;
          state.days++;
          newDay = true;
      }
  
      //Calculations for each one
      let returnObject = experienceCalculation(0, state.planting, state.plants, newDay, state.timeModifier);
      state.currentExperience += returnObject['experience'];
      state.planting = returnObject.patches;

      if (state.days < 50) {
          setTimeout(() => {
              this.setState({...state});
          }, 1000);
      } 
      if ((state.days >= 50 && !state.finalUpdate) || (state.currentExperience >= state.goalExperience) ) {
          state.finalUpdate = true;
          state.startCounting = false;
          this.setState({
              ...state
          });
      }
    }
    
  }

  setExperience = (experienceObject) => {
    let state = this.state;

    state.currentExperience += experienceObject.currentExperience;
    state.currentLevel = experienceObject.currentLevel;
    state.goalExperience = experienceObject.goalExperience;
    state.goalLevel = experienceObject.goalLevel;
    state.pause = true;

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
    
      state.minutes = 0;
      state.hours = 0;
      state.days = 0;
    
    state.startCounting = !state.startCounting
    state.timerUpdating = true;
    state.pause = false;
    this.setState({...state});
  }

  handleChange = (e) => {
    let state = this.state;
    switch (e.target.name) {
      case 'time':
        state.timeModifier = parseInt(e.target.value, 10);
        state.pause = true;
        break;
      case 'pause':
        state.pause = !state.pause;
        break;
      default:
        state.pause = true;
        console.log(e.target.name);
    }
    this.setState({...state});
  }

  addToPlanting = (selectObject) => {
    let s0 = selectObject;

    let state = this.state;

    try {
      state.planting[s0.type].patches[s0.location] = {...s0.patches[s0.location]};
    }
    catch (err) {
      state.planting[s0.type] = {
        patches: {
          ...s0.patches
        }
        
      }
    }
    if (!state.pause) {
      state.pause = true;
    }
    

    this.setState({...state});

    /*

planting: {
        trees: {
          patches: {
    */
  }
  render() {

    return (
      <div className="App">
        <main className="App-content">
          <section className="timer">
            Minutes: {this.state.minutes} <br />
            Hours: {this.state.hours} <br />
            Days: {this.state.days} <br />
            <button onClick={this.startTimer}>
              {this.state.startCounting ? 'Res': 'S'}tart Calculation</button>
            <label className="increment">
              Time Increment:
              <input type="number" name="time" value={this.state.timeModifier}  onChange={this.handleChange} max="60" min="1" />
            </label>
            <label className="pause">
              <button name="pause" onClick={this.handleChange}>{this.state.pause ? 'Paused' : 'Pause'}</button>
            </label>
            
          </section>
          
          <section className="content-view">
            <ExperienceView 
              currentExperience={this.state.currentExperience}
              updateGoals={this.setExperience}/>
          </section>
          <section className="main-content">
            <CalculatorView 
              patches={this.state.organizedPatches} 
              plants={this.state.plants} 
              level={this.state.currentLevel} 
              addToPlanting={this.addToPlanting} />
          </section>
        </main> 
  
        
  
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </div>
  
    );
  }
  
}

export default App;
