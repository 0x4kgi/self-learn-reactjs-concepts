import React from 'react';

//we are importing the Routers here
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import Nest from './nest';
import {
    Page1,
    Page2,
    Page3,
    Page4,
    Page5,
    Page6,
} from './functions';

//since we are exporting ONLY this class
//append export default at the beginning of the class
//declaration
export default class App extends React.Component {
    render() {
        return (
            <Router>
            {/** Initialize a <Router /> if you're going to do some Routing
             * Unsure if this is really needed, but treat it as a important component
             * when using one 
            */}
                <ul>
                    {/** <Link /> works just like a <a /> tag, instead of href, you use to */}
                    <li><Link to='/page1'>Page1</Link></li>
                    <li><Link to='/page2'>Page2</Link></li>
                    <li><Link to='/page3'>Page3</Link></li>
                    <li><Link to='/page4'>Page4</Link></li>
                    <li><Link to='/page5'>Page5</Link></li>
                    <li><Link to='/page6'>Page6</Link></li>
                    <li><Link to='/nest'>nest</Link></li>
                </ul>
                <hr />
                <div>
                    <Switch>
                    {/** <Switch /> works like a switch case block, 
                     * the <Route /> is the case and the path are the parameters of the URL 
                     * and if one of those matches, render whatever is inside of the <Route /> tag
                     * 
                     * an additional parameter of path is exact, call it before the path 
                     * to strictly match the URL
                     * */}
                        <Route path="/page1"><Page1 /></Route>
                        <Route path="/page2"><Page2 /></Route>
                        <Route path="/page3"><Page3 /></Route>
                        <Route path="/page4"><Page4 /></Route>
                        <Route path="/page5"><Page5 /></Route>
                        <Route path="/page6"><Page6 /></Route>
                        <Route path="/nest"><Nest /></Route>
                    </Switch>
                </div>            
            </Router>            
        );
    }
}