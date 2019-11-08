import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class RenderThumbs extends React.Component {
    //https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component
    _isMounted = false;
    //construct thingies, basic stuff
    constructor(props) {
        super(props);

        //properties to change later.....
        this.state = {
            isLoaded: false,
            error: null,
            limit: this.props.limit,
            tags: this.props.tags,
            data: [],
        }
    }

    componentDidMount() {
        this._isMounted = true;
        
        let limit = this.state.limit;
        let tags = (this.state.tags.length === 0) ? '' : this.state.tags;
        //fetch(), no idea what parameters this guy accepts, just following the docs atm
        fetch('https://safebooru.donmai.us/posts.json?tags=' + tags + '&limit=' + limit)
            //converts string received to a JSON object
            .then(res => res.json())
            .then(
                //.then() is a promise that accepts 2 parameters,
                //on "fulfilled" and "onreject"
                (result) => {
                    //if the data is a success
                    if(this._isMounted) {
                        this.setState({
                            isLoaded: true,
                            data: result,
                        });
                    }
                    
                },
                (error) => {
                    //you must have an error catch to provide feedback,
                    //or not and just let it fail silently
                    //or catch(), mentioned in the docs
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {error, isLoaded, data, tags} = this.state;

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

        let status = '';
        if (tags.length === 0) {
            status = 'Showing the most recent posts uploaded'
        } else {
            status = <span>Images with <i>{tags}</i> tags</span>;
        }

        return (
            <div className="_imageGallery">
                Loaded {data.length} images<br />
                {status}<br />
                <div className="_images">
                    {data.map(item => (
                        <a href={"https://safebooru.donmai.us/posts/" + item.id} target="_new" key={'link'+item.id}>
                            <img src={item.preview_file_url} alt={item.id} key={'image'+item.id}/>
                        </a>
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
            limit: 10,
            tags: '',
        };
    }

    componentDidMount() {
        //Calling this func when this component gets rendered.
        this.setState({
            limit: document.getElementById('limitInput').value,
            tags: document.getElementById('tagsInput').value,
        });

        //not yet efficient since the initial update must be by the user's choice
    }

    buttonClick() {
        this.setState({
            //Upon clicking, the objects in the render() that needs updating will update appropriately
            //The renderImages class will be forced to update since we are directly modifying the key{} prop

            limit: document.getElementById('limitInput').value,
            //limit: this.newLimit,
            //the line above is only applicable when limitInputChange(e) is being
            //used as onChange function of the input below.

            tags: document.getElementById('tagsInput').value,
        });
    }

    // limitInputChange(e) {
    //     this.newLimit = e.target.value;
    // }

    render() {
        var toggles = (
            <div className="_inputHolder">
                Tags: 
                <input 
                    id="tagsInput"
                    type="text"
                    placeholder="enter tags eg: amagi_(azur_lane)"
                    style={{width: '20%'}}
                    defaultValue="scenery no_human"
                />(maximum of 2, API limit)<br />
                Number of images: 
                <input
                    id="limitInput" 
                    type="text" 
                    /*
                        uncomment this when you're not referencing the function
                        use id
                        onChange={(e) => this.limitInputChange(e)} 
                    */
                    placeholder="enter how many images to load"
                    style={{width: '10%'}}
                    defaultValue="5"
                />(maximum of 200, API limit)<br />
                <button onClick={(e) => this.buttonClick(e)}>Load (how do I word this?)</button>
            </div>
        )

        return (
            <div className="_AjaxApplication">
                {toggles}
                {/*
                This is a class that actually shows things.
                
                To have a new instance of this class, you need to update the key={}.

                other than that, the other properties are being passed to the class                

                 */}
                <RenderThumbs 
                    limit={this.state.limit} 
                    tags={this.state.tags}
                    /*random just to force it to render every time */
                    key={Math.random()}
                />
            </div>
            
        );
    }
}

ReactDOM.render(<SafebooruAjax />, document.getElementById('root'));
