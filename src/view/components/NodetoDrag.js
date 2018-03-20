import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, DragSource } from 'react-dnd';
import '../styles/App.css';


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
        const { connectDragSource, node } = this.props;

        return connectDragSource(
            <div
                className="rowContents">
                <span className="boldText">{node.title} </span>
            </div>,
            { dropEffect: 'copy' }
        );
    }
}

externalNodeBaseComponent.propTypes = {
    node: PropTypes.shape({ title: PropTypes.string }).isRequired,
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