import React, {Component} from 'react';
import './css/App.css';

//plants
import TimeCalculations from './components/TimeCalculation';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      hours: 0, 
      days: 0,
      finalUpdate: false,
      startCounting: false,
      currentExperience: 0,
      goalExperience: 13034431,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    let state = this.state;

    if (state.startCounting) {
      state.minutes += 1;
      if (state.minutes === 60) {
          state.minutes = 0;
          state.hours++;
      }
      if (state.hours === 24) {
          state.hours = 0;
          state.days++;
      }
  
      //Calculations for each one
  
      if (state.days < 5) {
          setTimeout(() => {
              this.setState({...state});
          }, 2);
          
      } 
      if (state.days >= 5 && !state.finalUpdate ) {
          state.finalUpdate = true;
          state.startCounting = false;
          this.setState({
              ...state
          });
      }
    }
    
  }

  setExperience = (type, amount) => {
    let state = this.state;
    state[type + 'Experience'] = amount;

    this.setState({...state});
  }

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

  render() {

    return (
      <div className="App">
        <main className="App-content">
          <section className="timer">
            Minutes: {this.state.minutes} <br />
            Hours: {this.state.hours} <br />
            Days: {this.state.days} <br />
            <button onClick={this.startTimer}>Start Timer</button>
            
          </section>
          
          <section className="content-view">
            <TimeCalculations 
              days={this.state.days}
              minutes={this.state.minutes}
              hours={this.state.hours}
              currentExperience={this.state.currentExperience}
              goalExperience={this.state.goalExperience}
              />
          </section>
        </main> 
  
        
  
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </div>
  
    );
  }
  
}

export default App;
