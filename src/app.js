import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
} from 'react-router-dom';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <ul>
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

function Page1() { return (<b>Page 1</b>); }
function Page2() { return (<b>Page 2</b>); }
function Page3() { return (<b>Page 3</b>); }
function Page4() { return (<b>Page 4</b>); }
function Page5() { return (<b>Page 5</b>); }
function Page6() { return (<b>Page 6</b>); }

function Nest() {
    let match = useRouteMatch();

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
            </ul>
            <hr />
            <Switch>
                <Route path={`${match.path}/page1`}><Page1 /></Route>
                <Route path={`${match.path}/page2`}><Page2 /></Route>
                <Route path={`${match.path}/page3`}><Page3 /></Route>
                <Route path={`${match.path}/page4`}><Page4 /></Route>
                <Route path={`${match.path}/page5`}><Page5 /></Route>
                <Route path={`${match.path}/page6`}><Page6 /></Route>
                <Route path={`${match.path}`}><>select path plz</></Route>
            </Switch>
        </div>
    );
}