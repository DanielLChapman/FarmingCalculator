import React, { Component } from 'react';

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
            perDayAdd: 1,
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
        let converted = "";
        let plants = this.props.plants;
        try {
            Object.keys(this.props.plants).forEach((x, i) => {
                if (i === 0) {
                    state.selected = this.props.plants[x].name;

                    converted = convertName(state.selected);

                    if (converted === "grapes_(x12)") {
                        converted = "grape";
                    } else if (converted === "giant_seaweed_(x2)") {
                        converted = "seaweed";
                    }
                   
                    

                    state.level = plants[converted].level;
                    state.plant = plants[converted].planting;
                    state.check = plants[converted].checking;
                    state.harvest = plants[converted].harvest;
                    state.maxPerDay = Math.floor(day/plants[converted].growth);
                    
                    
                }
             })
        } catch (err) {
            console.log(plants);
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

    handleSubmit = (event) => {
    
        let c = {
            patches: {
    
            },
            location: convertName(this.props.location),
            type: this.props.named

        }
        let converted = convertName(this.state.selected);

        if (converted === "grapes_(x12)") {
            converted = "grape";
        } else if (converted === "giant_seaweed_(x2)") {
            converted = "seaweed";
        }

        c.patches[convertName(this.props.location)] = {
            numberPlanted: this.state.perDayAdd,
            maxNumberPlanted: this.state.maxPerDay,
            type: convertName(this.state.selected),
            growth: this.props.plants[converted].growth,
            planted: true
        }

        this.props.addToPlanting(c);
    }

    render() {
        let a = [];
        let b = false;
        if (this.props.plants && Object.keys(this.props.plants).length <= 1) {
            b = true;
        }
        for (let i = 0; i < this.state.maxPerDay; i++) {
            a.push(i);
        }
        
        if (this.props.plants) {
            return (
                <>
                <td>
                    {
                        !b && (
                            <select value={this.state.selected} onChange={this.handleChange} >
                                {Object.keys(this.props.plants).map((x, i) => {
                                    return <option 
                                        value={this.props.plants[x].name}
                                        key={i}>{this.props.plants[x].name}</option>
                                })}
                             </select>
                        )
                    }
                    {
                        b && (
                            <span>
                                {Object.keys(this.props.plants).map((x, i) => {
                                    return this.props.plants[x].name
                                })}
                            </span>
                        )
                    }
                   
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
                     { Math.floor(this.state.harvest*100)/100 }
                </td>
                <td>
                        <select value={this.state.perDayAdd} onChange={this.handleAdd}>
                            {a.map((x, i) => {

                                return <option value={i+1} key={i}>{i+1}</option>
                            })}

                        </select>
                    
            
                </td>
                <td>
                    {/* something to ignore level issues maybe, or add upgrade paths */}
                    {this.props.level >= this.state.level && (
                        <button className="special-button" onClick={this.handleSubmit}>Add</button>
                    )}
                    {this.props.level < this.state.level && (
                        <span>Level Too Low <br/><button onClick={this.handleSubmit}>Add Anyways</button></span>
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