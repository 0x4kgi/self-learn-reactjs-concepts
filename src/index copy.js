import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import './index.css';

import Hello from './local/hello.js';
import Clock from './local/clock.js';
import Toggle from './local/trigger.js';
import SafebooruAjax from './ajax/ajaxTest.js';
import GitHubUsers from './ajax/githubApi.js';

class WebpageRender extends React.Component {    
    render() {
        return (
            <div className="main-div">
                <Router>
                    <div className="topNav">
                        <Link to="/app">App</Link>
                        <Link to="/about">About</Link>
                    </div>
                    <div className="base-div">
                        <Switch>
                            <Router path="/app">
                                <Apps/>
                            </Router>
                            <Router path="/about">
                                <About />
                            </Router>
                            <Router path="/"><About /></Router>
                        </Switch>                   
                    </div>
                </Router>                
            </div>
        );
    }
}

function Apps() {
    let base = '/app';
    return(
        <div className="row">
        <div className="column side">
            <b>text outputs:</b>
            <ol>
                <li><Link to={`${base}/hello`}>hello.js</Link></li>
                <li><Link to={`${base}/clock`}>clock.js</Link></li>
                <li><Link to={`${base}/trigger`}>trigger.js</Link></li>
            </ol>              
            <b>api calls:</b>
            <ol>    
                <li><Link to={`${base}/safebooru`}>ajaxTest.js</Link></li>
                <li><Link to={`${base}/github`}>githubApi.js</Link></li>
            </ol>                    
        </div>
        <div className="column middle outline scroll">                    
            <Switch>
                <Route path={`${base}/:app`}><App /></Route>
                <Route path={`${base}`}><i>Select a page from the links at the side</i></Route>
            </Switch>                     
        </div> 
        </div>                                       
    );
}

function App() {
    let { app } = useParams();

    if      (app === 'hello')       return <Hello />
    else if (app === 'clock')       return <Clock />
    else if (app === 'trigger')     return <Toggle />
    else if (app === 'safebooru')   return <SafebooruAjax />
    else if (app === 'github')      return <GitHubUsers />
    else                            return <i>Select a Topic</i>
}

function About() {
    return (
        <b>HI</b>
    );
}

ReactDOM.render(<WebpageRender />, document.getElementById('ReactApp'));

