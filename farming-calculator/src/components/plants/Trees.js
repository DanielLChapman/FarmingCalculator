import React, { Component } from 'react';

class Trees extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                {this.props.minutes}
                {this.props.hours}
                {this.props.days}
            </div>
        );
    }
}

export default Trees;