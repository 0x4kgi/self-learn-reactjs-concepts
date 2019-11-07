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

    //Called immediately after a component is mounted. Setting state here will trigger re-rendering.
    //The componentDidMount() method runs after the component output has been rendered to the DOM    
    componentDidMount() {
        //this.props is set up by React itself and this.state has a special meaning
        //you are free to add additional fields to the class manually 
        //if you need to store something that doesn't participate in the data flow (like a timer ID)
        this.timerID = setInterval(
            //call the tick() function every 1000ms
            //by passing an anon function to tick()
            () => this.tick(),
            500
        );
    }

    //Called immediately before a component is destroyed
    componentWillUnmount() {
        //will tear down the timer in the componentWillUnmount() life cycle method
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date(),
        });
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

class RandomWords extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wordToUse: 0,
            arrayOfWords: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero"],
            wordDisplay: "zero",
        };
    }

    componentDidMount() {
        this.arrayIterator = setInterval(
            () => this.randomWord(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.arrayIterator);
    }

    randomWord() {
        const index = this.state.wordToUse;
        const arraySize = this.state.arrayOfWords.length;
        this.setState({
            wordToUse: index + 1,
            wordDisplay: this.state.arrayOfWords[index % arraySize],
        });
    }


    render() {
        return(
            <h1>{this.state.wordDisplay}</h1>
        );
    }
}


function App() {
    return (
        <div>
            <Clock />     
            <RandomWords />    
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
