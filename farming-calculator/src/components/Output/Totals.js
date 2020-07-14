import React, { Component } from 'react';

class Totals extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <>
            <h6 className="totals">Totals</h6>
            <ul>
             {this.props.totalList && (
                 this.props.totalList.map((element, i) => {
                    return <li key={i}><span className="left-span">{element.type}</span>: <span className="right-span">{element.amount}</span></li>
                 })
             )}
            </ul>
            </>
        );
    }
}

export default Totals;