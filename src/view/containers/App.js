import KurConfigController from '../../controller/KurConfigController';
import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../styles/App.css';
import Tree from '../components/TreeGraph';
import PropTypes from 'prop-types';
import { DragDropContext, DragSource } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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
                style={{
                    display: 'inline-block',
                    padding: '3px 5px',
                    background: 'blue',
                    color: 'white',
                }}
            >
                {node.title}
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

class UnwrappedApp extends Component {
  componentWillMount() {
    let exampleController = new KurConfigController();

    this.setState({
      exampleController,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Visual Kur</h1>
        </header>
        <div className="rowC">
            <div style={{flex: 1}}>
                <YourExternalNodeComponent node={{ title: 'Baby Rabbit' }} />
            </div>

            <div style={{flex: 3}}>
              <Tree dndType={externalNodeType}/>
            </div>
        </div>
      </div>
    );
  }
}

const App = DragDropContext(HTML5Backend)(UnwrappedApp);
export default App;