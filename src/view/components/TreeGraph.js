import React, { Component } from 'react';
import {SortableTreeWithoutDndContext as SortableTree, removeNodeAtPath} from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import FileExplorerTheme from 'react-sortable-tree-theme-full-node-drag';




export default class Tree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            treeData: [{title: 'Chicken', children: [{title: 'Egg'}]}],
        };
    }

    addNode () {

    }

    render() {
        const getNodeKey = ({ treeIndex }) => treeIndex;


        return (
            <div style={{height: 400}}>
                <SortableTree
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({treeData})}
                    theme={FileExplorerTheme}
                    dndType={this.props.dndType}
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
                        ],
                    })}
                />
            </div>
        );
    }
};