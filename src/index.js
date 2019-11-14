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
            <div className='main-div'>
                <Router>
                    <div className='topNav'>
                        <Link to='/app'>App</Link>
                        <Link to='/about'>About</Link>
                    </div>
                    <div className='base-div'>
                        <Switch>
                            <Route path='/app'><Apps /></Route>
                            <Route path='/about'><About /></Route>
                            <Route path='/'><NoneSelected /></Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

function Apps() {
    let match = useRouteMatch();

    return (
        <div className='row'>
            <div className='column side'>
                <b>Static Outputs</b>
                <ol>
                    <li><Link to={`${match.url}/hello`}>String output</Link></li>
                    <li><Link to={`${match.url}/clock`}>Ticking Clock</Link></li>
                </ol>
                <b>On Events</b>
                <ol>
                    <li><Link to={`${match.url}/toggle`}>Toggle button</Link></li>
                </ol>
                <b>API Requests</b>
                <ol>
                    <li><Link to={`${match.url}/safebooru`}>Safebooru</Link></li>
                    <li><Link to={`${match.url}/github`}>GitHub</Link></li>
                </ol>
            </div>
            <div className='column middle'>
                <Switch>
                    <Route path={`${match.path}/hello`}><Hello /></Route>
                    <Route path={`${match.path}/clock`}><Clock /></Route>
                    <Route path={`${match.path}/toggle`}><Toggle /></Route>
                    <Route path={`${match.path}/safebooru`}><SafebooruAjax /></Route>
                    <Route path={`${match.path}/github`}><GitHubUsers /></Route>
                    <Route path={match.path}><NoneSelected /></Route>                    
                </Switch>
            </div>
        </div>
    );
}

function About() {
    return (
        <div className='row'>
            <div className='column side'>
                <b>List Header</b>
                <ol>
                    <li>there are no links here :)</li>
                </ol>                
            </div>
            <div className='column middle'>
                A ReactJS web app that was made by me to practice ReactJS.
            </div>
        </div>
    );
}

function NoneSelected() {
    return (
        <div>Select something by clicking on the texts :)</div>
    );
}

ReactDOM.render(<WebpageRender />, document.getElementById('ReactApp'));

