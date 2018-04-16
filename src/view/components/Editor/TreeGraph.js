import React, { Component } from 'react';
import {SortableTreeWithoutDndContext as SortableTree, removeNodeAtPath,  toggleExpandedForAll} from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import FileExplorerTheme from 'react-sortable-tree-theme-full-node-drag';
import {externalNodeType} from './NodetoDrag';
import TitleExpansion from './TitleExpansion';

const TreeHeight = window.innerHeight*0.95;

export default class Tree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            treeData: [{title: <TitleExpansion/>, subtitle: 'test', children: [{title: 'Egg'}]}],
        };


        this.expandAll = this.expandAll.bind(this);
        this.collapseAll = this.collapseAll.bind(this);
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

    render() {
        const getNodeKey = ({ treeIndex }) => treeIndex;


        return (
            <div style={{height: TreeHeight}}>
                <button onClick={this.expandAll}>Expand All</button>
                <button onClick={this.collapseAll}>Collapse All</button>

                <SortableTree
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({treeData})}
                    theme={FileExplorerTheme}
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
                            </button>,
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
                                Details
                            </button>,
                        ],
                    })}
                />
            </div>
        );
    }
};