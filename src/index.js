import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const user = {
    firstName: "First",
    lastName: "Last"
}

function formatName(user) {
    return user.firstName + "-" + user.lastName;
}


const imageURL = "https://i.ytimg.com/vi/q38Y5FLK63k/maxresdefault.jpg";

//you must have a parent tag in order to ad several tags inside
const combination = (
    <div>
        <b>Hello world! ...and {formatName(user)}</b><br />
        <img src={imageURL} alt="nothing"/>
    </div>
);

ReactDOM.render(combination, document.getElementById('root'));
