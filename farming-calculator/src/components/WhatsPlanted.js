import React, { Component } from 'react';
import {convertSpecial} from './Patches';

class WhatsPlanted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            revealed: false
        };
    }

    removeFromPlanting = (data) => {
        let temp = this.props.planted;
        console.log({data, planted: this.props.planted});
        delete temp[data['y']].patches[data.p];
        if (Object.keys(temp[data.y].patches).length === 0) {
            delete temp[data.y];
        }
        this.props.updateAllPlanting(temp);
    }
    switchRevealed = () => {
        this.setState({
            revealed: !this.state.revealed
        })
    }
    render() {
        let x = this.props.planted || {};
        let y = {display: 'none'};
        if (this.state.revealed) {
            y = {display: 'block'}
        };
        return (
            <div  className="what-was-planted">
                <h6 className="what-was-planted-reveal" onClick={this.switchRevealed}>{this.state.revealed ? 'Hide' : 'View/Remove Whats Planted'}</h6>
                <ul style={y}>
                    {Object.keys(x).map((y, i) => {
                        return (<React.Fragment key={i}>
                        <span key={i}>{convertSpecial(y)} </span><br />
                        
                        {x[y]['patches'] && (
                            Object.keys(x[y]['patches']).map((p, i) => {
                                return (
                                    <li key={i}>{convertSpecial(p)}<span className="right-span"
                                    onClick={() => {this.removeFromPlanting({y, p})}}>X</span></li>
                                )
                            }
                        ))
                           
                        }
                        </React.Fragment>
                        )
                    })
                        
                    }
                </ul>
            </div>
        );
    }
}

export default WhatsPlanted;