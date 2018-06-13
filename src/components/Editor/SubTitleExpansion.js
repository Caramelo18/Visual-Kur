import React, { Component } from 'react';


const styles = {
    nodeName: {
        fontSize: 15,
        display: 'inline-block'
    },
    nodeLine: {
      marginTop: 5,
    },
    nodeField: {
        fontSize: 12,
        display: 'inline'
    },
    textInput: {
        marginLeft: 5,
        width: 120,
        fontFamily: "monospace",
    },
    numberInput: {
        marginLeft: 5,
        width: 50,
        fontFamily: "monospace",
    },

};

export default class SubTitleExpansion extends Component {

    render() {

        const {node,getNodeKey, path, changeNodeInput,
            changeNodeActivation,changeNodeSize, changeNodePool,
            changeNodeDense, changeNodeKernels, changeNodeName, changeNodeOutput} = this.props;



        const input = node.input != null ?
            (<div>
                <div style={styles.nodeName}>
                    input
                </div>

                <input style={styles.textInput}
                       value={node.input}
                       onChange={event => {
                           let input = event.target.value;
                           changeNodeInput(node, path, getNodeKey, input)
                       }
                       }/>
            </div>) : (null);

        const activation = node.activation != null ?
            (<div>
                <div style={styles.nodeName}>
                    activation
                </div>

                <input style={styles.textInput}
                       value={node.activation}
                       onChange={event => {
                           let activation = event.target.value;
                           changeNodeActivation(node, path, getNodeKey, activation)
                       }
                       }/>
            </div>) : (null);

        const size = node.size != null ?
            (<div style={styles.nodeLine}>
                <div style={styles.nodeField}>
                    size
                </div>

                <input style={styles.numberInput}
                       value={node.size[0]}
                       onChange={event => {
                           let x = event.target.value;
                           let y = node.size[1];
                           changeNodeSize(node, path, getNodeKey, x, y)
                       }
                       }/>
                <input style={styles.numberInput}
                       value={node.size[1]}
                       onChange={event => {
                           let y = event.target.value;
                           let x = node.size[0];
                           changeNodeSize(node, path, getNodeKey, x, y)
                       }
                       }/>

            </div>) : (null);

        const name = node.name != null ?
            (<div style={styles.nodeLine}>
                <div style={styles.nodeField}>
                    name
                </div>

                <input style={styles.numberInput}
                       value={node.name}
                       onChange={event => {
                           changeNodeName(node, path, getNodeKey, event.target.value)
                       }
                       }/>
            </div>) : (null);

        const kernels = node.kernels != null ?
            (<div style={styles.nodeLine}>
                <div style={styles.nodeField}>
                    kernels
                </div>

                <input style={styles.numberInput}
                       value={node.kernels}
                       onChange={event => {
                           let kernels = event.target.value;
                           changeNodeKernels(node, path, getNodeKey, kernels)
                       }
                       }/>
            </div>) : (null);

        const pool = node.type === "pool" ?
            (<div>
                <div style={styles.nodeName}>
                    pool
                </div>

                <input style={styles.numberInput}
                       value={node[0]}
                       onChange={event => {
                           let x = event.target.value;
                           let y = node[1];
                           changeNodePool(node, path, getNodeKey, x, y)
                       }
                       }/>
                <input style={styles.numberInput}
                       value={node[1]}
                       onChange={event => {
                           let y = event.target.value;
                           let x = node[0];
                           changeNodePool(node, path, getNodeKey, x, y)
                       }
                       }/>
            </div>) : (null);

        const dense = node.dense != null ?
            (<div>
                <div style={styles.nodeName}>
                    dense
                </div>

                <input style={styles.numberInput}
                       value={node.dense[0]}
                       onChange={event => {
                           let x = event.target.value;
                           let y = node.dense[1];
                           changeNodeDense(node, path, getNodeKey, x, y)
                       }
                       }/>

                <input style={styles.numberInput}
                       value={node.dense[1]}
                       onChange={event => {
                           let y = event.target.value;
                           let x = node.dense[0];
                           changeNodeDense(node, path, getNodeKey, x, y)
                       }
                       }/>

            </div>) : (null);

        const type = node.type === "convolution" || node.type === "flatten" || node.type === "batch_normalization" ?
            (<div style={styles.nodeName}>
                {node.type}
            </div>) : (null);

        const output = node.output != null ?
            (<div>
                <div style={styles.nodeName}>
                    output
                </div>

                <input style={styles.textInput}
                       value={node.output}
                       onChange={event => {
                           let output = event.target.value;
                           changeNodeOutput(node, path, getNodeKey, output)
                       }
                       }/>
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
                {name}
                {output}
            </div>
        )
    }
}
