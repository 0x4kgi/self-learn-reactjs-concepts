import React from 'react';


class Clock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
        }
    }

    componentDidMount() {
        this.timer = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({
            date: new Date(),
        });
    }

    render() {
        return (
            <div>
                It is {this.state.date.toLocaleString()}!
            </div>
        );
    }
}

export default Clock;