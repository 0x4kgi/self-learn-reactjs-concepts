import React from 'react';

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
            limit: this.props.limit > 200 ? 200 : this.props.limit,
            tags: this.props.tags,
            page: this.props.page,
            data: [],
        }
    }

    componentDidMount() {
        this._isMounted = true;

        let limit = this.state.limit;
        let tags = (this.state.tags.length === 0) ? '' : this.state.tags;
        let page = this.state.page;

        let apiUrl = 'https://safebooru.donmai.us/posts.json?tags=' + tags + '&limit=' + limit + '&page=' + page;

        //fetch(), no idea what parameters this guy accepts, just following the docs atm
        fetch(apiUrl)
            //converts string received to a JSON object
            .then(res => res.json())
            .then(
                //.then() is a promise that accepts 2 parameters,
                //"on fulfilled" and "on rejected"
                (result) => {
                    
                    //if the data is a success
                    if(this._isMounted) {
                        let responseState = {}
                        
                        if(result.message && !result.status) {
                            //if the data returns .success: false, do this
                            responseState = {
                                isLoaded: true,
                                error: result.message,
                            };
                        } else {
                            //if the sever response has no error, proceed normally
                            responseState = {
                                isLoaded: true,
                                data: result,
                            };
                        }
                        
                        this.setState(responseState);
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
            let tagGroup = tags.split(' ');
            let tagsWithLinks = tagGroup.map(item => (
                <span key={`tag${item}`}>
                    <a 
                        href={`https://safebooru.donmai.us/posts?tags=${item}`}
                        target="_new"
                        
                        className="tag-link"
                    >
                        {item}
                    </a>&nbsp;
                </span>                
            ));
            status = <span>images with <i>{tagsWithLinks}</i> tags</span>;
        }

        if(data.length < this.state.limit) this.props.checkNext();
        
        return (
            <div className="_imageGallery">
                <div className="top-bar">
                    Loaded {data.length} {status} (page: {this.state.page})
                </div>
                <div className="_images">
                    {data.map(item => (
                        <a 
                            href={"https://safebooru.donmai.us/posts/" + item.id} 
                            target="_new" 
                            key={'link'+item.id}
                        >
                            <img src={item.preview_file_url} alt={item.id} key={'image'+item.id}/>
                        </a>
                    ))}
                </div>                       
            </div>
        );        
    }
}

export default RenderThumbs;