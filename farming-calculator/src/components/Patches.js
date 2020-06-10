import React, { Component } from 'react';
import DropdownWindow from './DropdownWindow';


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
                    <h5 onClick={this.handleClick}>{this.props.name}</h5>
                    <div className="sub-patches" style={displayValue}>
                        
                        {Object.keys(this.props.patches.patches).map((x, i) => {
                            return <div key={i}>
                                {this.props.patches.patches[x]}
                                <table>
                                <DropdownWindow plants={this.props.plants} level={this.props.level}/>
                                </table>
                               
                            </div>
                        })}
                    </div>
                </div>
            );
        } else {
            console.log(this.props.patches);
        }

        return <div>Loading...</div>
        
    }
}

export default Patches;