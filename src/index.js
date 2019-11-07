import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

function formatDate(date) {
    return date.toLocaleDateString();
}

function Avatar(props) {
    return (
        <img className="Avatar"
            src={props.user.avatarUrl}
            alt={props.user.name}
            width="64"
        />
    );
}

function UserInfo(props) {
    return (
        <div className="UserInfo">
            <Avatar user={props.user} />
            <div className="UserInfo-name">
                {props.user.name}
            </div>
        </div>
    );
}

function Comment(props) {
    return (
        <div className="Comment">
            <UserInfo user={props.author} />
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}

const comment = {
    date: new Date(),
    text: "Comment Text",
    author: {
        avatarUrl: "https://avatars3.githubusercontent.com/u/17591127?s=460&v=4",
        name: "Some Name",
    }
}

function App() {
    return (
        <div>
            <Welcome name="Name1" />
            <Welcome name="Name2" />
            <Welcome name={comment.author.name} />
            <hr />
            <Comment 
                date={comment.date}
                text={comment.text}
                author={comment.author}
            />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
