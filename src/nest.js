import React from 'react';

//Same initialization of the react routers
//Here we wont use the BrowserRouter since this class
//is nested or called from a parent <Route />
//back in the app.js
import {
    Switch,
    Route,
    Link,
} from 'react-router-dom';

//here we are using withRouter to have the class use the match props
//only use one if your <Route />ing to a class and it needs to have that props
//to avoid conflicts with the URL
import { withRouter } from "react-router";


import VariablesFromUrl from './varFromUrl';
import {
    Page1,
    Page2,
    Page3,
    Page4,
    Page5,
    Page6,
} from './functions';

class Nest extends React.Component {
    /** If you notice, we are not using ang constructor() in this component 
     * since we are not saving any state in this class 
     * 
     * this class is only giving out renders()
     * 
     * I could have used a functions instead of a class but I am using one to 
     * demonstrate the functionality of the withRouter
     */

    render() {
        let match = this.props.match;
        /** This is the reason why we are using withRouter
         * every match prop from the parent is being passed to the 
         * this.match.prop
         */
        return (
            <div>
                <h2>From nest:</h2>
                <ul>
                    <li><Link to={`${match.url}/page1`}>Page1</Link></li>
                    <li><Link to={`${match.url}/page2`}>Page2</Link></li>
                    <li><Link to={`${match.url}/page3`}>Page3</Link></li>
                    <li><Link to={`${match.url}/page4`}>Page4</Link></li>
                    <li><Link to={`${match.url}/page5`}>Page5</Link></li>
                    <li><Link to={`${match.url}/page6`}>Page6</Link></li>
                    <li><Link to={`${match.url}/doSomethingWith/someVariable`}>Test1</Link></li>
                </ul>
                <hr />
                <Switch>
                    <Route path={`${match.path}/page1`}><Page1 /></Route>
                    <Route path={`${match.path}/page2`}><Page2 /></Route>
                    <Route path={`${match.path}/page3`}><Page3 /></Route>
                    <Route path={`${match.path}/page4`}><Page4 /></Route>
                    <Route path={`${match.path}/page5`}><Page5 /></Route>
                    <Route path={`${match.path}/page6`}><Page6 /></Route>

                    {/** The :variable here is the var that is going to be 
                     * passed to <VariablesFromUrl />.
                     * 
                     * If you look above, the value that is going to get passed
                     * is "someVariable" because it is appended in the <Link />
                     */}
                    <Route path={`${match.path}/doSomethingWith/:variable`}><VariablesFromUrl /></Route>

                    <Route path={`${match.path}/`}><>select path plz</></Route>
                </Switch>
            </div>
        );
    }
    
}

/** You export the <Nest /> with routing by exporting as such */
export default withRouter(Nest);