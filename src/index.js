import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class NameForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { //the properties' name here are the same as name="" in the input elements
            name: '',
            body: 'A text in the textarea',
        };

        //bind html functions here
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleInputChange(e) {
        //here, we explode the 'event' (e) object here in 3 manageable pieces
        const name = e.target.name;     //get the name of the event object
        const type = e.target.type;     //get the type of the event object
        const value = e.target.value;   //get the value of the event object

        //here we filter out the types and do appropriate updates here
        if (type === 'text' || type === 'textarea') {
            this.setState({
                [name]: value,
            });
        } else if (type === 'checkbox') {
            //do something with the checkboxes
        } else if (type === 'radio') {
            //do something with the radio buttons
        } else if (type === 'select-one') {
            //do something with the select values
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();     //since the button is at the for submit, with out this the page will reload
        alert(`Name is ${this.state.value}; Body is ${this.state.body}`);
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <label>
                    Name: <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange}/>
                </label><br />
                <label>
                    Text:<br /> <textarea name="body" value={this.state.body} onChange={this.handleInputChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

ReactDOM.render(<NameForm />, document.getElementById('root'));
