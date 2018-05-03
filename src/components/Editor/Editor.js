import React, { Component } from 'react';
import {YourExternalNodeComponent} from "./NodetoDrag";
import Tree from "./TreeGraph";
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';


const styles = theme => ({
    sideBar: {
        paddingLeft: 30,
        marginTop: 50,
    },

    rowC: {
        display: "flex",
        flexDirection: "row",
        marginLeft: 350,
    },


    treeDisplayer: {
        flex: 3,
    }
});

class Editor extends Component {


    render() {
        const { classes, updateLayers, getLayers } = this.props;

        const tree = getLayers();

        return (
            <div className={classes.rowC}>
                <div className={classes.sideBar}>
                    <YourExternalNodeComponent node={{ type:'input', input: 'images'}} />
                    <YourExternalNodeComponent node={{ type: 'convolution', kernels: 23, size: {x :3, y:4} }}/>
                    <YourExternalNodeComponent node={{ type: 'activation', activation: "relu"}} />
                    <YourExternalNodeComponent node={{ type: 'pool', pool: {x: 3, y: 5} }} />
                    <YourExternalNodeComponent node={{ type: 'flatten'}} />
                    <YourExternalNodeComponent node={{ type: 'dense', dense: {x: 3, y: 5} }} />
                </div>

                <div className={classes.treeDisplayer}>
                    <Tree updateLayers={updateLayers} tree={tree}/>
                </div>
            </div>
        );
    }
}

Editor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Editor);