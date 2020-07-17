import React, { Component } from 'react';

import Totals from './Output/Totals';
/*
let list = [{
    type: 'Magic Trees',
    amount: 42,
},
{
    type: 'Spirit Trees',
    amount: 11,
}]*/
class OutputView extends Component {
    
    render() {
        return (
            <div className="outputView">
                {
                    this.props.whatWasPlanted && (
                        <Totals 
                            totals = {this.props.whatWasPlanted}
                        />
                    )
                }
                
            </div>
        );
    }
}

export default OutputView;