import React from "react";

export default function Layout(props) {
    return (
        <div className='row'>
            <div className='column side'>
                {props.sidebar}
            </div>
            <div className='column middle'>
                {props.children}
            </div>
        </div>
    );
}