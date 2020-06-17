import React, { Component } from 'react';

import Patches from './Patches';

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

class CalculatorView extends Component {
    constructor(props) {
        super(props);
        this.state = {patches: {}, plants: {}}
    }

    componentWillReceiveProps(nextProps) {

        // This will erase any local state updates!
        // Do not do this.
        this.setState({ patches: nextProps.patches, plants: nextProps.plants });
    }

    render() {
        
        return (
            <div>
                {Object.keys(this.state.patches).map((x, i) => {
                    let plants = this.state.plants[x + 's'];
                    if (x === 'cacti' || x.includes('special')) {
                        plants = this.state.plants[x];
                    }
                    if (x === 'bush') {
                        plants = this.state.plants[x + "es"];
                    }
                    return <Patches
                    patches={this.state.patches[x]} 
                    plants={plants}
                    name={capitalizeFirstLetter(x)} 
                    level={this.props.level}
                    key={i} />
                })}
            
                
            </div>
        );
    }
}

export default CalculatorView;