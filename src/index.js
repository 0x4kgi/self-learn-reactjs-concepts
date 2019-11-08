import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Hello from './hello.js';
import Clock from './clock.js';
import Toggle from './trigger.js';

class WebpageRender extends React.Component {    
    render() {
        return (
            <div className="base-div">
                <div>
                    <small>From hello.js</small><br/>
                    <Hello />               
                </div>
                <hr />
                <div>
                    <small>From clock.js</small><br/>
                    <Clock />
                </div>
                <hr />
                <div>
                    <small>From trigger.js</small><br/>
                    <Toggle />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<WebpageRender />, document.getElementById('root'));
