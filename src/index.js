import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Clock extends React.Component {
    // class constructor that assigns the initial this.state
    constructor(props) {
        //pass props to the base constructor
        //Class components should always call the base constructor with props
        super(props);
        this.state = {
            date: new Date(),
        };
    }

    render() {
        return (
            <div>
                <h1>Hello, World!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}


function App() {
    return (
        <div>
            <Clock />     
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
