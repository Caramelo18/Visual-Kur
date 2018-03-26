import React, { Component } from 'react';


export default class SubtitleExpansion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'empty subtitle'
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