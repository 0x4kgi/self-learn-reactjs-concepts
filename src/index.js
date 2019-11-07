import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Toggle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isToggledOn: true,
            loopingValue : 0,
        }

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        //you cant (this.state.loopingValue)++ due to react not letting me directly mutate the variable,
        //use this.setState() to mutate
        const value = (this.state.loopingValue) + 1;
                    //(v)state is from this.state and it gets the state?
        this.setState(state => ({
            //yeah, it changes the properties of state here
            //state.isToggledOn due to 'state' is now an anon function i assume
            isToggledOn: !state.isToggledOn,

            //this is just my test here
            loopingValue: value % 21,
        }));
    }

    render() {
        return (
            <div>
                <h1>{this.state.isToggledOn? 'yeah' : 'no'}</h1>
                <h2>{this.state.loopingValue}</h2>
                <button onClick={this.handleClick}>
                    Toggle
                </button>
            </div>
            
        );
    }
}

ReactDOM.render(<Toggle />, document.getElementById('root'));
