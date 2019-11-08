import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class RenderThumbs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
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
        const {error, isLoaded, data} = this.state;

        if (error) {
            return (
                <div className="_errorHandle">
                    <b>{error}</b>
                </div>
            );
        } else if (!isLoaded) {
            return (
                <div className="_loadingHandle">
                    Loading thumbnails....
                </div>
            );
        }

        return (
            <div className="_imageGallery">
                Loaded {data.length} images<br />
                <div className="_images">
                    {data.map(item => (
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
            defaultLimit: 10,
            limit: 10,
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
            limit: document.getElementById('limitInput').value,
            //limit: this.newLimit,
            //the line above is only applicable when limitInputChange(e) is being
            //used as onChange function of the input below.
        });
    }

    // limitInputChange(e) {
    //     this.newLimit = e.target.value;
    // }

    render() {
        var toggles = (
            <div className="_inputHolder">
                <input
                    id="limitInput" 
                    type="text" 
                    /*
                        uncomment this when you're not referencing the function
                        use id
                        onChange={(e) => this.limitInputChange(e)} 
                    */
                    placeholder="enter how many images to load"
                />
                <button onClick={(e) => this.buttonClick(e)}>Change limit</button>
            </div>
        )

        return (
            <div className="_AjaxApplication">
                {toggles}
                <RenderThumbs limit={this.state.limit} key={this.state.limit}/>
            </div>
            
        );
    }
}

ReactDOM.render(<SafebooruAjax />, document.getElementById('root'));
