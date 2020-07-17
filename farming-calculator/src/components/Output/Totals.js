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
            <ul className="totals-ul">
             {this.props.totals && (
                 Object.keys(this.props.totals).map((element, i) => {
                    return <li key={i}><span className="left-span">{element}</span>: <span className="right-span">{this.props.totals[element]}</span></li>
                 })
             )}
            </ul>
            </>
        );
    }
}

export default Totals;