import React from 'react';
import Layout from './layout';

export function About() {
    return (
        <Layout sidebar={
            <div>            
                <b>List Header</b>
                <ol>
                    <li>there are no links here</li>
                </ol>    
            </div>
        }>
            A ReactJS app.
        </Layout>
    );
}

export function NoneSelected(props) {
    const message = <i>Select something by clicking on the texts</i>;
    if(props.inside) {
        return message;
    }  

    return (
        <Layout sidebar={<i>none</i>}>{message}</Layout>
    );
}