import React from 'react';
import RenderThumbs from './safebooru/thumbnails';

class SafebooruAjax extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            defaultLimit: 10,
            limit: 10,
        };
    }

    buttonClick() {
        this.setState({
            limit: document.getElementById('limitInput').value,
        });
    }

    render() {
        var toggles = (
            <div className="_inputHolder">
                Limit: (max 200)
                <input 
                    type="text"  
                    placeholder="enter how many images to load"
                    defaultValue="10"
                    id="limitInput"
                />
                <button onClick={(e) => this.buttonClick(e)}>Change limit</button>
            </div>
        )

        return (
            <div className="text-center">
                {toggles}
                <RenderThumbs limit={this.state.limit} key={this.state.limit}/>
            </div>            
        );
    }
}

export default SafebooruAjax;