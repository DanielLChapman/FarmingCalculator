import React, { Component } from 'react';


//plants
import ExperienceView from './ExperienceView';
import CalculatorView from './CalculatorView';
import OutputView from './OutputView';
import WhatsPlanted from './WhatsPlanted';


class Visuals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rightOpen: false, 
        }
    }

    openRight = () => {

        this.setState({
          rightOpen: !this.state.rightOpen,
        });
    };
    render() {
        let rightStyle= {};
        if (this.state.rightOpen) {
        rightStyle = {display: 'block'};
        }
        return (
            <div className="App">
                
                <main className="App-content">
                <header>
                    <h1>Farming Simulator</h1>
                    <div className="openRight" onClick={this.openRight}>{this.state.rightOpen ? 'Close' : 'Start Window'}</div>
                </header>
                
                <section className="left-side">
                    <section className="content-view">
                    <ExperienceView 
                        currentExperience={this.props.currentExperience}
                        updateGoals={this.props.setExperience} />
                    </section>
                    <section className="main-content">
                    <CalculatorView 
                        patches={this.props.organizedPatches} 
                        plants={this.props.plants} 
                        level={this.props.level} 
                        addToPlanting={this.props.addToPlanting} />
                    </section>
                </section>

                <section className="right-side"  style={rightStyle}>

                    <section className="timer">
                    <h6 id="timer-minutes">
                    Minutes: <span className="right-side-timer-text">{this.props.minutes}</span></h6><br />
                    <h6 id="timer-hours">Hours: <span className="right-side-timer-text">{this.props.hours}</span></h6> <br />
                    <h6 id="timer-days">Days: <span className="right-side-timer-text">{this.props.days}</span></h6> <br />
                    <button className="startTimer" onClick={this.props.startTimer}>
                        {this.props.startCounting ? 'Res': 'S'}tart Calculation
                    </button>
                    
                    </section>
                    <section className="time-increment">
                    <label className="increment">
                        <span>Time Increment:</span>
                        <input type="number" name="time" value={this.props.timeModifier}  onChange={this.props.handleChange} max="60" min="1" />
                    </label>
                    </section>
                    
                    <label className="pause">
                        <button name="pause" onClick={this.props.handleChange}>{this.props.pause ? 'Paused' : 'Pause'}</button>
                    </label>
                    <WhatsPlanted 
                        planted={this.props.planting}
                        updateAllPlanting={this.props.updateAllPlanting}/>
                    <OutputView 
                        whatWasPlanted={this.props.whatWasPlanted}/>
                </section>
                
                </main> 
  

        
  
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </div>
  
        );
    }
}

export default Visuals;