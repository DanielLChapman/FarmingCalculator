import React, { Component } from 'react';

import Patches from './Patches';

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

class CalculatorView extends Component {
    constructor(props) {
        super(props);
        this.state = {patches: this.props.patches, plants: this.props.plants}
    }
    render() {
        
        return (
            <div>
                {Object.keys(this.props.patches).map((x, i) => {
                    let named = x + 's';
                    let plants = this.props.plants[x + 's'];
                    if (x === 'cacti' || x.includes('special')) {
                        plants = this.props.plants[x];
                        named = x;
                    }
                    if (x === 'bush') {
                        plants = this.props.plants[x + "es"];
                        named = x + "es";
                    }
                    return <Patches
                    patches={this.props.patches[x]} 
                    plants={plants}
                    name={capitalizeFirstLetter(x)} 
                    level={this.props.level}
                    named={named}
                    addToPlanting={this.props.addToPlanting}
                    key={i} />
                })}
            
                
            </div>
        );
    }
}

export default CalculatorView;