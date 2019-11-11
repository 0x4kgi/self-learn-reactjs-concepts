import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RenderThumbs from './imageThumbnails.js';

class SafebooruAjax extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            limit: 10,
            tags: "scenery no_human",
            pageNumber: 1,
            showNext: true,
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

            pageNumber: 1,

            showNext: true,
        });
    }

    turnPage(value) {
        this.setState({
            pageNumber: this.state.pageNumber + value,
        });
    }

    pageCountHandle() {
        if (this.state.showNext) {
            this.setState({
                showNext: false,
            });
        }
        
    }

    // limitInputChange(e) {
    //     this.newLimit = e.target.value;
    // }

    // handleTextBoxChange(e, from) {
    //     let stateObject = {};
    //     if (from === 'tags') {
    //         stateObject = {
    //             tags: e.target.value,
    //         }
    //     } else if (from === 'limit') {
    //         stateObject = {
    //             limit: e.target.value,
    //         }
    //     }

    //     this.setState(stateObject);
    // }

    render() {
        let toggles = (
            <div className="_inputHolder">
                Tags:<br />
                <input 
                    id="tagsInput"
                    type="text"
                    placeholder="enter tags eg: amagi_(azur_lane)"
                    defaultValue="scenery no_human"
                    //value={this.state.tags}
                    //onChange={(e) => this.handleTextBoxChange(e, 'tags')}
                /><br />
                Number of images:<br /> 
                <input
                    id="limitInput" 
                    type="text" 
                    /*
                        uncomment this when you're not referencing the function
                        use id
                        onChange={(e) => this.limitInputChange(e)} 
                    */
                    placeholder="enter how many images to load"
                    defaultValue="10"
                    //value={this.state.limit}
                    //onChange={(e) => this.handleTextBoxChange(e, 'limit')}
                /><br />
                <button onClick={(e) => this.buttonClick(e)} style={{width:'100%'}}>Load</button>
            </div>
        );

        let prevButton = (this.state.pageNumber > 1)
            && <button onClick={(e) => this.turnPage(-1)}>&lt;</button>;
        let nextButton = ((this.state.pageNumber) && this.state.showNext)
            && <button onClick={(e) => this.turnPage(1)}>&gt;</button>;     


        let pages = (
            <div className="_pageIndicator">
                page: {prevButton}
                {this.state.pageNumber}
                {nextButton}
            </div>
        );

        return (
            <div className="_AjaxApplication">
                <div className="aside">
                    {toggles}
                </div>
                <div className="main-content">
                    <RenderThumbs 
                        limit={this.state.limit} 
                        tags={this.state.tags}
                        page={this.state.pageNumber}
                        buttons={pages}
                        //random just to force it to render every time
                        //not really efficient but React is not complaining
                        //so... :shrug:
                        key={Math.random()}

                        //letting the child use parent function by passing it
                        checkNext={() => this.pageCountHandle()}
                    />
                    <div className="bottom-bar">
                        <hr />
                        {pages}
                    </div>  
                </div>        
            </div>            
        );
    }
}

ReactDOM.render(<SafebooruAjax />, document.getElementById('root'));
