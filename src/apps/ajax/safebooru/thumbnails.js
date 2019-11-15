import React from 'react';

export default class RenderThumbs extends React.Component {
    _isMounted = false;
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
        this._isMounted = true;
        fetch('https://safebooru.donmai.us/posts.json?tags=scenery&limit=' + this.state.limit)
            .then(res => res.json())
            .then(
                (result) => {
                    if (this._isMounted) {
                        this.setState({
                            isLoaded: true,
                            data: result,
                        });
                    }
                    
                },
                (error) => {
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
            <div className="imageGallery" >
                Loaded {data.length} images<br />
                <div>
                    {data.map(item => (
                        <img 
                            src={item.preview_file_url} 
                            alt={item.id} key={item.id}
                            className="thumbnails"
                        />
                    ))}
                </div>
            </div>
        );
    }
}