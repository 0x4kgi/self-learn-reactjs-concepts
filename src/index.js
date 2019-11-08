import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Hello from './hello.js';
import Clock from './clock.js';

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
                    
                </div>
            </div>
        );
    }
}

ReactDOM.render(<WebpageRender />, document.getElementById('root'));
