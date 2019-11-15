import React, { useState } from "react";
import { withRouter } from "react-router";
import { Link, BrowserRouter, Switch, Route, useParams } from 'react-router-dom';

class VariablesFromUrl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            variable: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.variable;
        console.log(this.props.match);
        this.setState({
            variable: id,
        });
    }

    componentWillUnmount() {
        
    }

    handleInputChange(event) {
        let inputName = event.target.name;
        let inputType = event.target.type;
        let inputValue = event.target.value;

        if (inputType === 'text') {
            this.setState({
                [inputName]: inputValue,
            });
        }
    }
    
    render() {
        const url = this.props.match.url;
        return (
            <div>
                <input type='text' name='variable' value={this.state.variable} onChange={this.handleInputChange} />
                <BrowserRouter>
                    <Link to={`${url}/${this.state.variable}/show`}><button>Show</button></Link>
                    <Link to={`${url}/${this.state.variable}/edit`}><button>Edit</button></Link>

                    <Switch>
                        <Route path={`${url}/:someQuery/show`}><FuncQueryShow /></Route>
                        <Route path={`${url}/:someQuery/edit`}><FuncQuery /></Route>
                        <Route exact path={`${url}/`}><Nothing /></Route>
                    </Switch>
                </BrowserRouter>                
            </div>
        );
    }
}

function FuncQuery() {
    let query = useParams();

    return (<h5>EDIT: <input type='text' defaultValue={query.someQuery}></input></h5>);
}

function FuncQueryShow() {
    let query = useParams();

    return (<h5>SHOWING: {query.someQuery}</h5>);
}

function Nothing() {
    return (<h5>nothing....</h5>);
}

export default withRouter(VariablesFromUrl);