import React, { Component } from 'react';
import {YourExternalNodeComponent,externalNodeType} from "./NodetoDrag";
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
        const { classes } = this.props;

        return (
            <div className={classes.rowC}>
                <div className={classes.sideBar}>
                    <YourExternalNodeComponent node={{ title: 'Baby Rabbit'}} />
                    <YourExternalNodeComponent node={{ title: 'Pumba na fofinha' }} />
                </div>

                <div className={classes.treeDisplayer}>
                    <Tree dndType={externalNodeType}/>
                </div>
            </div>
        );
    }
}

Editor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Editor);