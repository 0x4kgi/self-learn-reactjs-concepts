import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Hello from './local/hello.js';
import Clock from './local/clock.js';
import Toggle from './local/trigger.js';
import SafebooruAjax from './ajax/ajaxTest.js';
import GitHubUsers from './ajax/githubApi.js';

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
                <GitHubUsers />,
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
                    text outputs:
                    <button onClick={() => this.handleClick(0)}>hello.js</button>
                    <button onClick={() => this.handleClick(1)}>clock.js</button>
                    <button onClick={() => this.handleClick(2)}>trigger.js</button><br />
                    api calls:
                    <button onClick={() => this.handleClick(3)}>ajaxTest.js</button>
                    <button onClick={() => this.handleClick(4)}>githubApi.js</button>
                    <hr />
                </div>
                <div className="app-box">                    
                    {whatApp}              
                </div>                
            </div>
        );
    }
}

ReactDOM.render(<WebpageRender />, document.getElementById('ReactApp'));

