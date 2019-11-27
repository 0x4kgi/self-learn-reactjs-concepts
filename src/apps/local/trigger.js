import React from "react";

class Toggle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valueBool: true,
            valueInteger: 0
        };
    }

    handleClick() {
        this.setState((state) => ({
            valueBool: !state.valueBool,
            valueInteger: (state.valueInteger) + 1,
        }));
    }

    resetValues() {
        this.setState(state => ({
            valueInteger: 0,
        }));
    }

    render() {
        return (
            <div>
                On/Off switch: <b>{this.state.valueBool? "On" : "Off"}</b><br />
                Number increment: <b>{this.state.valueInteger}</b><br />
                <button onClick={(e) => this.handleClick(e)}>Trigger</button>
                <button onClick={(e) => this.resetValues(e)}>Reset</button> 
            </div>
        );
    }
}

export default Toggle;