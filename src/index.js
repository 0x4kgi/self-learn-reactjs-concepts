import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function CountingExample() {
    const [count, setCount] = useState(0);


    return (
        <div>
            <p>Count {count}</p>
            <p>
                <button onClick={() => setCount(count + 1)}>+</button>
                <button onClick={() => setCount(count - 1)}>-</button>
                <button onClick={() => setCount(0)}>r</button>
            </p>
            <p>
                <input type="text" onChange={() => setCount(count + 1)} />
            </p>
        </div>
    );
}

ReactDOM.render(<CountingExample />, document.getElementById('root'));
