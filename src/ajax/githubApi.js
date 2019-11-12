import React from 'react';

class GitHubUsers extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            key: 0,
            search: "",
            type: "repositories",
            sort: "stars",
            text: "no updateplz",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            key: this.state.key + 1,
        })
    }

    handleOnChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        })
    }

    render() {
        const ts = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    Look for:  
                    <input type="text" name="search" onChange={this.handleOnChange} />
                    which is a: 
                    <select name="type" onChange={this.handleOnChange}>
                        <option value="repositories">Repository</option>
                        <option value="users">User</option>
                    </select>
                    sort by:
                    <select name="sort" onChange={this.handleOnChange}>
                        <SortByOptions type={this.state.type}/>  
                    </select>                    
                    <input type="submit" value="Do Query"/> 
                </form>
                <QueryDisplay search={ts.search} type={ts.type} sort={ts.sort} key={ts.key}/>
            </div>
        );
    }
}

class QueryDisplay extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            search: "",
            type: "repo",
            sort: "stars",

            isLoaded: false,

            resultCount: null, 
            isResultsIncomplete: null,
            data: [],

            error: null,
        }
    }

    componentDidMount() {
        const tp = this.props;
        
        this._isMounted = true;
        
        if (tp.search !== "") {
            this.setState({
                search: tp.search.split(' ').join('+'),
                type: tp.type,
                sort: tp.sort,
            }, this.setStateComplete);
        }    
    }

    setStateComplete() {
        const ts = this.state;
        const githubApiURL = `https://api.github.com/search/${ts.type}?q=${ts.search}&sort=${ts.sort}`
        
        if (this._isMounted) {
            fetch(githubApiURL).then(res => res.json()).then(
                (result) => {
                    var partialState = {};

                    if (result.message) {
                        partialState = {
                            error: result.message,
                            isLoaded: true,
                        }
                    } else {
                        partialState = {
                            resultCount: result.total_count,
                            isResultsIncomplete: result.incomplete_results,
                            data: result.items,
                            isLoaded: true,
                        }
                    }

                    this.setState( partialState );
                },(error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const ts = this.state;
        const type = ts.type;
        let output = null;
        
        const style = {margin: "5px", height:"80px", border: "1px solid black"};

        if (type === 'repositories') {
            output = (ts.data.map(item => (
                <div key={item.id} style={style}>
                    <div style={{float: "left"}}>
                        <img src={item.owner.avatar_url} alt={item.owner.id} width="75px"/> 
                    </div>
                    <div>
                       <b>{item.full_name}</b><a href={item.html_url} target="_new">=&gt;</a><br />
                       <small>{item.description}</small>
                    </div>                   
                </div>                    
            )));
        } else if (type === 'users') {
            output = (ts.data.map(item => (
                <div key={item.id} style={style}>
                    <div style={{float: "left"}}>
                        <img src={item.avatar_url} alt={item.id} width="75px"/>
                    </div>
                    <div style={{padding:"10px"}}>
                        <p>{item.login}<a href={item.html_url} target="_new">=&gt;</a></p>
                    </div>                   
                </div>                    
            )));
        } else {
            output = <i>Try searching something...</i>;
        }

        return (
            <div>
                {output}
            </div>
        );
    }
}

function SortByOptions(props) {
    let type = props.type;
    let options = [];

    if (type === 'repositories') {
        options.push(
            <option value="stars" key="stars">Stars</option>,
            <option value="forks" key="forks">Forks</option>,
            <option value="help-wanted-issues" key="help-wanted-issues">Issues</option>,
            <option value="updated" key="updated">Updated</option>,
        );
    } else if (type === 'users') {
        options.push(
            <option value="followers" key="followers">Followers</option>,
            <option value="repositories" key="repositories">Repositories</option>,
            <option value="joined" key="joined">Joined</option>,
        );
    }
    return options;
}

export default GitHubUsers;