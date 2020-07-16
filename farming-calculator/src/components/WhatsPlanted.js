import React, { Component } from 'react';
import {convertSpecial} from './Patches';

class WhatsPlanted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
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
    render() {
        let x = this.props.planted || {};
        return (
            <div  className="outputView">
                <ul>
                    {Object.keys(x).map((y, i) => {
                        return (<React.Fragment key={i}>
                        <span key={i}>{convertSpecial(y)} </span><br />
                        
                        {
                            Object.keys(x[y]['patches']).map((p, i) => {
                                return (
                                    <li key={i}>{convertSpecial(p)}<span className="right-span"
                                    onClick={() => {this.removeFromPlanting({y, p})}}>X</span></li>
                                )
                            })
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