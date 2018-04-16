import React, { Component } from 'react';
import {SortableTreeWithoutDndContext as SortableTree, removeNodeAtPath,  toggleExpandedForAll, changeNodeAtPath} from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import {externalNodeType} from './NodetoDrag';
import SubTitleExpansion from './SubTitleExpansion';
import TitleExpansion from "./TitleExpansion";

const TreeHeight = window.innerHeight*0.95;

export default class Tree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            treeData: [{type: 20, inputvalue:'234', subtitle: 'test', children: [{title: 'Egg'}]}],
        };


        this.expandAll = this.expandAll.bind(this);
        this.collapseAll = this.collapseAll.bind(this);
        this.changeNodeInput = this.changeNodeInput.bind(this);
        this.changeNodeActivation = this.changeNodeActivation.bind(this);
        this.changeNodeArray = this.changeNodeArray.bind(this);


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

    changeNodeArray(node,path,getNodeKey, x,y) {
        let size = Object.assign({}, node.size)
        size.x = x
        size.y = y
        this.setState(state => ({
            treeData: changeNodeAtPath({
                treeData: state.treeData,
                path,
                getNodeKey,
                newNode: {...node, size}
            })
        }))

        console.log(node)
    }



    render() {
        const getNodeKey = ({ treeIndex }) => treeIndex;


        return (
            <div style={{height: TreeHeight}}>
                <button onClick={this.expandAll}>Expand All</button>
                <button onClick={this.collapseAll}>Collapse All</button>

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
                        title: (
                            <TitleExpansion node={node}/>
                        ),
                        subtitle: (
                            <SubTitleExpansion node={node} path={path} getNodeKey={getNodeKey} changeNodeInput={this.changeNodeInput}
                            changeNodeActivation={this.changeNodeActivation} changeNodeArray={this.changeNodeArray}/>
                        )
                    })}
                />
            </div>
        );
    }
};