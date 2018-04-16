import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import '../../styles/App.css';
import TitleExpansion from "./TitleExpansion";

const styles = {
    rowContents: {
        display: "inline-block",
        verticalAlign: "middle",
        position: "relative",
        height: 50,
        border: "solid #bbb 1px",
        boxShadow: "0 2px 2px -2px",
        borderRadius: 2,
        minWidth: 75,
        flex: "1 0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        marginTop: 20,
    }
};

const externalNodeType = 'yourNodeType';

const externalNodeSpec = {
    // This needs to return an object with a property `node` in it.
    // Object rest spread is recommended to avoid side effects of
    // referencing the same object in different trees.
    beginDrag: componentProps => ({ node: { ...componentProps.node } }),
};
const externalNodeCollect = (connect /* , monitor */) => ({
    connectDragSource: connect.dragSource(),
    // Add props via react-dnd APIs to enable more visual
    // customization of your component
    // isDragging: monitor.isDragging(),
    // didDrop: monitor.didDrop(),
});



class externalNodeBaseComponent extends Component {
    render() {
        const {connectDragSource, node} = this.props;

        this.props.node.title = (<TitleExpansion/>);

        return connectDragSource(
            <div style={styles.rowContents}>
                <span>Testes </span>
            </div>,
            { dropEffect: 'copy' }
        );
    }
}

externalNodeBaseComponent.propTypes = {
    node: PropTypes.shape(TitleExpansion).isRequired,
    connectDragSource: PropTypes.func.isRequired,
};

const YourExternalNodeComponent = DragSource(
    externalNodeType,
    externalNodeSpec,
    externalNodeCollect
)(externalNodeBaseComponent);


export {
    externalNodeBaseComponent,
    YourExternalNodeComponent,
    externalNodeType,
    externalNodeSpec,
    externalNodeCollect
};
