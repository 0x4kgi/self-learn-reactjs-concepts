import React from 'react';

const element = <b>This is just any string tbh</b>;

class Hello extends React.Component {
    componentDidMount() {
        console.log('Hello mounted');
    }

    componentWillUnmount() {
        console.log('Hello Umounted');
    }

    render() {
        return element;
    }
}

export default Hello;