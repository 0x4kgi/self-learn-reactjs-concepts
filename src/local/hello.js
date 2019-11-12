import React from 'react';

const element = <b>This is just any string tbh</b>;

class Hello extends React.Component {
    render() {
        let bunchOFLines = [];

        for (let i = 0; i < 500; i += 1) {
            bunchOFLines.push(<p key={i}>This will repeat so the screen overflows line: {i}</p>);            
        }

        return (
            <div>
                {element}
                <hr />
                {bunchOFLines}
            </div>
        );
    }
}

export default Hello;