import React, { Component } from 'react';
import {SortableTreeWithoutDndContext as SortableTree, removeNodeAtPath, changeNodeAtPath} from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import {externalNodeType} from './NodetoDrag';
import SubTitleExpansion from './SubTitleExpansion';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete'

const TreeHeight = window.innerHeight;


export default class Tree extends Component {
    constructor(props) {
        super(props);
        this.changeNodeInput = this.changeNodeInput.bind(this);
        this.changeNodeActivation = this.changeNodeActivation.bind(this);
        this.changeNodeSize = this.changeNodeSize.bind(this);
        this.changeNodePool = this.changeNodePool.bind(this);
        this.changeNodeDense = this.changeNodeDense.bind(this);
        this.changeNodeKernels = this.changeNodeKernels.bind(this);
        this.changeNodeName = this.changeNodeName.bind(this);
        this.changeNodeOutput = this.changeNodeOutput.bind(this);

    }

    changeNodeOutput(node, path, getNodeKey, output) {
            const newTree = changeNodeAtPath({
                treeData: this.props.tree,
                path,
                getNodeKey,
                newNode: {...node, output}
            });

            this.props.updateLayers(newTree);
    }

    changeNodeName(node, path, getNodeKey, name) {
        const newTree = changeNodeAtPath({
            treeData: this.props.tree,
            path,
            getNodeKey,
            newNode: {...node, name}
        });

        this.props.updateLayers(newTree);
    }
    changeNodeKernels(node,path,getNodeKey, kernels) {
        const newTree = changeNodeAtPath({
            treeData: this.props.tree,
            path,
            getNodeKey,
            newNode: {...node, kernels}
        });

        this.props.updateLayers(newTree);
    }

    changeNodeInput(node,path,getNodeKey, input) {
        const newTree = changeNodeAtPath({
            treeData: this.props.tree,
            path,
            getNodeKey,
            newNode: {...node, input}
        });

        this.props.updateLayers(newTree);
    }

    changeNodeActivation(node,path,getNodeKey, activation) {
        const newTree = changeNodeAtPath({
            treeData: this.props.tree,
            path,
            getNodeKey,
            newNode: {...node, activation}
        });

        this.props.updateLayers(newTree);
    }

    changeNodeSize(node,path,getNodeKey, x,y) {

        const newTree = changeNodeAtPath({
            treeData: this.props.tree,
            path,
            getNodeKey,
            newNode: {...node, size: {"0": x, "1": y}}
        });
        this.props.updateLayers(newTree);
    }

    changeNodePool(node,path,getNodeKey, x,y) {
        const newTree = changeNodeAtPath({
            treeData: this.props.tree,
            path,
            getNodeKey,
            newNode: {...node, "0": x, "1":y}
        });
        this.props.updateLayers(newTree);
    }

    changeNodeDense(node,path,getNodeKey, x,y) {
        const newTree = changeNodeAtPath({
            treeData: this.props.tree,
            path,
            getNodeKey,
            newNode: {...node, dense: {"0": x, "1": y }}
        });

        this.props.updateLayers(newTree);
    }

    render() {
        const getNodeKey = ({ treeIndex }) => treeIndex;
        const { updateLayers, tree } = this.props;

        return (
            <div style={{height: TreeHeight}}>
                <SortableTree
                    rowHeight={95}
                    treeData={tree}
                    onChange={treeData => updateLayers(treeData)}
                    dndType={externalNodeType}
                    maxDepth={1}
                    generateNodeProps={({ node, path }) => ({
                        buttons: [
                            <Button
                                aria-label="delete"
                                size="small"
                                color="secondary"
                                onClick={() =>
                                    updateLayers(
                                        removeNodeAtPath({
                                            treeData: tree,
                                            path,
                                            getNodeKey,
                                        })
                                    )}
                            >
                                <DeleteIcon />
                            </Button>
                        ],
                        title: (null),
                        subtitle: (
                            <SubTitleExpansion color="primary"
                                               node={node}
                                               path={path}
                                               getNodeKey={getNodeKey}
                                               changeNodeInput={this.changeNodeInput}
                                               changeNodeActivation={this.changeNodeActivation}
                                               changeNodeSize={this.changeNodeSize}
                                               changeNodePool={this.changeNodePool}
                                               changeNodeDense={this.changeNodeDense}
                                               changeNodeKernels={this.changeNodeKernels}
                                               changeNodeName={this.changeNodeName}
                                               changeNodeOutput={this.changeNodeOutput}
                            />
                        )
                    })}
                />
            </div>
        );
    }
};
