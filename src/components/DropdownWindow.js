import React, { Component } from 'react';
import DropdownSelection from './DropdownSelection';

class DropdownWindow extends Component {

    render() {
        return (
            <>
            <thead>

            
            <tr>
                <th>
                    Option
                </th>
                <th>
                    Level
                </th>
                <th>
                    Planting Exp
                </th>
                <th>
                    Checking Exp
                </th>
                <th>
                    Harvest Exp
                </th>
                <th>
                    # Per Day
                </th>
                <th>
                    Submit
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>

                <DropdownSelection
                    plants={this.props.plants}
                    level={this.props.level}
                    location={this.props.location}
                    named={this.props.named}
                    addToPlanting={this.props.addToPlanting} 
                />
            </tr>
            </tbody>
            </>
        );
    }
}

export default DropdownWindow;
