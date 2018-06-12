import React, { Component } from 'react';


export default class SubTitleExpansion extends Component {

    render() {
        const {node,getNodeKey, path, changeNodeInput, changeNodeActivation,changeNodeSize, changeNodePool, changeNodeDense, changeNodeKernels} = this.props;


        const input = node.input != null ?
            (<div>
                input
                <input
                    value={node.input}
                    onChange={event => {
                        let input = event.target.value;
                        changeNodeInput(node, path, getNodeKey, input)
                    }
                    }/>
            </div>) : (null);

        const activation = node.activation != null ?
            (<div>
                activation
                <input
                    value={node.activation}
                    onChange={event => {
                        let activation = event.target.value;
                        changeNodeActivation(node, path, getNodeKey, activation)
                    }
                    }/>
            </div>) : (null);

        const size = node.size != null ?
            (<div>
                size
                <input value={node.size[0]}
                       onChange={event => {
                           let x = event.target.value;
                           let y = node.size[1];
                           changeNodeSize(node, path, getNodeKey, x, y)
                       }
                       }/>
                <input value={node.size[1]}
                       onChange={event => {
                           let y = event.target.value;
                           let x = node.size[0];
                           changeNodeSize(node, path, getNodeKey, x, y)
                       }
                       }/>
            </div>) : (null);

        const kernels = node.kernels != null ?
            (<div>
                kernels
                <input value={node.kernels}
                       onChange={event => {
                           let kernels = event.target.value;
                           changeNodeKernels(node, path, getNodeKey, kernels)
                       }
                       }/>
            </div>) : (null);

        const pool = node.type === "pool" ?
            (<div>
                pool
                <input value={node[0]}
                       onChange={event => {
                           let x = event.target.value;
                           let y = node[1];
                           changeNodePool(node, path, getNodeKey, x, y)
                       }
                       }/>
                <input value={node[1]}
                       onChange={event => {
                           let y = event.target.value;
                           let x = node[0];
                           changeNodePool(node, path, getNodeKey, x, y)
                       }
                       }/>
            </div>) : (null);

        const dense = node.dense != null ?
            (<div>
                dense  [
                <input value={node.dense[0]}
                       onChange={event => {
                           let x = event.target.value;
                           let y = node.dense[1];
                           changeNodeDense(node, path, getNodeKey, x, y)
                       }
                       }/>
                ,
                <input value={node.dense[1]}
                       onChange={event => {
                           let y = event.target.value;
                           let x = node.dense[0];
                           changeNodeDense(node, path, getNodeKey, x, y)
                       }
                       }/>
                ]
            </div>) : (null);

        const type = node.type === "convolution" || node.type === "flatten" ?
            (<div>
                {node.type}
            </div>) : (null);
        return (
            <div>
                {type}
                {input}
                {activation}
                {size}
                {kernels}
                {pool}
                {dense}
            </div>
        )
    }
}
