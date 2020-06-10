import React, { Component } from 'react';
import { experienceCalculation } from '../function';

function convertName (name) {
    let newName = name.split(' ').join('_');
    newName = newName.toLowerCase();
    
    return newName;
}

let day = 1440;

class DropdownSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "",
            level: "",
            plant: "",
            check: "",
            harvest: "",
            maxPerDay: 0,
            perDayAdd: 0,
        };
    }

    componentDidMount() {
        let state = {
            selected: "",
            level: "",
            plant: "",
            check: "",
            harvest: "",
            maxPerDay: 0,

        };
        try {
            Object.keys(this.props.plants).forEach((x, i) => {
                if (i === 0) {
                    state.selected = this.props.plants[x].name;
                    let converted = convertName(state.selected);
                    let plants = this.props.plants;

                    state.level = plants[converted].level;
                    state.plant = plants[converted].planting;
                    state.check = plants[converted].checking;
                    state.harvest = plants[converted].harvest;
                    state.maxPerDay = Math.floor(day/plants[converted].growth);
                    
                }
             })
        } catch (err) {
            console.log(this.props.plants);
        }   
        this.setState({...state});
    }

    handleChange = (event) => {
        let state = this.state;
        state.selected = event.target.value;
        let converted = convertName(state.selected);
        let plants = this.props.plants;

        state.level = plants[converted].level;
        state.plant = plants[converted].planting;
        state.check = plants[converted].checking;
        state.harvest = plants[converted].harvest;
        state.maxPerDay = Math.floor(day/plants[converted].growth);
        this.setState({...state});
    }

    handleAdd = (event) => {
        this.setState({perDayAdd: event.target.value})
    }


    render() {
        let a = [];
        for (let i = 0; i < this.state.maxPerDay; i++) {
            a.push(i);
        }
        if (this.props.plants) {
            return (
                <>
                <td>
                    <select value={this.state.selected} onChange={this.handleChange} >
                        {Object.keys(this.props.plants).map((x, i) => {
                            return <option 
                                value={this.props.plants[x].name}
                                key={i}>{this.props.plants[x].name}</option>
                        })}
                    </select>
                    { /*dropdown */ }
                </td>
                <td>
                    { this.state.level }
                </td>
                <td>
                    { this.state.plant }
                </td>
                <td>
                     { this.state.check }
                </td>
                <td>
                     { this.state.harvest }
                </td>
                <td>
                        <select value={this.state.perDayAdd} onChange={this.handleAdd}>
                            {a.map((x, i) => {

                                return <option value={i+1} key={i}>{i+1}</option>
                            })}
                        </select>
                    
            
                </td>
                <td>
                    {this.props.level >= this.state.level && (
                        <span>Level high enough</span>
                    )}
                    {this.props.level < this.state.level && (
                        <span>Level Too Low</span>
                    )}
                    
                     
                </td>
                </>
            )
        } else {
            return <td>
                Loading...
            </td>
        }
        
    }
}

export default DropdownSelection;