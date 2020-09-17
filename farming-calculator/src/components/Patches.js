import React, { Component } from 'react';
import DropdownWindow from './DropdownWindow';
import {capitalizeFirstLetter} from './CalculatorView'

export const convertSpecial = (name) => {
    let a = name.split('_');
    let returnString = "";
    a.length > 1 ? returnString = capitalizeFirstLetter(a[0]) + " " + capitalizeFirstLetter(a[1]) : returnString = capitalizeFirstLetter(a[0])
    return returnString;
};

export const pluralize = (name) => {
    switch(name) {
        case 'Fruittree':
            return 'Fruit Trees';
        case 'Bush':
            return 'Bushes';
        case 'Spirittree':
            return 'Spirit Trees';
        case 'Special Trees':
            return name;
        case 'Special Patches':
            return name;
        case 'Cacti':
            return name;
        default:
            return name+"s";
    }
}

class Patches extends Component {

    constructor(props) {
        super(props);
        this.state = {patches: {}, plants: {}, visible: false};
    }
        // This will erase any local state updates!
        // Do not do this.

    handleClick = () => {
        this.setState({visible: !this.state.visible});
    }

    handlePatchesClick = () => {

    }
    render() {
        //Need a check for chopping for exp and not

        
        let displayValue = {display: "none"};
        if (this.state.visible) {
            displayValue = {display: 'block'};
        }
        if (this.props.patches.patches && Object.keys(this.props.patches.patches).length > 0) {
            return (
                <div>
                    <h5 onClick={this.handleClick}>{pluralize(this.props.name)}</h5>
                    <div className="sub-patches" style={displayValue}>
                        
                        {Object.keys(this.props.patches.patches).map((x, i) => {
                            return <div key={i}>
                                {this.props.patches.patches[x]}
                                <table>
                                <DropdownWindow addToPlanting={this.props.addToPlanting} location={this.props.patches.patches[x]} named={this.props.named} plants={this.props.plants} level={this.props.level}/>
                                </table>
                               
                            </div>
                        })}
                    </div>
                </div>
            );

        } else if(this.props.patches && Object.keys(this.props.patches).length > 0) { 
            return (
                <div>
                    <h5 onClick={this.handleClick}>{pluralize(convertSpecial(this.props.name))}</h5>
                    <div className="sub-patches" style={displayValue}>
                    {Object.keys(this.props.patches).map((x, i) => {
                            return <div key={i}>
                                {capitalizeFirstLetter(x.split('tree')[0])}
                                <table>
                                <DropdownWindow addToPlanting={this.props.addToPlanting} location={capitalizeFirstLetter(x.split('tree')[0])} named={this.props.named} plants={this.props.plants[x+ "s"]} level={this.props.level}/>
                                </table>
                               
                            </div>
                        })}
                    </div>
                </div>
            );
        }
        else {
            return <div>Loading....</div>
            
        }
        
    }
}

export default Patches;