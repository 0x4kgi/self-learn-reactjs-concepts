import React from "react";
import { withRouter } from "react-router";
import {
    Link, 
    Switch,
    Route,
    //useParams
} from "react-router-dom";

import {
    Hello, 
    Clock, 
    Trigger, 
    SafebooruAjax, 
    GithubApi
} from "./apps";

import { NoneSelected } from "./default";

import Layout from "./layout";

class Apps extends React.Component {
    render() {
        let match = this.props.match;
        return (
            <Layout sidebar={
                <div>
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
                        <li><Link to={`${match.url}/booru`}>*booru</Link></li>
                        <li><Link to={`${match.url}/github`}>GitHub</Link></li>
                    </ol>
                </div>
            }>
                <Switch>
                    <Route path={`${match.path}/hello`}><Hello /></Route>
                    <Route path={`${match.path}/clock`}><Clock /></Route>
                    <Route path={`${match.path}/toggle`}><Trigger /></Route>
                    <Route path={`${match.path}/booru`}><SafebooruAjax /></Route>
                    <Route path={`${match.path}/github`}><GithubApi /></Route>
                    <Route path={match.path}><NoneSelected inside="false"/></Route>                    
                </Switch>
            </Layout>
        );
    }
}

export default withRouter(Apps);