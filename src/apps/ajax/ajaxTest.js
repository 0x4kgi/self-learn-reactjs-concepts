import React from "react";
import RenderThumbs from "./safebooru/thumbnails";

class SafebooruAjax extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            source: "safebooru",
            limit: 20,
            tags: "scenery no_human",
            pageNumber: 1,

            key: 0,

            showNext: true,
            loaded: false,
        };
    }

    buttonClick() {
        this.setState((prevState) => {
            return { 
                key: prevState.key + 1,
                pageNumber: 1,
                showNext: true,
                loaded: false,
            };
        });
    }

    handleInputChange(event) {
        let name = event.target.name;
        let value = event.target.value;

        this.setState({
            [name]: value,
        });
    }

    turnPage(value) {
        this.setState((prevState) => {
            return {
                pageNumber: prevState.pageNumber + value,
                key: prevState.key + 1,
            };
        });
    }

    render() {
        var toggles = (
            <div className="_inputHolder">
                Source:
                <select 
                    name="source"
                    value={this.state.source}
                    onChange={(e) => {
                        this.handleInputChange(e);
                        this.buttonClick(e);
                    }}
                >
                    <option value="safebooru">Safebooru</option>
                    <option value="danbooru">Danbooru</option>
                </select>
                Tags:
                <input 
                    name="tags"
                    type="text"
                    value={this.state.tags}
                    onChange={(e) => this.handleInputChange(e)}
                />
                Limit:
                <input 
                    name="limit"
                    type="text"
                    value={this.state.limit}
                    onChange={(e) => this.handleInputChange(e)}
                />
                <button onClick={(e) => this.buttonClick(e)}>:magnifying glass emoji:</button>
            </div>
        );

        let prevButton = (this.state.pageNumber > 1)
            && <button onClick={(e) => this.turnPage(-1)}>&lt;</button>;
        let nextButton = ((this.state.pageNumber) && this.state.showNext)
            && <button onClick={(e) => this.turnPage(1)}>&gt;</button>;

        let pages =  (
            <div className="_pageIndicator">
                page: {prevButton}
                {this.state.pageNumber}
                {nextButton}
            </div>
        );    

        return (
            <div className="text-center">
                {toggles}
                <RenderThumbs
                    source={this.state.source}
                    tags={this.state.tags}
                    page={this.state.pageNumber}
                    limit={this.state.limit} 
                    key={this.state.key}
                />
                <hr />
                {pages}
            </div>            
        );
    }
}

export default SafebooruAjax;