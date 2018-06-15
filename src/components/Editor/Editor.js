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
        width: 850
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
                    <YourExternalNodeComponent node={{ type: 'convolution', kernels: 23, size: [3, 4] }}/>
                    <YourExternalNodeComponent node={{ type: 'activation', activation: "relu"}} />
                    <YourExternalNodeComponent node={{ '0': 1, '1': 2, type: 'pool'}} />
                    <YourExternalNodeComponent node={{ type: 'flatten'}} />
                    <YourExternalNodeComponent node={{ type: 'dense', dense: [3,5] }} />
                    <YourExternalNodeComponent node={{ type: 'output', output: 'out_default' }} />
                    <YourExternalNodeComponent node={{ type: 'batch_normalization'}} />
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
