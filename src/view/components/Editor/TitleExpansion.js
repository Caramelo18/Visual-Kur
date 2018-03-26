import React, { Component } from 'react';


export default class TitleExpansion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'empty title'
        }
    }

    render() {
        return (
            <div>
                <span>{this.state.title}</span>
            </div>
        )
    }
}