import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Hello from './hello.js';
import Clock from './clock.js';
import Toggle from './trigger.js';
import SafebooruAjax from './ajaxTest.js';

class WebpageRender extends React.Component {   

    constructor(props) {
        super(props);

        this.state = {
            selectedApp: 0,
            appArray: [
                <Hello />,
                <Clock />,
                <Toggle />,
                <SafebooruAjax />,
            ]
        }        
    }

    handleClick(i) {
        this.setState({
            selectedApp: i,
        })
    }
    
    render() {
        const s = this.state;
        let whatApp = s.appArray[s.selectedApp];

        return (
            <div className="base-div">
                <div className="top-nav">
                    <button onClick={() => this.handleClick(0)}>hello.js</button>
                    <button onClick={() => this.handleClick(1)}>clock.js</button>
                    <button onClick={() => this.handleClick(2)}>trigger.js</button>
                    <button onClick={() => this.handleClick(3)}>ajaxTest.js</button>
                    <hr />
                </div>
                <div>                    
                    {whatApp}              
                </div>                
            </div>
        );
    }
}

ReactDOM.render(<WebpageRender />, document.getElementById('ReactApp'));

