import React from 'react';

var newLimit = 0;

class RenderThumbs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: this.props.limit,
            data: [],
        }
    }

    componentDidMount() {
        fetch('https://safebooru.donmai.us/posts.json?tags=scenery&limit=' + this.state.limit)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    }

    render() {
        return (
            <div>
                Loaded images<br />
                <div className="imageGallery">
                    {this.state.data.map(item => (
                        <img src={item.preview_file_url} alt={item.id} />
                    ))}
                </div>
            </div>
        );
    }
}

class SafebooruAjax extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            limit: 5,

            error: null,
            isLoaded: false,

            data: [],
        };
    }

    componentDidMount() {
        fetch('https://safebooru.donmai.us/posts.json?tags=scenery&limit=' + this.state.limit)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    }

    buttonClick() {
        this.setState({
            limit: newLimit,
        });
    }

    limitInputChange(e) {
        newLimit = e.target.value;
    }

    render() {
        var toggles = (
            <div>
                <input type="text" onChange={(e) => this.limitInputChange(e)}/>
                <button onClick={(e) => this.buttonClick(e)}>Change limit</button>
            </div>
        )

        if(this.state.error) {
            return <div>{toggles}<br />{this.state.error}</div>;
        } else if (!this.state.isLoaded) {
            return <div>{toggles}<br />Loading....</div>;
        } else {
            return (
                <div>
                    {toggles}
                    <RenderThumbs limit={this.state.limit} key={this.state.limit}/>
                </div>
                
            );
        }
    }
}

export default SafebooruAjax;