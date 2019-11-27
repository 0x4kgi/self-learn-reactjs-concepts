import React from "react";
import ReactDOM from "react-dom";
import {
    //BrowserRouter as Router, //if the server has the page at the link, use this
    HashRouter as HRouter,  //if your app only relies on client side rendering, use this
    Switch,
    Route,
    Link,
    //useRouteMatch,
    //useParams
  } from "react-router-dom";
  
import "./index.css";

import Apps from "./app";
import {About, NoneSelected} from "./default";

class WebpageRender extends React.Component {
    render() {
        return (
            <div className="main-div">
                <HRouter>
                    <div className="topNav">
                        <Link to="/app">App</Link>
                        <Link to="/about">About</Link>
                    </div>
                    <div className="base-div">
                        <Switch>
                            <Route path="/app"><Apps /></Route>
                            <Route path="/about"><About /></Route>
                            <Route path="/"><NoneSelected /></Route>
                        </Switch>
                    </div>
                </HRouter>
            </div>
        );
    }
}

ReactDOM.render(<WebpageRender />, document.getElementById("ReactApp"));

