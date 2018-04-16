import React, { Component } from 'react';


export default class SubTitleExpansion extends Component {

    render() {
        const {node,getNodeKey, path, changeNodeInput, changeNodeActivation,changeNodeArray} = this.props

        const input = node.input != null ?
            (<input
                value={node.input}
                onChange={event => {
                    let input = event.target.value;
                    changeNodeInput(node, path, getNodeKey, input)
                }
                }/>) : (null)

        const activation = node.activation != null ?
            (<input
                value={node.activation}
                onChange={event => {
                    let activation = event.target.value;
                    changeNodeActivation(node, path, getNodeKey, activation)
                }
                }/>) : (null)

        const size = node.size != null ?
            (<div>
                <input value={node.size.x}
                       onChange={event => {
                          let x = event.target.value
                          let y = node.size.y
                           changeNodeArray(node, path, getNodeKey, x, y)
                       }
                       }/>
                <input value={node.size.y}
                       onChange={event => {
                           let y = event.target.value
                           let x = node.size.x
                           let size = [{x: node.size[0],y: event.target.value}]
                           changeNodeArray(node, path, getNodeKey, x, y)
                       }
                       }/>
            </div>) : (null)


        return (
            <div>
                {input}
                {activation}
                {size}
            </div>
        )
    }
}

