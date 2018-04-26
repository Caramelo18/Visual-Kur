import React, { Component } from 'react';
import {CardContent} from 'material-ui/Card'
import Typography from 'material-ui/Typography'


export default class TitleExpansion extends Component {

    render() {
        const {node} = this.props

        return (
            <CardContent>
                <Typography>{node.type}</Typography>
            </CardContent>
        )
    }
}