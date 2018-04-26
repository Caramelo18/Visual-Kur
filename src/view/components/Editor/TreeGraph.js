import React, { Component } from 'react';
import {SortableTreeWithoutDndContext as SortableTree, removeNodeAtPath,  toggleExpandedForAll, changeNodeAtPath} from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import {externalNodeType} from './NodetoDrag';
import SubTitleExpansion from './SubTitleExpansion';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';



const TreeHeight = window.innerHeight*0.95;

export default class Tree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            treeData: [],
        };


        this.expandAll = this.expandAll.bind(this);
        this.collapseAll = this.collapseAll.bind(this);
        this.changeNodeInput = this.changeNodeInput.bind(this);
        this.changeNodeActivation = this.changeNodeActivation.bind(this);
        this.changeNodeSize = this.changeNodeSize.bind(this);
        this.changeNodePool = this.changeNodePool.bind(this);
        this.changeNodeDense = this.changeNodeDense.bind(this);




    }

    expand(expanded) {
        this.setState({
            treeData: toggleExpandedForAll({
                treeData: this.state.treeData,
                expanded,
            }),
        });
    }

    expandAll() {
        this.expand(true);
    }

    collapseAll() {
        this.expand(false);
    }

    changeNodeInput(node,path,getNodeKey, input) {
        this.setState(state => ({
            treeData: changeNodeAtPath({
                treeData: state.treeData,
                path,
                getNodeKey,
                newNode: {...node, input}
            })
        }))
    }

    changeNodeActivation(node,path,getNodeKey, activation) {
        this.setState(state => ({
            treeData: changeNodeAtPath({
                treeData: state.treeData,
                path,
                getNodeKey,
                newNode: {...node, activation}
            })
        }))
    }

    changeNodeSize(node,path,getNodeKey, x,y) {
        let size = Object.assign({}, node.size);
        size.x = x;
        size.y = y;
        this.setState(state => ({
            treeData: changeNodeAtPath({
                treeData: state.treeData,
                path,
                getNodeKey,
                newNode: {...node, size}
            })
        }))
    }

    changeNodePool(node,path,getNodeKey, x,y) {
        let pool = Object.assign({}, node.size);
        pool.x = x;
        pool.y = y;
        this.setState(state => ({
            treeData: changeNodeAtPath({
                treeData: state.treeData,
                path,
                getNodeKey,
                newNode: {...node, pool}
            })
        }))
    }

    changeNodeDense(node,path,getNodeKey, x,y) {
        let dense = Object.assign({}, node.size);
        dense.x = x;
        dense.y = y;
        this.setState(state => ({
            treeData: changeNodeAtPath({
                treeData: state.treeData,
                path,
                getNodeKey,
                newNode: {...node, dense}
            })
        }))
    }


    render() {

        const getNodeKey = ({ treeIndex }) => treeIndex;


        return (
            <div style={{height: TreeHeight}}>
                <div>
                    <Button variant="raised" color="primary" onClick={this.expandAll}>
                        <Typography variant="button" color="inherit"> Expand All </Typography>
                    </Button>
                <Button variant="raised" color="primary" label="Collapse All" onClick={this.collapseAll}>
                    <Typography variant="button" color="inherit"> Collapse All </Typography>
                </Button>
                </div>
                <SortableTree
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({treeData})}
                    dndType={externalNodeType}
                    generateNodeProps={({ node, path }) => ({
                        buttons: [
                            <button
                                onClick={() =>
                                    this.setState(state => ({
                                        treeData: removeNodeAtPath({
                                            treeData: state.treeData,
                                            path,
                                            getNodeKey,
                                        }),
                                    }))
                                }
                            >
                                Remove
                            </button>
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
                                />
                        )
                    })}
                />
            </div>
        );
    }
};
