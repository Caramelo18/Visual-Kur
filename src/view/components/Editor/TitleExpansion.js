import React, { Component } from 'react';


export default class TitleExpansion extends Component {

    render() {
        const {node} = this.props

        const type = (
            <span>{node.type}</span>
        )

        return (
            <div>
                {type}
            </div>
        )
    }
}