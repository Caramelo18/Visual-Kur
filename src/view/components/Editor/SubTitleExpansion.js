import React, { Component } from 'react';
import Typography from 'material-ui/Typography'


export default class SubTitleExpansion extends Component {

    render() {
        const {node,getNodeKey, path, changeNodeInput, changeNodeActivation,changeNodeSize, changeNodePool, changeNodeDense} = this.props


        const input = node.input != null ?
            (<input
                value={node.input}
                onChange={event => {
                    let input = event.target.value;
                    changeNodeInput(node, path, getNodeKey, input)
                }
                }/>) : (null);

        const activation = node.activation != null ?
            (<input
                value={node.activation}
                onChange={event => {
                    let activation = event.target.value;
                    changeNodeActivation(node, path, getNodeKey, activation)
                }
                }/>) : (null);

        const size = node.size != null ?
            (<div>
                <input value={node.size.x}
                       onChange={event => {
                          let x = event.target.value;
                          let y = node.size.y;
                           changeNodeSize(node, path, getNodeKey, x, y)
                       }
                       }/>
                <input value={node.size.y}
                       onChange={event => {
                           let y = event.target.value;
                           let x = node.size.x;
                           changeNodeSize(node, path, getNodeKey, x, y)
                       }
                       }/>
            </div>) : (null);

        const pool = node.pool != null ?
            (
                <div>
                    <input value={node.pool.x}
                           onChange={event => {
                               let x = event.target.value;
                               let y = node.pool.y;
                               changeNodePool(node, path, getNodeKey, x, y)
                           }
                           }/>
                    <input value={node.pool.y}
                           onChange={event => {
                               let y = event.target.value;
                               let x = node.pool.x;
                               changeNodePool(node, path, getNodeKey, x, y)
                           }
                           }/>
                </div>
            ):(null);

        const dense = node.dense != null ?
            (
                <div>
                    <input value={node.dense.x}
                           onChange={event => {
                               let x = event.target.value;
                               let y = node.dense.y;
                               changeNodeDense(node, path, getNodeKey, x, y)
                           }
                           }/>
                    <input value={node.dense.y}
                           onChange={event => {
                               let y = event.target.value;
                               let x = node.dense.x;
                               changeNodeDense(node, path, getNodeKey, x, y)
                           }
                           }/>
                </div>
            ):(null);

        return (
            <div>
                <Typography>{node.type}</Typography>
                {input}
                {activation}
                {size}
                {pool}
                {dense}
            </div>
        )
    }
}

